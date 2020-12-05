import tw from 'twin.macro';
import { css, theme } from 'twin.macro';

export const FocusStyleString = 'ring-2 transition-shadow duration-200';

const FocusStyle = css`
  ${tw`${FocusStyleString}`}
`;

export const FocusStyleTW = css`
  :focus {
    ${FocusStyle}
  }
`;

export default FocusStyle;
