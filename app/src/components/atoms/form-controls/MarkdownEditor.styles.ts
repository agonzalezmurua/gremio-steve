import ElementFocusStyle from '@globals/ElementFocusStyle';
import tw, { css } from 'twin.macro';
import Button from './Button';

const MarkdownEditorStyles = {
  Preview: tw`flex-grow w-full resize-none overflow-y-scroll p-2`,
  Wrapper: css`
    ${tw`flex flex-col h-full w-full border rounded`}
    &:focus-within {
      ${ElementFocusStyle}
    }
  `,
  ButtonWrapper: css`
    ${tw`border-t`}
    ${Button} {
      &:focus {
        box-shadow: none;
      }
    }
  `,
};

export default MarkdownEditorStyles;
