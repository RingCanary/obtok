import esbuild from "esbuild";
import { cpSync, mkdirSync, rmSync } from "fs";
import { join } from "path";

const outdir = "dist";
rmSync(outdir, { recursive: true, force: true });
mkdirSync(join(outdir, "public", "bpe"), { recursive: true });

cpSync("manifest.json", join(outdir, "manifest.json"));
cpSync("public", join(outdir, "public"), { recursive: true });

const watchMode = process.argv.includes("--watch");

const buildOptions = {
  entryPoints: ["src/main.ts"],
  bundle: true,
  platform: "browser",
  format: "cjs",
  target: "es2020",
  outfile: join(outdir, "main.js"),
  sourcemap: watchMode,
  logLevel: "info",
  external: ["obsidian"],
};

if (watchMode) {
  const ctx = await esbuild.context(buildOptions);
  await ctx.watch();
  console.log("esbuild watching...");
} else {
  await esbuild.build(buildOptions);
}
