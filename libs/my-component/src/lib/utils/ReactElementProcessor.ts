import { DropDownItem } from '../DropDown/DropDownItem';
export function ensureElementsListAsArray(children:JSX.Element[]|JSX.Element){
    if (children instanceof Array) return children;
    return [children];
}

