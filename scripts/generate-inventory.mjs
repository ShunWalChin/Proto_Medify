#!/usr/bin/env node

/**
 * Gera inventários documentais sem copiar valores de segredo.
 *
 * Uso:
 *   node scripts/generate-inventory.mjs --source /caminho/para/medify
 */
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const args = process.argv.slice(2);
const sourceIndex = args.indexOf("--source");
const source = path.resolve(
  sourceIndex >= 0 && args[sourceIndex + 1]
    ? args[sourceIndex + 1]
    : process.env.MEDIFY_SOURCE ?? "",
);

if (!source || !fs.existsSync(path.join(source, "package.json"))) {
  console.error("Informe --source apontando para o repositório de código MEDIFY.");
  process.exit(1);
}

const repo = path.resolve(import.meta.dirname, "..");
const output = path.join(repo, "docs", "reference", "generated");
fs.mkdirSync(output, { recursive: true });

const ignoredDirectories = new Set([
  ".git",
  ".next",
  "node_modules",
  "coverage",
  "playwright-report",
  "test-results",
]);

function walk(directory) {
  if (!fs.existsSync(directory)) return [];
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(absolute));
    else if (entry.isFile()) files.push(absolute);
  }
  return files;
}

function posix(absolute) {
  return path.relative(source, absolute).split(path.sep).join("/");
}

function routeSegment(segment) {
  return segment
    .replace(/^\[\[\.\.\.([^\]]+)\]\]$/, "{$1...?}")
    .replace(/^\[\.\.\.([^\]]+)\]$/, "{$1...}")
    .replace(/^\[([^\]]+)\]$/, "{$1}");
}

function toRoute(relative, type) {
  const segments = relative.split("/");
  segments.shift(); // app
  if (type === "api") segments.shift(); // api
  const filtered = segments
    .slice(0, -1)
    .filter((segment) => !/^\(.+\)$/.test(segment))
    .map(routeSegment);
  return `/${type === "api" ? "api/" : ""}${filtered.join("/")}`.replace(/\/$/, "") || "/";
}

function methods(sourceText) {
  const names = new Set();
  const declaration =
    /export\s+(?:const\s+|async\s+function\s+|function\s+)(GET|POST|PUT|PATCH|DELETE|OPTIONS|HEAD)\b/g;
  for (const match of sourceText.matchAll(declaration)) names.add(match[1]);
  for (const block of sourceText.matchAll(/export\s*\{([^}]+)\}/g)) {
    for (const name of block[1].match(/\b(GET|POST|PUT|PATCH|DELETE|OPTIONS|HEAD)\b/g) ?? []) {
      names.add(name);
    }
  }
  return [...names].sort();
}

function header(title, version) {
  return `# ${title}

> Gerado por \`scripts/generate-inventory.mjs\` a partir do snapshot de código
> MEDIFY \`${version}\`. Não editar manualmente.

`;
}

const packageJson = JSON.parse(fs.readFileSync(path.join(source, "package.json"), "utf8"));
const version = packageJson.version ?? "desconhecida";
const allFiles = walk(source);

const apiFiles = allFiles
  .filter((file) => /[\\/]app[\\/]api[\\/].*[\\/]route\.ts$/.test(file))
  .map((file) => {
    const relative = posix(file);
    const foundMethods = methods(fs.readFileSync(file, "utf8"));
    return {
      file: relative,
      route: toRoute(relative, "api"),
      methods: foundMethods.length ? foundMethods : ["INDIRETO"],
    };
  })
  .sort((a, b) => a.route.localeCompare(b.route) || a.file.localeCompare(b.file));

let apiDocument = header("Inventário de rotas HTTP", version);
apiDocument += `Arquivos de rota: **${apiFiles.length}**.\n\n`;
apiDocument += "| Método | Endpoint | Implementação |\n|---|---|---|\n";
for (const route of apiFiles) {
  for (const method of route.methods) {
    apiDocument += `| \`${method}\` | \`${route.route}\` | \`${route.file}\` |\n`;
  }
}
fs.writeFileSync(path.join(output, "API-ROUTES.md"), apiDocument);

const pageFiles = allFiles
  .filter((file) => /[\\/]app[\\/].*[\\/]page\.tsx$/.test(file) || /[\\/]app[\\/]page\.tsx$/.test(file))
  .map((file) => {
    const relative = posix(file);
    return { file: relative, route: toRoute(relative, "page") };
  })
  .sort((a, b) => a.route.localeCompare(b.route));

let pageDocument = header("Inventário de páginas", version);
pageDocument += `Páginas: **${pageFiles.length}**.\n\n`;
pageDocument += "| Rota | Implementação |\n|---|---|\n";
for (const page of pageFiles) {
  pageDocument += `| \`${page.route}\` | \`${page.file}\` |\n`;
}
fs.writeFileSync(path.join(output, "UI-ROUTES.md"), pageDocument);

const migrationFiles = allFiles
  .filter((file) => /[\\/]supabase[\\/]migrations[\\/].+\.sql$/.test(file))
  .sort();
const sqlFiles = [
  path.join(source, "supabase", "baseline.sql"),
  ...migrationFiles,
].filter(fs.existsSync);
const sql = sqlFiles.map((file) => fs.readFileSync(file, "utf8")).join("\n");

function sqlObjects(regex, fallbackSchema = "public") {
  const values = new Set();
  for (const match of sql.matchAll(regex)) {
    values.add(`${match[1] || fallbackSchema}.${match[2]}`);
  }
  return [...values].sort();
}

const tables = sqlObjects(
  /create\s+table\s+(?:if\s+not\s+exists\s+)?(?:"?([a-z_][\w]*)"?\.)?"?([a-z_][\w]*)"?\s*\(/gi,
);
const functions = sqlObjects(
  /create\s+(?:or\s+replace\s+)?function\s+(?:"?([a-z_][\w]*)"?\.)?"?([a-z_][\w]*)"?\s*\(/gi,
);
const views = sqlObjects(
  /create\s+(?:or\s+replace\s+)?(?:materialized\s+)?view\s+(?:"?([a-z_][\w]*)"?\.)?"?([a-z_][\w]*)"?\s+/gi,
);

let databaseDocument = header("Inventário de banco", version);
databaseDocument += `Migrations: **${migrationFiles.length}** · tabelas encontradas: **${tables.length}** · funções: **${functions.length}** · views: **${views.length}**.\n\n`;
databaseDocument += "## Migrations\n\n";
for (const file of migrationFiles) databaseDocument += `- \`${path.basename(file)}\`\n`;
databaseDocument += "\n## Tabelas\n\n";
for (const table of tables) databaseDocument += `- \`${table}\`\n`;
databaseDocument += "\n## Funções\n\n";
for (const fn of functions) databaseDocument += `- \`${fn}\`\n`;
databaseDocument += "\n## Views\n\n";
for (const view of views) databaseDocument += `- \`${view}\`\n`;
fs.writeFileSync(path.join(output, "DATABASE-OBJECTS.md"), databaseDocument);

const testFiles = allFiles
  .filter((file) => /\.(?:test|spec)\.(?:ts|tsx|js|mjs|sh)$/.test(file) || /[\\/]tests[\\/]/.test(file))
  .map(posix)
  .sort();
const testsByArea = new Map();
for (const file of testFiles) {
  const area = file.startsWith("tests/") ? file.split("/").slice(0, 2).join("/") : file.split("/")[0];
  if (!testsByArea.has(area)) testsByArea.set(area, []);
  testsByArea.get(area).push(file);
}

let testDocument = header("Inventário de testes", version);
testDocument += `Arquivos de teste/sonda encontrados: **${testFiles.length}**.\n\n`;
for (const [area, files] of [...testsByArea].sort(([a], [b]) => a.localeCompare(b))) {
  testDocument += `## ${area}\n\n`;
  for (const file of files) testDocument += `- \`${file}\`\n`;
  testDocument += "\n";
}
fs.writeFileSync(path.join(output, "TEST-INVENTORY.md"), `${testDocument.trimEnd()}\n`);

const envFiles = [
  ".env.example",
  ".env.hostgator.example",
  "deploy/oracle/app.env.example",
].map((file) => path.join(source, file)).filter(fs.existsSync);
const envNames = new Set();
for (const file of envFiles) {
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const match = line.match(/^([A-Z][A-Z0-9_]*)=/);
    if (match) envNames.add(match[1]);
  }
}

function envArea(name) {
  if (/SUPABASE|DATABASE|POSTGRES|PG/.test(name)) return "Banco e Supabase";
  if (/WAHA|WHATSAPP|META/.test(name)) return "WhatsApp";
  if (/OPENAI|ANTHROPIC|GEMINI|LLM|EMBED|AI_|RAG|TRANSCR/.test(name)) return "IA e RAG";
  if (/SENTRY|OTEL|LOG|METRIC/.test(name)) return "Observabilidade";
  if (/SECRET|KEY|TOKEN|PASSWORD|AUTH|MFA|CRON|ENCRYPT/.test(name)) return "Segurança";
  if (/URL|HOST|PORT|DOMAIN|APP_|NODE_ENV|REDIS/.test(name)) return "Infraestrutura";
  return "Aplicação";
}

let envDocument = header("Variáveis de ambiente", version);
envDocument += "Somente nomes são documentados. Valores pertencem ao secret store do ambiente.\n\n";
envDocument += "| Área | Variável |\n|---|---|\n";
for (const name of [...envNames].sort((a, b) => envArea(a).localeCompare(envArea(b)) || a.localeCompare(b))) {
  envDocument += `| ${envArea(name)} | \`${name}\` |\n`;
}
fs.writeFileSync(path.join(output, "ENVIRONMENT-VARIABLES.md"), envDocument);

const extensions = new Map();
const firstLevel = new Map();
for (const file of allFiles) {
  const relative = posix(file);
  const extension = path.extname(file) || "(sem extensão)";
  extensions.set(extension, (extensions.get(extension) ?? 0) + 1);
  const area = relative.includes("/") ? relative.split("/")[0] : "(raiz)";
  firstLevel.set(area, (firstLevel.get(area) ?? 0) + 1);
}

let metricsDocument = header("Métricas do snapshot de código", version);
metricsDocument += `Arquivos suportados no inventário: **${allFiles.length}**.\n\n`;
metricsDocument += "## Por diretório de primeiro nível\n\n| Diretório | Arquivos |\n|---|---:|\n";
for (const [area, count] of [...firstLevel].sort((a, b) => b[1] - a[1])) {
  metricsDocument += `| \`${area}\` | ${count} |\n`;
}
metricsDocument += "\n## Por extensão\n\n| Extensão | Arquivos |\n|---|---:|\n";
for (const [extension, count] of [...extensions].sort((a, b) => b[1] - a[1])) {
  metricsDocument += `| \`${extension}\` | ${count} |\n`;
}
fs.writeFileSync(path.join(output, "SOURCE-METRICS.md"), metricsDocument);

console.log(
  `Inventário gerado: ${apiFiles.length} rotas, ${pageFiles.length} páginas, ` +
    `${migrationFiles.length} migrations, ${testFiles.length} arquivos de teste/sonda.`,
);
