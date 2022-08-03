export class OnResizeObserver {
  private listeners: Set<Function>;

  constructor() {
    this.listeners = new Set();
    this.execute.bind(this);
    window.addEventListener("resize", this.execute.bind(this));
  }

  addListener(callback: Function) {
    this.listeners.add(callback);
  }

  private execute() {
    this.listeners.forEach((value) => {
      value();
    });
  }

  deactivate() {
    window.removeEventListener("resize", this.execute.bind(this));
  }
}
