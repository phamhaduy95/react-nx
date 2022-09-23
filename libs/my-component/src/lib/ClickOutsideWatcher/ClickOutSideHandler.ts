export class ClickOutSideHandler {
  private element: Element;
  isOutSide: boolean;
  private onClickOutSide: (e:MouseEvent)=>void;
  private handleClick: (e?: any) => void;
  private handleMouseOver: (e?: any) => void;
  private handleMouseOut: (e?: any) => void;

  constructor(element: Element, onClickOutSide: (e:MouseEvent)=>void) {
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
    const ref: ClickOutSideHandler = this;
    return function (event: MouseEvent) {
        if (ref.isOutSide) {
          ref.onClickOutSide(event);
        }
    };
  }

  private getMouseOverHandler() {
    const ref: ClickOutSideHandler = this;
    return function (event: MouseEvent) {
      if (event.currentTarget === ref.element) {
        ref.isOutSide = false;
      }
    };
  }

  private getMouseOutHandler() {
    const ref: ClickOutSideHandler = this;
    return function (event: MouseEvent) {
      if (event.currentTarget === ref.element) {
        ref.isOutSide = true;
      }
    };
  }

  public removeEventHandler() {
    document.removeEventListener("click", this.handleClick, true);
    this.element.removeEventListener("mouseleave", this.handleMouseOut);
    this.element.removeEventListener("mouseenter", this.handleMouseOver);
  }
}
