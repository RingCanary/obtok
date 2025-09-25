import { App, PluginSettingTab, Setting } from "obsidian";
import LLMTokenPlugin from "./main";

export type EncodingName = "o200k_base" | "cl100k_base" | "p50k_base";

export interface LLMTokenSettings {
  encoding: EncodingName;
  debounceMs: number;
  showSelection: boolean;
}

export const DEFAULT_SETTINGS: LLMTokenSettings = {
  encoding: "o200k_base",
  debounceMs: 180,
  showSelection: true,
};

export class LLMTokenSettingTab extends PluginSettingTab {
  constructor(app: App, private readonly plugin: LLMTokenPlugin) {
    super(app, plugin);
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "LLM Tokens" });

    new Setting(containerEl)
      .setName("Encoding")
      .setDesc("Tokenizer used for counting.")
      .addDropdown((dropdown) => {
        dropdown
          .addOption("o200k_base", "o200k_base (GPT-4o)")
          .addOption("cl100k_base", "cl100k_base (GPT-3.5/4)")
          .addOption("p50k_base", "p50k_base (GPT-3)")
          .setValue(this.plugin.settings.encoding)
          .onChange(async (value) => {
            this.plugin.settings.encoding = value as EncodingName;
            await this.plugin.saveSettings();
            this.plugin.updateCountSoon();
          });
      });

    new Setting(containerEl)
      .setName("Debounce (ms)")
      .setDesc("Delay before recomputing after edits.")
      .addSlider((slider) => {
        slider
          .setLimits(50, 600, 10)
          .setDynamicTooltip()
          .setValue(this.plugin.settings.debounceMs)
          .onChange(async (value) => {
            this.plugin.settings.debounceMs = value;
            await this.plugin.saveSettings();
          });
      });

    new Setting(containerEl)
      .setName("Show selection count")
      .setDesc("Include token count for the current selection when present.")
      .addToggle((toggle) => {
        toggle
          .setValue(this.plugin.settings.showSelection)
          .onChange(async (value) => {
            this.plugin.settings.showSelection = value;
            await this.plugin.saveSettings();
            this.plugin.updateCountSoon();
          });
      });
  }
}
