## Project: Obsidian “LLM Tokens (Status Bar)”

**Goal:** show live token counts in Obsidian’s status bar for the active note (and optionally the current selection) using `tiktoken` locally—no API calls.

### Scope (MVP v0.1)

- Status-bar item: `Tokens: <total> · Sel: <n>` (Sel shown only if selection + toggle on).
    
- Uses `tiktoken/lite` with JSON encoders (`cl100k_base`, `o200k_base`, `p50k_base`) and `tiktoken_bg.wasm`.
    
- Settings:
    
    - Encoding dropdown (default `o200k_base`)
        
    - Debounce ms (default 180)
        
    - Show selection (toggle, default on)
        
- Works in editing/reading modes. Desktop first. (Mobile later via modal.)
    

### Non-Goals (MVP)

- No network calls, no cost estimates, no model auto-detection.
    
- No per-heading breakdown UI.
    
- No mobile parity or tooltip breakdowns.
    
- No Anthropic/Llama/Gemini tokenizers yet.
    

---

## Roles & Responsibilities

**Product/PO**

- Owns scope, acceptance criteria, and release notes.
    

**Tech Lead**

- Approves architecture decisions, reviews PRs, ensures performance & stability.
    

**Obsidian Plugin Engineer**

- Implements status-bar integration, event wiring, settings tab, and build system.
    
- Ensures folder layout matches Obsidian expectations.
    

**Tokenizer Engineer**

- Integrates `tiktoken` (WASM + JSON encoders), caching, and init logic.
    
- Adds preprocessing toggles in v0.2 (frontmatter/code fences).
    

**Build/Release Engineer**

- Esbuild config, copy assets to `dist/public`, zip for manual install.
    
- Versioning & changelog, community plugin submission prep (later).
    

**QA**

- Validates on Windows/macOS/Linux.
    
- Large-note performance smoke tests; selection correctness; empty-note state.
    

**Docs**

- README, quickstart, settings description, troubleshooting.
    

**Community/Publication**

- Prepares marketplace submission, icon, short description, screenshots.
    

---

## Directory Structure

```
obsidian-llm-tokens/
├─ manifest.json
├─ package.json
├─ esbuild.config.mjs
├─ README.md
├─ src/
│  ├─ main.ts
│  ├─ settings.ts
│  └─ tokenizer.ts
└─ public/
   ├─ tiktoken_bg.wasm
   └─ bpe/
      ├─ cl100k_base.json
      ├─ o200k_base.json
      └─ p50k_base.json
```

**Dist layout (must be installed as-is to the plugin folder):**

```
dist/
  main.js          ← CJS bundle (required)
  manifest.json
  public/
    tiktoken_bg.wasm
    bpe/*.json
```

---

## Key Decisions

- **CJS output** (`format: "cjs"`) because Obsidian loads `main.js` via `require`.
    
- **Local-only** tokenization → privacy by default; no vault text leaves device.
    
- **Asset strategy:** copy WASM + JSON encoders from `node_modules/tiktoken` to `dist/public` at build time; fetch at runtime with relative paths.
    
- **Caching:** single `init()` call; encoder instance cached per chosen encoding.
    

---

## Milestones & Acceptance

### v0.1.0 (MVP)

-  Status bar renders `Tokens: N` (and `Sel: M` if selection + toggle).
    
-  Settings tab: encoding / debounce / selection toggle.
    
-  Handles empty note gracefully (`Tokens: 0`).
    
-  Build outputs `dist/main.js` and assets; plugin enables without console errors.
    
-  Works with large files (~100–200k chars) without freezing (debounced to ≥150ms).
    
-  README includes install steps and troubleshooting.
    

### v0.2 (Nice-to-have)

-  Preprocessing toggles: exclude YAML frontmatter & fenced code blocks.
    
-  “Remaining vs 128k” display (static, optional).
    

---

## Commands & Scripts

**NPM scripts**

```bash
npm run dev   # esbuild watch
npm run build # writes dist/
npm run zip   # zips dist to llm-tokens.zip for manual install
```

**Manual install path**

```
Copy contents of dist/ → <vault>/.obsidian/plugins/llm-tokens/
Enable plugin in Settings → Community plugins
```

---

## QA Checklist

- Enable/disable plugin → no errors in DevTools console.
    
- Switch notes rapidly → status bar updates correctly.
    
- Selection spanning multiple code blocks → counts don’t crash; selection count only when something selected.
    
- Encoder switch in settings → counts update after debounce.
    
- Asset fetch OK: `public/tiktoken_bg.wasm` and `public/bpe/*.json` return 200 (DevTools Network).
    

---

## Troubleshooting

- **Toast “Failed to load plugin”** → ensure `main.js` is next to `manifest.json`, not inside a nested `dist`.
    
- **`require is not defined`** → bundle is ESM; set `format: "cjs"`.
    
- **`Failed to fetch tiktoken_bg.wasm`** → verify `public/` copied to plugin folder and fetch paths `public/...` match.
    

---

## Roadmap (post-MVP)

- Add Anthropic/Llama tokenizers.
    
- Tooltip breakdown and per-heading panel.
    
- Mobile modal command + copy-to-clipboard summary.
    
- Optional cost estimates (user-entered).
    
