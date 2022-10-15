import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ToggleGroup } from './ToggleGroup';
import { ToggleGroupItem } from './ToggleGroupItem';
import GlobalStyleProvider from '../GlobalStyleProvider';

export default {
  component: ToggleGroup,
  title: 'my-component/ToggleGroup',
  subcomponents: { ToggleGroupItem },
} as ComponentMeta<typeof ToggleGroup>;

export const Example: ComponentStory<typeof ToggleGroup> = (args) => {
  const { mode, onChange } = args;
  return (
    <GlobalStyleProvider>
      <ToggleGroup mode={mode} onChange={onChange}>
        <ToggleGroupItem value="item 1">Item 1</ToggleGroupItem>
        <ToggleGroupItem value="item 2" disabled>
          Item 2
        </ToggleGroupItem>
        <ToggleGroupItem value="item 3">Item 3</ToggleGroupItem>
        <ToggleGroupItem value="item 4">Item 4</ToggleGroupItem>
        <ToggleGroupItem value="item 5" disabled>
          Item 5
        </ToggleGroupItem>
        <ToggleGroupItem value="item 6">Item 6</ToggleGroupItem>
      </ToggleGroup>
    </GlobalStyleProvider>
  );
};

Example.args = {
  mode: 'single',
  onChange(value) {
    console.log(value);
  },
};
