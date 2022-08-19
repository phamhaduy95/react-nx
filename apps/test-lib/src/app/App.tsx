import styled from '@emotion/styled';
import {
  TimePicker,
} from '@phduylib/my-component';

import { StyledApp } from './App.styled';



export function App() {
  return (
    <StyledApp>
      <TimePicker delimiter=':' isSecondIncluded={false}/>
    </StyledApp>
  );
}

export default App;
