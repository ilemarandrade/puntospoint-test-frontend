import React from 'react';
import { render } from '@testing-library/react';
import Rechart from '.';
import ytgydtDataMock from '@/datamock/ytg-ytd-mock';

describe('Rechart Component', () => {
  it('renders correctly with Clients tag', async () => {
    const { container } = render(
      <div className="w-[80vw]">
        <Rechart data={ytgydtDataMock} />
      </div>
    );
    expect(container).toMatchSnapshot();
  });
});
