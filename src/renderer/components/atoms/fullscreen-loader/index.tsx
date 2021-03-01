import 'twin.macro';
import React from 'react';

import Spinner from '_/assets/spinner.svg';

const FullscreenLoader = () => {
  return (
    <div tw="h-full w-full flex justify-center items-center">
      <Spinner tw="h-8 w-8 animate-spin" />
    </div>
  );
};

export default FullscreenLoader;
