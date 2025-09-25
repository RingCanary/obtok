import { App, PluginSettingTab, Setting } from "obsidian";
import LLMTokenPlugin from "./main";

export type EncodingName = "o200k_base" | "cl100k_base" | "p50k_base";

export interface LLMTokenSettings {
  encoding: EncodingName;
  debounceMs: number;
  showSelection: boolean;
}

export const DEFAULT_SETTINGS: LLMTokenSettings = {
  encoding: "o200k_base",   // good default for GPT-4o family
  debounceMs: 180,
  showSelection: true
};

export class LLMTokenSettingTab extends PluginSettingTab {
  plugin: LLMTokenPlugin;
  constructor(app: App, plugin: LLMTokenPlugin) { super(app, plugin); this.plugin = plugin; }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "LLM Tokens" });

    new Setting(containerEl)
      .setName("Encoding")
      .setDesc("Choose the tokenizer family. You can adjust later.")
      .addDropdown(d => d
        .addOption("o200k_base", "o200k_base (GPT-4o family)")
        .addOption("cl100k_base", "cl100k_base (GPT-3.5/4)")
        .addOption("p50k_base", "p50k_base (older/gpt-2-ish)")
        .setValue(this.plugin.settings.encoding)
        .onChange(async v => { this.plugin.settings.encoding = v as any; await this.plugin.saveSettings(); this.plugin.updateCountSoon(); }));

    new Setting(containerEl)
      .setName("Debounce (ms)")
      .setDesc("Update delay after typing.")
      .addSlider(s => s.setLimits(50, 600, 10)
        .setDynamicTooltip()
        .setValue(this.plugin.settings.debounceMs)
        .onChange(async v => { this.plugin.settings.debounceMs = v; await this.plugin.saveSettings(); }));

    new Setting(containerEl)
      .setName("Show selection count")
      .setDesc("If text is selected, show its token count too.")
      .addToggle(t => t
        .setValue(this.plugin.settings.showSelection)
        .onChange(async v => { this.plugin.settings.showSelection = v; await this.plugin.saveSettings(); this.plugin.updateCountSoon(); }));
  }
}
