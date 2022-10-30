import styled from '@emotion/styled';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LoadingSpinnerV1 } from './LoadingSpinnerV1';

export default {
  component: LoadingSpinnerV1,
  title: 'my-component/Spinner/LoadingSpinnerV1',
} as ComponentMeta<typeof LoadingSpinnerV1>;



export const Primary:ComponentStory<typeof LoadingSpinnerV1> = (args) => {
  
  const Container = styled("div")`
      display:flex;
      justify-content: center;
      width:60%;
      padding:1rem; 
      margin:3rem auto;
      background-color: hsl(210,80%,50%);
  `;
  
  return (
    <Container>
      <LoadingSpinnerV1 {...args}/>
    </Container>
  )
}
Primary.args = {};
