import styled from '@emotion/styled';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LoadingSpinnerV3 } from './LoadingSpinnerV3';



export default {
  component: LoadingSpinnerV3,
  title: 'my-component/Spinner/LoadingSpinnerV3',
} as ComponentMeta<typeof LoadingSpinnerV3>;



export const Example:ComponentStory<typeof LoadingSpinnerV3> = (args) => {
  
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
      <LoadingSpinnerV3 {...args}/>
    </Container>
  )
}
Example.args = {};
