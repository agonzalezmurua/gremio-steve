import tw, { styled } from 'twin.macro';

import FocusRingTwStyle from '@/globals/styles/focus';

const Anchor = styled.a`
  ${tw`dark:text-blue-300`}
  &:focus {
    ${FocusRingTwStyle}
  }
  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

export default Anchor;
