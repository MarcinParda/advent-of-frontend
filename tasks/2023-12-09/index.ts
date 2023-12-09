export interface Tool {
  init(): void;
  update(): void;
  dispose(): void;
  isInitialized?: boolean;
}

export class Equipment {
  tools: Tool[] = [];
  registerTools(...tools: Tool[]) {
    tools.forEach((tool) => {
      this.tools.push({ ...tool, isInitialized: false });
    });
  }
  initializeTools() {
    this.tools.forEach((tool) => {
      tool.isInitialized = true;
      tool.init();
    });
  }
  updateTools() {
    this.tools.forEach((tool) => {
      if (!tool.isInitialized) {
        throw new Error('Cannot update any tools before initialization.');
      }
      tool.update();
    });
  }
  disposeTools() {
    this.tools.forEach((tool) => {
      tool.dispose();
    });
  }
}
