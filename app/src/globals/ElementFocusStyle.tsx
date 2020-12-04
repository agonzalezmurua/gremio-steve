import { css, theme } from 'twin.macro';

const FocusStyle = css`
  box-shadow: 0 0 0 2px ${theme`colors.blue.500`};
`;

export const FocusStyleTW = css`
  :focus {
    ${FocusStyle}
  }
`;

export default FocusStyle;
