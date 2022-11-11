type ElementPosition = {
  top: number;
  left: number;
};

export default class PopupPosition {
  protected trigger: HTMLElement;
  protected popup: HTMLElement;
  constructor(trigger: HTMLElement, popup: HTMLElement) {
    this.trigger = trigger;
    this.popup = popup;
  }

  getValue(): ElementPosition {
    return {
      top: this.calculateTopCoordinate(),
      left: this.calculateLeftCoordinate(),
    };
  }

  protected triggerPosition() {
    return getClientPositionOfElement(this.trigger);
  }

  protected triggerSize() {
    return getSizeOf(this.trigger);
  }

  protected popupSize() {
    return getSizeOf(this.popup);
  }

  protected heightDiff() {
    return this.triggerSize().height - this.popupSize().height;
  }

  protected widthDiff() {
    return this.triggerSize().width - this.popupSize().width;
  }

  protected calculateTopCoordinate(): number {
    return 0;
  }

  protected calculateLeftCoordinate(): number {
    return 0;
  }
}

export class TopCenterPopupPosition extends PopupPosition {
  protected override calculateTopCoordinate(): number {
    return this.triggerPosition().top - this.popupSize().height;
  }

  protected override calculateLeftCoordinate(): number {
    return this.widthDiff() / 2 + this.triggerPosition().left;
  }
}

export class TopRightPopupPosition extends PopupPosition {
  protected override calculateTopCoordinate(): number {
    return this.triggerPosition().top - this.popupSize().height;
  }

  protected override calculateLeftCoordinate(): number {
    return this.triggerPosition().left + this.widthDiff();
  }
}

export class TopLeftPopupPosition extends PopupPosition {
  protected override calculateTopCoordinate(): number {
    return this.triggerPosition().top - this.popupSize().height;
  }

  protected override calculateLeftCoordinate(): number {
    return this.triggerPosition().left;
  }
}

export class BottomCenterPopupPosition extends PopupPosition {
  protected override calculateTopCoordinate(): number {
    return this.triggerPosition().top + this.triggerSize().height;
  }

  protected override calculateLeftCoordinate(): number {
    return this.widthDiff() / 2 + this.triggerPosition().left;
  }
}

export class BottomRightPopupPosition extends PopupPosition {
  protected override calculateTopCoordinate(): number {
    return this.triggerPosition().top + this.triggerSize().height;
  }

  protected override calculateLeftCoordinate(): number {
    return this.triggerPosition().left + this.widthDiff();
  }
}
export class BottomLeftPopupPosition extends PopupPosition {
  protected override calculateTopCoordinate(): number {
    return this.triggerPosition().top + this.triggerSize().height;
  }

  protected override calculateLeftCoordinate(): number {
    return this.triggerPosition().left;
  }
}

export class LeftTopPopupPosition extends PopupPosition {
  protected override calculateTopCoordinate(): number {
    return this.triggerPosition().top;
  }
  protected override calculateLeftCoordinate(): number {
    return this.triggerPosition().left - this.popupSize().width;
  }
}

export class LeftCenterPopupPosition extends PopupPosition {
  protected override calculateTopCoordinate(): number {
    return this.triggerPosition().top + this.heightDiff() / 2;
  }
  protected override calculateLeftCoordinate(): number {
    return this.triggerPosition().left - this.popupSize().width;
  }
}

export class LeftBottomPopupPosition extends PopupPosition {
  protected override calculateTopCoordinate(): number {
    return this.triggerPosition().top + this.heightDiff();
  }
  protected override calculateLeftCoordinate(): number {
    return this.triggerPosition().left - this.popupSize().width;
  }
}

export class RightTopPopupPosition extends PopupPosition {
  protected override calculateTopCoordinate(): number {
    return this.triggerPosition().top;
  }
  protected override calculateLeftCoordinate(): number {
    return this.triggerPosition().left + this.triggerSize().width;
  }
}

export class RightCenterPopupPosition extends PopupPosition {
  protected override calculateTopCoordinate(): number {
    return this.triggerPosition().top + this.heightDiff() / 2;
  }
  protected override calculateLeftCoordinate(): number {
    return this.triggerPosition().left + this.triggerSize().width;
  }
}

export class RightBottomPopupPosition extends PopupPosition {
  protected override calculateTopCoordinate(): number {
    return this.triggerPosition().top + this.heightDiff();
  }
  protected override calculateLeftCoordinate(): number {
    return this.triggerPosition().left + this.triggerSize().width;
  }
}


export function getClientPositionOfElement(element: HTMLElement) {
  const { top, left } = element.getBoundingClientRect();
  return { top, left };
}

export function getSizeOf(element: HTMLElement) {
  const { width, height } = element.getBoundingClientRect();
  return { width, height };
}