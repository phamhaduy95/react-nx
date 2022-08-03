export class ClickOutSideHandler {
  private element: Element;
  isOutSide: boolean;
  private onClickOutSide: Function;
  private handleClick: (e?: any) => void;
  private handleMouseOver: (e?: any) => void;
  private handleMouseOut: (e?: any) => void;

  constructor(element: Element, onClickOutSide: Function) {
    this.element = element;
    this.isOutSide = true;
    this.handleClick = this.getClickHandler();
    this.handleMouseOut = this.getMouseOutHandler();
    this.handleMouseOver = this.getMouseOverHandler();
    document.addEventListener("click", this.handleClick, true);
    this.element.addEventListener("mouseleave", this.handleMouseOut);
    this.element.addEventListener("mouseenter", this.handleMouseOver);
    this.onClickOutSide = onClickOutSide;
  }

  private getClickHandler() {
    const handlerObject: ClickOutSideHandler = this;
    return function (event: MouseEvent) {
        if (handlerObject.isOutSide) {
          handlerObject.onClickOutSide();
        }
    };
  }

  private getMouseOverHandler() {
    const handlerObject: ClickOutSideHandler = this;
    return function (event: MouseEvent) {
      if (event.currentTarget === handlerObject.element) {
        handlerObject.isOutSide = false;
      }
    };
  }

  private getMouseOutHandler() {
    const handlerObject: ClickOutSideHandler = this;
    return function (event: MouseEvent) {
      if (event.currentTarget === handlerObject.element) {
        handlerObject.isOutSide = true;
      }
    };
  }

  public removeEventHandler() {
    document.removeEventListener("click", this.handleClick, true);
    this.element.removeEventListener("mouseleave", this.handleMouseOut);
    this.element.removeEventListener("mouseenter", this.handleMouseOver);
  }
}
