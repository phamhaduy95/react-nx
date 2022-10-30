import styled from '@emotion/styled';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '../Button';
import { ToolTips } from './ToolTips';
import './Tooltips.stories.scss';

export default {
  component: ToolTips,
  title: 'my-component/ToolTips',
} as ComponentMeta<typeof ToolTips>;

export const Example: ComponentStory<typeof ToolTips> = (arg) => {
  const Container = styled('div')`
    width: max-content;
    margin: 2rem 1rem;
  `;

  return (
    <Container>
      <ToolTips {...arg}>
        <Button className="Button">Click</Button>
      </ToolTips>
    </Container>
  );
};
Example.args = {
  text: ' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut unde excepturi sunt laborum porro rem inventore quo. Molestiae adipisci exercitationem amet ipsam ut. Veritatis consequuntur voluptatem exercitationem, quasi illum numquam.',
  placement: 'bottom-center',
  padding: 5,
  enterDelay: 100,
};
