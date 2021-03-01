import tw, { css } from 'twin.macro';
import Button from '_/components/atoms/button';
import Label from '_/components/atoms//label';

const GameMapFormList = {
  Wrapper: css`
    ${tw`flex flex-col space-y-4`}
    > ${Button} {
      ${tw`flex border-2 border-dotted flex-1 items-center justify-center space-x-2`}
      svg {
        ${tw`h-5 w-5`}
      }
    }
  `,
  GameMaps: css`
    ${tw`flex flex-row`}
    ul {
      ${tw`w-full space-y-6`}
      li {
        ${tw`flex space-x-2`}
        ${Label} {
          ${tw`flex-1`}
        }
        ${Button} {
          ${tw`flex-shrink self-end`}
        }
      }
    }
  `,
};

export default GameMapFormList;
