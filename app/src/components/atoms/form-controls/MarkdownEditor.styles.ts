import FocusRingTwStyle from '@globals/ElementFocusStyle';
import tw, { css } from 'twin.macro';
import Button from './Button';
import InputStyles from './Input.styles';

const MarkdownEditorStyles = {
  Wrapper: css`
    ${tw`flex flex-col h-full w-full border dark:border-gray-500 rounded`}
    &:focus-within {
      ${FocusRingTwStyle}
    }
  `,
  Preview: tw`flex-grow w-full resize-none overflow-y-scroll p-2`,
  ButtonWrapper: css`
    ${tw`border-t border-gray-500`}
    ${Button} {
      ${tw`text-sm border-none rounded-none px-4`}
      &:focus {
        box-shadow: none;
      }
    }
  `,
  Message: InputStyles.Messsage,
};

export default MarkdownEditorStyles;
