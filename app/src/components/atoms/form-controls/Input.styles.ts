import { FocusRingTwStyle } from '@globals/ElementFocusStyle';
import tw, { css } from 'twin.macro';

const Wrapper = css`
  ${tw`flex bg-white rounded border items-center relative dark:(bg-gray-800 border-gray-500)`}
  &:focus-within {
    ${FocusRingTwStyle}
  }
`;
const Input = tw`bg-transparent rounded px-2 flex-grow h-8 text-sm text-gray-900 dark:(text-white)`;
const Icon = css`
  ${tw`p-2`}
  svg {
    ${tw`h-5 w-5`}
  }
`;
const ErrorWrapper = tw`text-red-500 border-red-300 bg-red-50 dark:(border-red-600 bg-opacity-5 bg-red-900)`;
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
  ErrorWrapper: ErrorWrapper,
  Messsage: Messsage,
};

export default InputStyles;
