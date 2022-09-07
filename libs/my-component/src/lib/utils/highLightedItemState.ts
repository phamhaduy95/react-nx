

export function searchForNextNonDisableItem<T extends {disabled:boolean}>(
    itemList: T[],
    startPos: number,
    dir: 'des' | 'acs'
  ) {
    if (dir === 'acs') {
      for (let i = startPos + 1; i < itemList.length; i++) {
        console.assert(itemList[i] !== undefined, itemList, i);
        if (itemList[i].disabled) continue;
        return i;
      }
    } else {
      for (let i = startPos - 1; i >= 0; i--) {
        if (itemList[i].disabled) continue;
        return i;
      }
    }
    return startPos;
  }