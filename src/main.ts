import { MarkdownView, Plugin, normalizePath } from "obsidian";
import { countTokens, setTokenizerAssetResolver } from "./tokenizer";
import { DEFAULT_SETTINGS, LLMTokenSettingTab, LLMTokenSettings } from "./settings";

type Counts = {
  total: number;
  selection?: number;
};

export default class LLMTokenPlugin extends Plugin {
  settings!: LLMTokenSettings;
  private statusEl!: HTMLElement;
  private timer: number | null = null;

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

  private configureTokenizerAssets(): void {
    try {
      const adapter = this.app.vault.adapter as any;
      const configDir = (this.app.vault as any).configDir ?? ".obsidian";

      if (adapter?.getResourcePath) {
        const basePath = normalizePath(`${configDir}/plugins/${this.manifest.id}/public`);
        setTokenizerAssetResolver((relativePath) => {
          const fullPath = normalizePath(`${basePath}/${relativePath}`);
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

  updateCountSoon(): void {
    if (this.timer !== null) {
      window.clearTimeout(this.timer);
    }
    this.timer = window.setTimeout(async () => {
      this.timer = null;
      await this.updateCount();
    }, Math.max(this.settings.debounceMs, 0));
  }

  private getActiveContent(): { text: string; selection?: string } {
    const view = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (!view) return { text: "" };

    if (view.getMode() === "preview" || !view.editor) {
      return { text: view.getViewData() };
    }

    const editor = view.editor;
    const selection = editor.somethingSelected() ? editor.getSelection() : undefined;
    return { text: editor.getValue(), selection };
  }

  private async computeCounts(): Promise<Counts> {
    const { text, selection } = this.getActiveContent();
    if (!text) return { total: 0 };

    const total = await countTokens(text, this.settings.encoding);
    if (!selection || !this.settings.showSelection) return { total };

    const selectionCount = await countTokens(selection, this.settings.encoding);
    return { total, selection: selectionCount };
  }

  async updateCount(): Promise<void> {
    try {
      const counts = await this.computeCounts();
      let label = `Tokens: ${counts.total.toLocaleString()}`;
      if (typeof counts.selection === "number") {
        label += ` · Sel: ${counts.selection.toLocaleString()}`;
      }
      this.statusEl.setText(label);
      this.statusEl.setAttr("aria-label", `Tokenizer: ${this.settings.encoding}`);
    } catch (error) {
      console.error(error);
      this.statusEl.setText("Tokens: error");
      this.statusEl.setAttr("aria-label", "Tokenizer failed to load");
    }
  }

  async saveSettings(): Promise<void> {
    await this.saveData(this.settings);
  }
}
