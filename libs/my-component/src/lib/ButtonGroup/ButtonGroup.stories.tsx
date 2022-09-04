// import { ComponentStory, ComponentMeta } from '@storybook/react';
// import ButtonGroup from './ButtonGroup';
// import ButtonGroupItem from './ButtonGroupItem';

// export default {
//   component: ButtonGroup,
//   title: 'my-component/ButtonGroup',
//   subcomponents: { ButtonGroupItem },
// } as ComponentMeta<typeof ButtonGroup>;

// const Template: ComponentStory<typeof ButtonGroup> = (args) => (
//   <ButtonGroup {...args} />
// );

// export const OneSelectedItem: ComponentStory<typeof ButtonGroup> = (args) => (
//   <ButtonGroup {...args}>
//     <ButtonGroupItem key={0}>Item 1</ButtonGroupItem>
//     <ButtonGroupItem key={1}>Item 2</ButtonGroupItem>
//     <ButtonGroupItem key={2}>Item 3</ButtonGroupItem>
//   </ButtonGroup>
// );

// OneSelectedItem.args = {
//   mandatory:true,
//   disabled:false,
//   multiple:false,
// }

// export const MultiChoiceItem: ComponentStory<typeof ButtonGroup> = (args) => (
//   <ButtonGroup {...args}>
//     <ButtonGroupItem key={0}>Item 1</ButtonGroupItem>
//     <ButtonGroupItem active key={2}>
//       Item 2
//     </ButtonGroupItem>
//     <ButtonGroupItem key={1}>Item 3</ButtonGroupItem>
//   </ButtonGroup>
// );

// MultiChoiceItem.args = {
//   multiple:true,
//   mandatory:false,
// }