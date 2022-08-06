import { render } from '@testing-library/react';

import MaterialSideBar from './MaterialSideBar';

describe('MaterialSideBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MaterialSideBar />);
    expect(baseElement).toBeTruthy();
  });
});
