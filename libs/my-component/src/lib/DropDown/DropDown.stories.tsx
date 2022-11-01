import styled from '@emotion/styled';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {GlobalStyleProvider} from '../GlobalStyleProvider';
import { DropDown } from './DropDown';
import { DropDownItem } from './DropDownItem';
import { DropDownItemGroup } from './DropDownItemGroup';
import { DropDownSubMenu } from './DropDownSubMenu';

export default {
  component: DropDown,
  title: 'my-component/DropDown',
} as ComponentMeta<typeof DropDown>;

export const Primary: ComponentStory<typeof DropDown> = (args) => {
  const Container = styled('div')`
    margin: 0.5rem auto;
    width: max-content;
    height: 200vh;
  `;

  return (
    <GlobalStyleProvider>
    <Container>
      <DropDown label="Item List">
        <DropDownItem>Item 1</DropDownItem>
        <DropDownItem disabled>Item 2</DropDownItem>
        <DropDownItem>Item 3</DropDownItem>
        <DropDownItem>Item 4</DropDownItem>
        <DropDownSubMenu label="menu">
          <DropDownItem>Item 1</DropDownItem>
          <DropDownItem>Item 2</DropDownItem>
        </DropDownSubMenu>
        <DropDownItemGroup label="group 1">
          <DropDownItem disabled>Item 5</DropDownItem>
          <DropDownItem>Item 6</DropDownItem>
        </DropDownItemGroup>
      </DropDown>
    </Container>
    </GlobalStyleProvider>
  );
};
Primary.args = {};
