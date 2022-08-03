import { getOffsetPositionOnPageOf, getSizeOf } from "./utilities";

type ElementPosition = {
  top: number;
  left: number;
};

export default class PopupPosition {
  protected wrapper: HTMLElement;
  protected popup: HTMLElement;
  constructor(wrapper: HTMLElement, popup: HTMLElement) {
    this.wrapper = wrapper;
    this.popup = popup;
  }

  getValue(): ElementPosition {
    return {
      top: this.calculateTopCoordinate(),
      left: this.calculateLeftCoordinate(),
    };
  }

  protected wrapperPosition() {
    return getOffsetPositionOnPageOf(this.wrapper);
  }

  protected wrapperSize() {
    return getSizeOf(this.wrapper);
  }

  protected popupSize() {
    return getSizeOf(this.popup);
  }

  protected heightDiff() {
    return this.wrapperSize().height - this.popupSize().height;
  }

  protected widthDiff() {
    return this.wrapperSize().width - this.popupSize().width;
  }

  protected calculateTopCoordinate(): number {
    return 0;
  }

  protected calculateLeftCoordinate(): number {
    return 0;
  }
}

export class TopCenterPopupPosition extends PopupPosition {
  protected calculateTopCoordinate(): number {
    return this.wrapperPosition().top - this.popupSize().height;
  }

  protected calculateLeftCoordinate(): number {
    return this.widthDiff() / 2 + this.wrapperPosition().left;
  }
}

export class TopRightPopupPosition extends PopupPosition {
  protected calculateTopCoordinate(): number {
    return this.wrapperPosition().top - this.popupSize().height;
  }

  protected calculateLeftCoordinate(): number {
    return this.wrapperPosition().left + this.widthDiff();
  }
}

export class TopLeftPopupPosition extends PopupPosition {
  protected calculateTopCoordinate(): number {
    return this.wrapperPosition().top - this.popupSize().height;
  }

  protected calculateLeftCoordinate(): number {
    return this.wrapperPosition().left;
  }
}

export class BottomCenterPopupPosition extends PopupPosition {
  protected calculateTopCoordinate(): number {
    return this.wrapperPosition().top + this.wrapperSize().height;
  }

  protected calculateLeftCoordinate(): number {
    return this.widthDiff() / 2 + this.wrapperPosition().left;
  }
}

export class BottomRightPopupPosition extends PopupPosition {
  protected calculateTopCoordinate(): number {
    return this.wrapperPosition().top + this.wrapperSize().height;
  }

  protected calculateLeftCoordinate(): number {
    return this.wrapperPosition().left + this.widthDiff();
  }
}
export class BottomLeftPopupPosition extends PopupPosition {
  protected calculateTopCoordinate(): number {
    return this.wrapperPosition().top + this.wrapperSize().height;
  }

  protected calculateLeftCoordinate(): number {
    return this.wrapperPosition().left;
  }
}

export class LeftTopPopupPosition extends PopupPosition {
  protected calculateTopCoordinate(): number {
    return this.wrapperPosition().top;
  }
  protected calculateLeftCoordinate(): number {
    return this.wrapperPosition().left - this.popupSize().width;
  }
}

export class LeftCenterPopupPosition extends PopupPosition {
  protected calculateTopCoordinate(): number {
    return this.wrapperPosition().top + this.heightDiff() / 2;
  }
  protected calculateLeftCoordinate(): number {
    return this.wrapperPosition().left - this.popupSize().width;
  }
}

export class LeftBottomPopupPosition extends PopupPosition {
  protected calculateTopCoordinate(): number {
    return this.wrapperPosition().top + this.heightDiff();
  }
  protected calculateLeftCoordinate(): number {
    return this.wrapperPosition().left - this.popupSize().width;
  }
}

export class RightTopPopupPosition extends PopupPosition {
  protected calculateTopCoordinate(): number {
    return this.wrapperPosition().top;
  }
  protected calculateLeftCoordinate(): number {
    return this.wrapperPosition().left + this.wrapperSize().width;
  }
}

export class RightCenterPopupPosition extends PopupPosition {
  protected calculateTopCoordinate(): number {
    return this.wrapperPosition().top + this.heightDiff() / 2;
  }
  protected calculateLeftCoordinate(): number {
    return this.wrapperPosition().left + this.wrapperSize().width;
  }
}

export class RightBottomPopupPosition extends PopupPosition {
  protected calculateTopCoordinate(): number {
    return this.wrapperPosition().top + this.heightDiff();
  }
  protected calculateLeftCoordinate(): number {
    return this.wrapperPosition().left + this.wrapperSize().width;
  }
}
