import styled from '@emotion/styled';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LoadingSpinnerV2 } from './LoadingSpinnerV2';


export default {
  component: LoadingSpinnerV2,
  title: 'my-component/Spinner/LoadingSpinnerV2',
} as ComponentMeta<typeof LoadingSpinnerV2>;



export const Primary:ComponentStory<typeof LoadingSpinnerV2> = (args) => {
  
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
      <LoadingSpinnerV2 {...args}/>
    </Container>
  )
}
Primary.args = {};
