import FocusStyle from '@globals/ElementFocusStyle';
import tw, { css } from 'twin.macro';
import Button from './Button';
import InputStyles from './Input.styles';

const MarkdownEditorStyles = {
  Preview: tw`flex-grow w-full resize-none overflow-y-scroll p-2`,
  Wrapper: css`
    ${tw`flex flex-col h-full w-full border rounded`}
    &:focus-within {
      ${FocusStyle}
    }
  `,
  ButtonWrapper: css`
    ${tw`border-t`}
    ${Button} {
      ${tw`text-sm text-black border-none rounded-none`}
      &:focus {
        box-shadow: none;
      }
    }
  `,
  Message: InputStyles.Messsage,
};

export default MarkdownEditorStyles;
