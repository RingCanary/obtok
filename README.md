# LLM Tokens (Status Bar)

Local token counting for Obsidian using `tiktoken` and a small status-bar display.

## Installation
- Run `npm install` (first time) and `npm run build`.
- Copy the contents of `dist/` into `<vault>/.obsidian/plugins/llm-tokens/`.
- Restart Obsidian (or reload plugins) and enable **LLM Tokens (Status Bar)** under *Settings → Community Plugins*.

## Usage
- Once enabled, the status bar shows `Tokens: N` for the active note; if selection display is toggled on and text is selected, it also shows `· Sel: M`.
- Change the tokenizer (encoding), debounce delay, and selection toggle under *Settings → LLM Tokens*.

## Troubleshooting
- Layout must be `dist/main.js`, `dist/manifest.json`, and `dist/public/...` directly in the plugin folder; Obsidian will reject nested builds.
- Ensure the bundle is CommonJS. If DevTools reports `require is not defined`, rebuild with `npm run build` and verify `format: "cjs"` in `esbuild.config.mjs`.
- Obsidian loads tokenizer assets at runtime; if you see `Failed to fetch tiktoken_bg.wasm`, confirm `public/tiktoken_bg.wasm` and `public/bpe/*.json` shipped with the plugin and remain next to `main.js`.
