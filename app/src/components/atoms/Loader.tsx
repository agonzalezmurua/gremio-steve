import React from 'react';
import tw, { styled } from 'twin.macro';

import Spinner from '@assets/icons/steve/spinner.svg';

type LoaderProps = {
  show?: boolean;
};

const Loader: React.FC<LoaderProps> = ({ ...props }) => {
  return (
    <section {...props}>
      <Spinner tw="animate-spin w-24 h-24" />
    </section>
  );
};

const StyledLoader = styled(Loader)((props) => [
  tw`absolute h-full w-full bg-white flex justify-center items-center`,
  props.show === false && tw`animate-fadeout`,
]);

export default StyledLoader;
