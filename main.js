(function () {
  "use strict";

  class OptimizePlugin {
    constructor() {
      this.editor = editorManager.editor;
    }

    init() {
      this.optimizeEditor();
      this.enableSmoothScrolling();
      this.showNotification("Plugin Optimize telah diaktifkan!");
    }

    optimizeEditor() {
      this.editor.container.style.fontSize = "14px";
      this.editor.setOptions({
        maxLines: 2000,
      });
      this.adjustResolution();
      this.addStabilizer();
    }

    adjustResolution() {
      const devicePixelRatio = window.devicePixelRatio || 1;
      this.editor.renderer.setOption("pixelRatio", devicePixelRatio);
    }

    addStabilizer() {
      this.editor.on("change", () => {
        requestAnimationFrame(() => {
          this.editor.renderer.updateFull();
        });
      });
    }

    enableSmoothScrolling() {
      this.editor.renderer.scrollBarV.element.style.scrollBehavior = "smooth";
      this.editor.renderer.scrollBarH.element.style.scrollBehavior = "smooth";
    }

    showNotification(message) {
      window.toast(message, 3000);
    }

    destroy() {
      this.disableSmoothScrolling();
      this.showNotification("Plugin Optimize telah dinonaktifkan!");
    }

    disableSmoothScrolling() {
      this.editor.renderer.scrollBarV.element.style.scrollBehavior = "auto";
      this.editor.renderer.scrollBarH.element.style.scrollBehavior = "auto";
    }
  }

  if (window.acode) {
    const plugin = new OptimizePlugin();

    acode.setPluginInit("optimize-plugin", () => plugin.init());
    acode.setPluginUnmount("optimize-plugin", () => plugin.destroy());
  }
})();