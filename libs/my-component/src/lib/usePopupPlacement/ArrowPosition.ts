type Dir = "top" | "bottom" | "right" | "left";

// const borderValue: string = "var(--arrow-size) solid transparent";
// const sideBorderValue = "var(--arrow-size) solid var(--arrow-color)";

export class ArrowPosition {
  protected arrow: HTMLElement;
  constructor(arrow: HTMLElement) {
    this.arrow = arrow;
    this.setArrowSize();
    this.styleReset();
  }

  setDirection(dir: Dir) {
    switch (dir) {
      case "bottom": {
        this.arrow.style.transform ="rotateZ(-135deg)";
        break;
      }
      case "top": {
        this.arrow.style.transform ="rotateZ(45deg)";
        break;
      }
      case "right": {
        this.arrow.style.transform ="rotateZ(135deg)";
        break;
      }

      case "left": {
        this.arrow.style.transform ="rotateZ(-45deg)";
        break;
      }
    }
    return this;
  }

  protected setPosition() {
    return this;
  }

  protected setArrowSize(){
    this.arrow.style.setProperty("--arrow-size","0.5rem")
    this.arrow.style.setProperty("--haft-arrow-size","0.25rem");
    this.arrow.style.width = "var(--arrow-size)";
    this.arrow.style.height = "var(--arrow-size)";
  }

  protected styleReset() {
    this.arrow.style.bottom = "unset";
    this.arrow.style.left = "unset";
    this.arrow.style.right = "unset";
    this.arrow.style.top = "unset";
  }
}

const centerOffSet = "calc(50% - var(--haft-arrow-size))";
const sideOffset = "var(--arrow-size)";
const offset = "calc(100% - var(--haft-arrow-size))"

export class BottomLeftArrowPosition extends ArrowPosition {
  setPosition() {
    this.arrow.style.bottom =  offset;
    this.arrow.style.left = sideOffset;
    return this;
  }
}

export class BottomCenterArrowPosition extends ArrowPosition {
  setPosition() {
    this.arrow.style.bottom =  offset;
    this.arrow.style.left = centerOffSet;
    return this;
  }
}

export class BottomRightArrowPosition extends ArrowPosition {
  setPosition() {
    this.arrow.style.bottom =  offset;
    this.arrow.style.right = sideOffset;
    return this;
  }
}

export class TopLeftArrowPosition extends ArrowPosition {
  setPosition() {
    this.arrow.style.top =  offset;
    this.arrow.style.left = sideOffset;
    return this;
  }
}

export class TopCenterArrowPosition extends ArrowPosition {
  setPosition() {
    this.arrow.style.top =  offset;
    this.arrow.style.left = centerOffSet;
    return this;
  }
}

export class TopRightArrowPosition extends ArrowPosition {
  setPosition() {
    this.arrow.style.top =  offset;
    this.arrow.style.right = sideOffset;
    return this;
  }
}

export class LeftTopArrowPosition extends ArrowPosition {
  setPosition() {
    this.arrow.style.top = sideOffset;
    this.arrow.style.left = offset;
    return this;
  }
}

export class LeftCenterArrowPosition extends ArrowPosition {
  setPosition() {
    this.arrow.style.top = centerOffSet;
    this.arrow.style.left = offset;
    return this;
  }
}

export class LeftBottomArrowPosition extends ArrowPosition {
  setPosition() {
    this.arrow.style.bottom = sideOffset;
    this.arrow.style.left = offset;
    return this;
  }
}

export class RightTopArrowPosition extends ArrowPosition {
  setPosition() {
    this.arrow.style.top = sideOffset;
    this.arrow.style.right = offset;
    return this;
  }
}

export class RightCenterArrowPosition extends ArrowPosition {
  setPosition() {
    this.arrow.style.top = centerOffSet;
    this.arrow.style.right = offset;
    return this;
  }
}

export class RightBottomArrowPosition extends ArrowPosition {
  setPosition() {
    this.arrow.style.bottom = sideOffset;
    this.arrow.style.right = offset;
    return this;
  }
}
