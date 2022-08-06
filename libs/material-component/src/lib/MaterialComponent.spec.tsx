import { render } from '@testing-library/react';

import MaterialComponent from './MaterialComponent';

describe('MaterialComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MaterialComponent />);
    expect(baseElement).toBeTruthy();
  });
});
