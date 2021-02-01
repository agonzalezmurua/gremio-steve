import tw from 'twin.macro';
import { css } from 'twin.macro';

export const FocusRingStyleString =
  'ring-2 transition-shadow duration-200 dark:(ring-blue-500)';

export const FocusRingTwStyle = tw`${FocusRingStyleString}`;

export const FocusRingFlatStyle = css`
  :focus {
    ${FocusRingTwStyle}
  }
`;

export default FocusRingTwStyle;
