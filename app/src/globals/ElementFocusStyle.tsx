import tw from 'twin.macro';
import { css } from 'twin.macro';

export const FocusRingStyleString = 'ring-2 transition-shadow duration-200';

export const FocusTwStyle = tw`${FocusRingStyleString}`;

export const FocusFlatStyle = css`
  :focus {
    ${FocusTwStyle}
  }
`;

export default FocusTwStyle;
