import ElementFocusStyle from '@globals/ElementFocusStyle';
import tw, { css } from 'twin.macro';

const Wrapper = css`
  ${tw`flex bg-white rounded border items-center`} :focus-within {
    ${ElementFocusStyle}
  }
`;
const Input = tw`bg-transparent px-2 text-sm flex-grow h-8`;
const Icon = tw`p-2`;

const InputStyles = {
  Wrapper: Wrapper,
  Input: Input,
  Icon: Icon,
};

export default InputStyles;
