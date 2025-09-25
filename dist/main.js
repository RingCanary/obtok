var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => LLMTokenPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian2 = require("obsidian");

// node_modules/tiktoken/lite/tiktoken_bg.js
var tiktoken_bg_exports = {};
__export(tiktoken_bg_exports, {
  Tiktoken: () => Tiktoken,
  __wbg_parse_def2e24ef1252aff: () => __wbg_parse_def2e24ef1252aff,
  __wbg_set_wasm: () => __wbg_set_wasm,
  __wbg_stringify_f7ed6987935b4a24: () => __wbg_stringify_f7ed6987935b4a24,
  __wbindgen_error_new: () => __wbindgen_error_new,
  __wbindgen_is_undefined: () => __wbindgen_is_undefined,
  __wbindgen_object_drop_ref: () => __wbindgen_object_drop_ref,
  __wbindgen_string_get: () => __wbindgen_string_get,
  __wbindgen_throw: () => __wbindgen_throw
});
var wasm;
function __wbg_set_wasm(val) {
  wasm = val;
}
var lTextDecoder = typeof TextDecoder === "undefined" ? (0, module.require)("util").TextDecoder : TextDecoder;
var cachedTextDecoder = new lTextDecoder("utf-8", { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
var cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
  if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
    cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachedUint8ArrayMemory0;
}
function getStringFromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}
var heap = new Array(128).fill(void 0);
heap.push(void 0, null, true, false);
var heap_next = heap.length;
function addHeapObject(obj) {
  if (heap_next === heap.length) heap.push(heap.length + 1);
  const idx = heap_next;
  heap_next = heap[idx];
  heap[idx] = obj;
  return idx;
}
function handleError(f, args) {
  try {
    return f.apply(this, args);
  } catch (e) {
    wasm.__wbindgen_export_0(addHeapObject(e));
  }
}
function getObject(idx) {
  return heap[idx];
}
function dropObject(idx) {
  if (idx < 132) return;
  heap[idx] = heap_next;
  heap_next = idx;
}
function takeObject(idx) {
  const ret = getObject(idx);
  dropObject(idx);
  return ret;
}
var WASM_VECTOR_LEN = 0;
var lTextEncoder = typeof TextEncoder === "undefined" ? (0, module.require)("util").TextEncoder : TextEncoder;
var cachedTextEncoder = new lTextEncoder("utf-8");
var encodeString = typeof cachedTextEncoder.encodeInto === "function" ? function(arg, view) {
  return cachedTextEncoder.encodeInto(arg, view);
} : function(arg, view) {
  const buf = cachedTextEncoder.encode(arg);
  view.set(buf);
  return {
    read: arg.length,
    written: buf.length
  };
};
function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === void 0) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr2 = malloc(buf.length, 1) >>> 0;
    getUint8ArrayMemory0().subarray(ptr2, ptr2 + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr2;
  }
  let len = arg.length;
  let ptr = malloc(len, 1) >>> 0;
  const mem = getUint8ArrayMemory0();
  let offset = 0;
  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 127) break;
    mem[ptr + offset] = code;
  }
  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
    const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
    const ret = encodeString(arg, view);
    offset += ret.written;
    ptr = realloc(ptr, len, offset, 1) >>> 0;
  }
  WASM_VECTOR_LEN = offset;
  return ptr;
}
function isLikeNone(x) {
  return x === void 0 || x === null;
}
var cachedDataViewMemory0 = null;
function getDataViewMemory0() {
  if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || cachedDataViewMemory0.buffer.detached === void 0 && cachedDataViewMemory0.buffer !== wasm.memory.buffer) {
    cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
  }
  return cachedDataViewMemory0;
}
var cachedUint32ArrayMemory0 = null;
function getUint32ArrayMemory0() {
  if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.byteLength === 0) {
    cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
  }
  return cachedUint32ArrayMemory0;
}
function getArrayU32FromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return getUint32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}
function passArray8ToWasm0(arg, malloc) {
  const ptr = malloc(arg.length * 1, 1) >>> 0;
  getUint8ArrayMemory0().set(arg, ptr / 1);
  WASM_VECTOR_LEN = arg.length;
  return ptr;
}
function passArray32ToWasm0(arg, malloc) {
  const ptr = malloc(arg.length * 4, 4) >>> 0;
  getUint32ArrayMemory0().set(arg, ptr / 4);
  WASM_VECTOR_LEN = arg.length;
  return ptr;
}
function getArrayU8FromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}
var TiktokenFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_tiktoken_free(ptr >>> 0, 1));
var Tiktoken = class {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    TiktokenFinalization.unregister(this);
    return ptr;
  }
  free() {
    if (wasm == null) throw new Error("tiktoken: WASM binary has not been propery initialized.");
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_tiktoken_free(ptr, 0);
  }
  /**
   * @param {string} tiktoken_bfe
   * @param {any} special_tokens
   * @param {string} pat_str
   */
  constructor(tiktoken_bfe, special_tokens, pat_str) {
    if (wasm == null) throw new Error("tiktoken: WASM binary has not been propery initialized.");
    const ptr0 = passStringToWasm0(tiktoken_bfe, wasm.__wbindgen_export_1, wasm.__wbindgen_export_2);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(pat_str, wasm.__wbindgen_export_1, wasm.__wbindgen_export_2);
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.tiktoken_new(ptr0, len0, addHeapObject(special_tokens), ptr1, len1);
    this.__wbg_ptr = ret >>> 0;
    TiktokenFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * @returns {string | undefined}
   */
  get name() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.tiktoken_name(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      let v1;
      if (r0 !== 0) {
        v1 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export_3(r0, r1 * 1, 1);
      }
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {string} text
   * @param {any} allowed_special
   * @param {any} disallowed_special
   * @returns {Uint32Array}
   */
  encode(text, allowed_special, disallowed_special) {
    if (wasm == null) throw new Error("tiktoken: WASM binary has not been propery initialized.");
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(text, wasm.__wbindgen_export_1, wasm.__wbindgen_export_2);
      const len0 = WASM_VECTOR_LEN;
      wasm.tiktoken_encode(retptr, this.__wbg_ptr, ptr0, len0, addHeapObject(allowed_special), addHeapObject(disallowed_special));
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v2 = getArrayU32FromWasm0(r0, r1).slice();
      wasm.__wbindgen_export_3(r0, r1 * 4, 4);
      return v2;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {string} text
   * @returns {Uint32Array}
   */
  encode_ordinary(text) {
    if (wasm == null) throw new Error("tiktoken: WASM binary has not been propery initialized.");
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(text, wasm.__wbindgen_export_1, wasm.__wbindgen_export_2);
      const len0 = WASM_VECTOR_LEN;
      wasm.tiktoken_encode_ordinary(retptr, this.__wbg_ptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var v2 = getArrayU32FromWasm0(r0, r1).slice();
      wasm.__wbindgen_export_3(r0, r1 * 4, 4);
      return v2;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {string} text
   * @param {any} allowed_special
   * @param {any} disallowed_special
   * @returns {any}
   */
  encode_with_unstable(text, allowed_special, disallowed_special) {
    if (wasm == null) throw new Error("tiktoken: WASM binary has not been propery initialized.");
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(text, wasm.__wbindgen_export_1, wasm.__wbindgen_export_2);
      const len0 = WASM_VECTOR_LEN;
      wasm.tiktoken_encode_with_unstable(retptr, this.__wbg_ptr, ptr0, len0, addHeapObject(allowed_special), addHeapObject(disallowed_special));
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return takeObject(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {Uint8Array} bytes
   * @returns {number}
   */
  encode_single_token(bytes) {
    if (wasm == null) throw new Error("tiktoken: WASM binary has not been propery initialized.");
    const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_export_1);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.tiktoken_encode_single_token(this.__wbg_ptr, ptr0, len0);
    return ret >>> 0;
  }
  /**
   * @param {Uint32Array} tokens
   * @returns {Uint8Array}
   */
  decode(tokens) {
    if (wasm == null) throw new Error("tiktoken: WASM binary has not been propery initialized.");
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray32ToWasm0(tokens, wasm.__wbindgen_export_1);
      const len0 = WASM_VECTOR_LEN;
      wasm.tiktoken_decode(retptr, this.__wbg_ptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var v2 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_export_3(r0, r1 * 1, 1);
      return v2;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {number} token
   * @returns {Uint8Array}
   */
  decode_single_token_bytes(token) {
    if (wasm == null) throw new Error("tiktoken: WASM binary has not been propery initialized.");
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.tiktoken_decode_single_token_bytes(retptr, this.__wbg_ptr, token);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var v1 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_export_3(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {any}
   */
  token_byte_values() {
    if (wasm == null) throw new Error("tiktoken: WASM binary has not been propery initialized.");
    const ret = wasm.tiktoken_token_byte_values(this.__wbg_ptr);
    return takeObject(ret);
  }
};
function __wbg_parse_def2e24ef1252aff() {
  return handleError(function(arg0, arg1) {
    const ret = JSON.parse(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
  }, arguments);
}
function __wbg_stringify_f7ed6987935b4a24() {
  return handleError(function(arg0) {
    const ret = JSON.stringify(getObject(arg0));
    return addHeapObject(ret);
  }, arguments);
}
function __wbindgen_error_new(arg0, arg1) {
  const ret = new Error(getStringFromWasm0(arg0, arg1));
  return addHeapObject(ret);
}
function __wbindgen_is_undefined(arg0) {
  const ret = getObject(arg0) === void 0;
  return ret;
}
function __wbindgen_object_drop_ref(arg0) {
  takeObject(arg0);
}
function __wbindgen_string_get(arg0, arg1) {
  if (wasm == null) throw new Error("tiktoken: WASM binary has not been propery initialized.");
  const obj = getObject(arg1);
  const ret = typeof obj === "string" ? obj : void 0;
  var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_export_1, wasm.__wbindgen_export_2);
  var len1 = WASM_VECTOR_LEN;
  getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
  getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}
function __wbindgen_throw(arg0, arg1) {
  throw new Error(getStringFromWasm0(arg0, arg1));
}

// node_modules/tiktoken/lite/init.js
var isInitialized = false;
async function init(callback) {
  if (isInitialized)
    return tiktoken_bg_exports;
  const result = await callback({ "./tiktoken_bg.js": tiktoken_bg_exports });
  const instance = "instance" in result && result.instance instanceof WebAssembly.Instance ? result.instance : result instanceof WebAssembly.Instance ? result : null;
  if (instance == null)
    throw new Error("Missing instance");
  __wbg_set_wasm(instance.exports);
  isInitialized = true;
  return tiktoken_bg_exports;
}

// src/tokenizer.ts
var resolveAssetPath = (path) => `public/${path}`;
var initPromise = null;
var encoderPromises = {};
function setTokenizerAssetResolver(resolver) {
  resolveAssetPath = resolver ?? ((path) => `public/${path}`);
  initPromise = null;
  for (const key of Object.keys(encoderPromises)) {
    delete encoderPromises[key];
  }
}
async function ensureInit() {
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
async function loadEncoderConfig(name) {
  const response = await fetch(resolveAssetPath(`bpe/${name}.json`));
  if (!response.ok) throw new Error(`Failed to load encoder: ${name}`);
  return await response.json();
}
async function getEncoder(name) {
  await ensureInit();
  if (!encoderPromises[name]) {
    encoderPromises[name] = (async () => {
      const { bpe_ranks, special_tokens, pat_str } = await loadEncoderConfig(name);
      return new Tiktoken(bpe_ranks, special_tokens, pat_str);
    })();
  }
  return encoderPromises[name];
}
async function countTokens(text, name) {
  if (!text) return 0;
  const encoder = await getEncoder(name);
  return encoder.encode(text).length;
}

// src/settings.ts
var import_obsidian = require("obsidian");
var DEFAULT_SETTINGS = {
  encoding: "o200k_base",
  debounceMs: 180,
  showSelection: true
};
var LLMTokenSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "LLM Tokens" });
    new import_obsidian.Setting(containerEl).setName("Encoding").setDesc("Tokenizer used for counting.").addDropdown((dropdown) => {
      dropdown.addOption("o200k_base", "o200k_base (GPT-4o)").addOption("cl100k_base", "cl100k_base (GPT-3.5/4)").addOption("p50k_base", "p50k_base (GPT-3)").setValue(this.plugin.settings.encoding).onChange(async (value) => {
        this.plugin.settings.encoding = value;
        await this.plugin.saveSettings();
        this.plugin.updateCountSoon();
      });
    });
    new import_obsidian.Setting(containerEl).setName("Debounce (ms)").setDesc("Delay before recomputing after edits.").addSlider((slider) => {
      slider.setLimits(50, 600, 10).setDynamicTooltip().setValue(this.plugin.settings.debounceMs).onChange(async (value) => {
        this.plugin.settings.debounceMs = value;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian.Setting(containerEl).setName("Show selection count").setDesc("Include token count for the current selection when present.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.showSelection).onChange(async (value) => {
        this.plugin.settings.showSelection = value;
        await this.plugin.saveSettings();
        this.plugin.updateCountSoon();
      });
    });
  }
};

// src/main.ts
var LLMTokenPlugin = class extends import_obsidian2.Plugin {
  constructor() {
    super(...arguments);
    __publicField(this, "settings");
    __publicField(this, "statusEl");
    __publicField(this, "timer", null);
  }
  async onload() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    this.configureTokenizerAssets();
    this.statusEl = this.addStatusBarItem();
    this.statusEl.setText("Tokens: --");
    this.statusEl.setAttr("aria-label", `Tokenizer: ${this.settings.encoding}`);
    this.addSettingTab(new LLMTokenSettingTab(this.app, this));
    const schedule = () => this.updateCountSoon();
    this.registerEvent(this.app.workspace.on("active-leaf-change", schedule));
    this.registerEvent(this.app.workspace.on("editor-change", schedule));
    this.registerEvent(this.app.workspace.on("layout-change", schedule));
    this.registerEvent(this.app.vault.on("modify", schedule));
    this.updateCountSoon();
  }
  configureTokenizerAssets() {
    try {
      const adapter = this.app.vault.adapter;
      const configDir = this.app.vault.configDir ?? ".obsidian";
      if (adapter?.getResourcePath) {
        const basePath = (0, import_obsidian2.normalizePath)(`${configDir}/plugins/${this.manifest.id}/public`);
        setTokenizerAssetResolver((relativePath) => {
          const fullPath = (0, import_obsidian2.normalizePath)(`${basePath}/${relativePath}`);
          return adapter.getResourcePath(fullPath);
        });
        return;
      }
      console.warn("LLM Tokens: vault adapter has no getResourcePath; using relative asset fetches");
    } catch (error) {
      console.warn("LLM Tokens: failed to configure asset resolver", error);
    }
    setTokenizerAssetResolver();
  }
  onunload() {
    if (this.timer !== null) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }
  updateCountSoon() {
    if (this.timer !== null) {
      window.clearTimeout(this.timer);
    }
    this.timer = window.setTimeout(async () => {
      this.timer = null;
      await this.updateCount();
    }, Math.max(this.settings.debounceMs, 0));
  }
  getActiveContent() {
    const view = this.app.workspace.getActiveViewOfType(import_obsidian2.MarkdownView);
    if (!view) return { text: "" };
    if (view.getMode() === "preview" || !view.editor) {
      return { text: view.getViewData() };
    }
    const editor = view.editor;
    const selection = editor.somethingSelected() ? editor.getSelection() : void 0;
    return { text: editor.getValue(), selection };
  }
  async computeCounts() {
    const { text, selection } = this.getActiveContent();
    if (!text) return { total: 0 };
    const total = await countTokens(text, this.settings.encoding);
    if (!selection || !this.settings.showSelection) return { total };
    const selectionCount = await countTokens(selection, this.settings.encoding);
    return { total, selection: selectionCount };
  }
  async updateCount() {
    try {
      const counts = await this.computeCounts();
      let label = `Tokens: ${counts.total.toLocaleString()}`;
      if (typeof counts.selection === "number") {
        label += ` \xB7 Sel: ${counts.selection.toLocaleString()}`;
      }
      this.statusEl.setText(label);
      this.statusEl.setAttr("aria-label", `Tokenizer: ${this.settings.encoding}`);
    } catch (error) {
      console.error(error);
      this.statusEl.setText("Tokens: error");
      this.statusEl.setAttr("aria-label", "Tokenizer failed to load");
    }
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
