import { init, Tiktoken } from "tiktoken/lite/init";

type EncodingName = "o200k_base" | "cl100k_base" | "p50k_base";

interface EncoderConfig {
  bpe_ranks: string;
  pat_str: string;
  special_tokens: Record<string, number>;
}

type AssetResolver = (relativePath: string) => string;

let resolveAssetPath: AssetResolver = (path) => `public/${path}`;
let initPromise: Promise<void> | null = null;
const encoderPromises: Partial<Record<EncodingName, Promise<Tiktoken>>> = {};

export function setTokenizerAssetResolver(resolver?: AssetResolver): void {
  resolveAssetPath = resolver ?? ((path) => `public/${path}`);
  initPromise = null;
  for (const key of Object.keys(encoderPromises) as EncodingName[]) {
    delete encoderPromises[key];
  }
}

async function ensureInit(): Promise<void> {
  if (!initPromise) {
    initPromise = (async () => {
      const response = await fetch(resolveAssetPath("tiktoken_bg.wasm"));
      if (!response.ok) throw new Error("Failed to load tiktoken_bg.wasm");
      const wasmBytes = await response.arrayBuffer();
      await init((imports) => WebAssembly.instantiate(wasmBytes, imports));
    })();
  }
  await initPromise;
}

async function loadEncoderConfig(name: EncodingName): Promise<EncoderConfig> {
  const response = await fetch(resolveAssetPath(`bpe/${name}.json`));
  if (!response.ok) throw new Error(`Failed to load encoder: ${name}`);
  return (await response.json()) as EncoderConfig;
}

async function getEncoder(name: EncodingName): Promise<Tiktoken> {
  await ensureInit();
  if (!encoderPromises[name]) {
    encoderPromises[name] = (async () => {
      const { bpe_ranks, special_tokens, pat_str } = await loadEncoderConfig(name);
      return new Tiktoken(bpe_ranks, special_tokens, pat_str);
    })();
  }
  return encoderPromises[name]!;
}

export async function countTokens(text: string, name: EncodingName): Promise<number> {
  if (!text) return 0;
  const encoder = await getEncoder(name);
  return encoder.encode(text).length;
}
