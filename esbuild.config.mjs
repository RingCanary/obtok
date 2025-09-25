// esbuild.config.mjs
import { cpSync, rmSync, mkdirSync } from "fs";
import { join } from "path";
rmSync("dist", { recursive: true, force: true });
mkdirSync("dist/public/bpe", { recursive: true });

cpSync("manifest.json", "dist/manifest.json");
cpSync("node_modules/tiktoken/lite/tiktoken_bg.wasm", "dist/public/tiktoken_bg.wasm");
for (const f of ["cl100k_base.json","o200k_base.json","p50k_base.json"]) {
  cpSync(`node_modules/tiktoken/encoders/${f}`, join("dist/public/bpe", f));
}
