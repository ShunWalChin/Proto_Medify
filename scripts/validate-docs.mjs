#!/usr/bin/env node

/**
 * Valida links relativos e sinais óbvios de segredos nos Markdown versionados.
 */
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = path.resolve(import.meta.dirname, "..");
const ignored = new Set([".git", "node_modules", "graphify-out"]);

function walk(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && ignored.has(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(absolute));
    else if (entry.isFile() && entry.name.endsWith(".md")) files.push(absolute);
  }
  return files;
}

const markdownFiles = walk(root);
const broken = [];
const secrets = [];
const secretPatterns = [
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /\bgh[pousr]_[A-Za-z0-9_]{20,}\b/,
  /\bgithub_pat_[A-Za-z0-9_]{20,}\b/,
  /\bsk-[A-Za-z0-9_-]{20,}\b/,
  /postgres(?:ql)?:\/\/[^:\s/]+:[^@\s/]+@/i,
];

for (const file of markdownFiles) {
  const content = fs.readFileSync(file, "utf8");
  for (const match of content.matchAll(/!?\[[^\]]*]\(([^)]+)\)/g)) {
    let target = match[1].trim().replace(/^<|>$/g, "");
    if (/^(?:https?:|mailto:|#)/i.test(target)) continue;
    target = decodeURIComponent(target.split("#")[0]);
    if (!target) continue;
    const resolved = path.resolve(path.dirname(file), target);
    if (!fs.existsSync(resolved)) {
      broken.push(`${path.relative(root, file)} -> ${target}`);
    }
  }
  for (const pattern of secretPatterns) {
    if (pattern.test(content)) secrets.push(`${path.relative(root, file)}: ${pattern}`);
  }
}

if (broken.length || secrets.length) {
  if (broken.length) console.error(`Links quebrados:\n- ${broken.join("\n- ")}`);
  if (secrets.length) console.error(`Possíveis segredos:\n- ${secrets.join("\n- ")}`);
  process.exit(1);
}

console.log(`${markdownFiles.length} documentos validados; links relativos e secret scan: OK.`);
