import fs from "node:fs";
import path from "node:path";
import { encode } from "@toon-format/toon";

const root = process.cwd();
const sourceDir = path.join(root, "content", "canonical");
const targetDir = path.join(root, "public", "toon");
fs.mkdirSync(targetDir, { recursive: true });

for (const file of fs.readdirSync(sourceDir).filter((name) => name.endsWith(".json"))) {
  const input = JSON.parse(fs.readFileSync(path.join(sourceDir, file), "utf8"));
  const output = encode(input);
  fs.writeFileSync(path.join(targetDir, file.replace(/\.json$/, ".toon")), output + "\n", "utf8");
}
