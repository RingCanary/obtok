// tokenizer.ts
import { init, Tiktoken } from "tiktoken/lite/init";

type EncoderName = "cl100k_base" | "o200k_base" | "p50k_base";

let inited = false;
const encoders: Record<EncoderName, Tiktoken | null> = {
  cl100k_base: null,
  o200k_base: null,
  p50k_base: null,
};

async function loadJSON(name: EncoderName) {
  const res = await fetch(`public/bpe/${name}.json`);
  if (!res.ok) throw new Error(`Failed to load ${name}.json`);
  return (await res.json()) as {
    bpe_ranks: Record<string, number>;
    special_tokens: Record<string, number>;
    pat_str: string;
  };
}

export async function getEncoder(name: EncoderName) {
  if (!inited) {
    const wasm = await fetch("public/tiktoken_bg.wasm").then(r => r.arrayBuffer());
    await init(wasm);
    inited = true;
  }
  if (!encoders[name]) {
    const { bpe_ranks, special_tokens, pat_str } = await loadJSON(name);
    encoders[name] = new Tiktoken(bpe_ranks, special_tokens, pat_str);
  }
  return encoders[name]!;
}

export async function countTokens(text: string, name: EncoderName) {
  const enc = await getEncoder(name);
  return enc.encode(text).length;
}
