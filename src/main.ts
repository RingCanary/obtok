import { Plugin, MarkdownView } from "obsidian";
import { DEFAULT_SETTINGS, LLMTokenSettings, LLMTokenSettingTab } from "./settings";
import { countTokens } from "./tokenizer";

export default class LLMTokenPlugin extends Plugin {
  settings: LLMTokenSettings;
  statusEl: HTMLElement;
  private timer: number | null = null;

  async onload() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());

    this.statusEl = this.addStatusBarItem();
    this.statusEl.setText("Tokens: —");

    this.addSettingTab(new LLMTokenSettingTab(this.app, this));

    const schedule = () => this.updateCountSoon();
    this.registerEvent(this.app.workspace.on("active-leaf-change", schedule));
    this.registerEvent(this.app.workspace.on("editor-change", schedule));
    this.registerEvent(this.app.vault.on("modify", schedule));

    this.updateCountSoon(); // first paint
  }

  onunload() {}

  updateCountSoon() {
    if (this.timer) window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => this.updateCount(), this.settings.debounceMs);
  }

  private getActiveEditorText(): { text: string; sel?: string } {
    const view = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (!view) return { text: "" };
    const ed = view.editor;
    const sel = ed.somethingSelected() ? ed.getSelection() : undefined;
    return { text: ed.getValue(), sel };
  }

  private async updateCount() {
    const { text, sel } = this.getActiveEditorText();
    if (!text) { this.statusEl.setText("Tokens: 0"); return; }

    try {
      const total = await countTokens(text, this.settings.encoding);
      let label = `Tokens: ${total.toLocaleString()}`;

      if (sel && this.settings.showSelection) {
        const selCount = await countTokens(sel, this.settings.encoding);
        label += ` · Sel: ${selCount.toLocaleString()}`;
      }

      // (Optional) remaining for a common context window (display-only)
      // const ctx = 128_000; label += ` · Remaining: ${(ctx - total).toLocaleString()}`;

      this.statusEl.setText(label);
      this.statusEl.setAttr("aria-label", `Tokenizer: ${this.settings.encoding}`);
    } catch (e) {
      console.error(e);
      this.statusEl.setText("Tokens: error");
    }
  }

  async saveSettings() { await this.saveData(this.settings); }
}
