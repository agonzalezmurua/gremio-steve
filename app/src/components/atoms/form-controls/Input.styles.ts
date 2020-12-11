import FocusRingTwStyle from '@globals/ElementFocusStyle';
import tw, { css } from 'twin.macro';

const Wrapper = css`
  ${tw`flex bg-white rounded border items-center relative`} :focus-within {
    ${FocusRingTwStyle}
  }
`;
const Input = tw`bg-transparent px-2 flex-grow h-8 text-sm text-gray-900`;
const Icon = css`
  ${tw`p-2`}
  svg {
    ${tw`h-5 w-5`}
  }
`;
const Error = tw`text-red-500 border-red-300 bg-red-50`;
const Messsage = css`
  ${tw`-top-5 absolute text-xs right-0 normal-case w-1/2 text-right truncate`}
  &::first-letter {
    ${tw`uppercase`}
  }
`;

const InputStyles = {
  Wrapper: Wrapper,
  Input: Input,
  Icon: Icon,
  Error: Error,
  Messsage: Messsage,
};

export default InputStyles;
