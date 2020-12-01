import Label from '@components/atoms/form-controls/Label';
import tw, { css } from 'twin.macro';

const GameMapFormFragment = {
  Wrapper: css`
    ${tw`flex space-x-2`}
    ${Label} {
      ${tw`flex-1`}
    }
  `,
};

export default GameMapFormFragment;
