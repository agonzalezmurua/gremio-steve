import React from 'react';
import tw, { styled } from 'twin.macro';

import ArrowLeft from '@assets/icons/outline/arrow-left.svg';
import ArrowRight from '@assets/icons/outline/arrow-right.svg';

const NavigationControls = (props) => {
  return (
    <section className={props.className} tw="flex space-x-2">
      <button>
        <ArrowLeft />
      </button>
      <button>
        <ArrowRight />
      </button>
    </section>
  );
};

export default styled(NavigationControls)`
  button {
    ${tw`p-1 hover:text-gray-700`}
    > svg {
      ${tw`h-5 w-5`}
    }
  }
`;
