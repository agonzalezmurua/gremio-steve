import FocusRingTwStyle from '_globals/ElementFocusStyle';
import tw, { css } from 'twin.macro';
import Button from '../../atoms/button';
import InputStyles from '../../atoms/input/styles';

const MarkdownEditorStyles = {
  Wrapper: css`
    ${tw`flex flex-col h-full w-full border dark:border-gray-500 rounded overflow-hidden`}
    &:focus-within {
      ${FocusRingTwStyle}
    }
  `,
  Preview: tw`flex-grow w-full resize-none overflow-y-scroll p-2`,
  ButtonWrapper: css`
    ${tw`border-t border-gray-500 dark:(bg-gray-800)`}
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
