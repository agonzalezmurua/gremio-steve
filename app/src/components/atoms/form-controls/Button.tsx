import { FocusStyleTW } from '@globals/ElementFocusStyle';
import tw, { styled } from 'twin.macro';

type ButtonProps = {
  color?: 'red' | 'white' | 'blue';
  kind?: 'normal' | 'small' | 'self-contained';
  active?: boolean;
} & React.HTMLProps<HTMLButtonElement>;

const Button = styled.button<ButtonProps>(
  ({ color, kind: variant, active }) => [
    tw`
    border
    rounded
    transition-colors
    duration-200
    ease-in-out
    outline-none
  `,
    FocusStyleTW,
    variant === 'normal' && tw`p-2 pl-4 pr-4`,
    variant === 'small' && tw`p-1 pl-2 pr-2`,
    color === 'white' &&
      tw`
      bg-white
      disabled:(text-gray-300 border-gray-300 bg-gray-100) 
      active:(bg-gray-200)
      hover:(bg-gray-100)
    `,
    color === 'white' && active && tw`bg-gray-200`,
    color === 'red' &&
      tw`
      text-white
      bg-red-600 hover:bg-red-700 active:bg-red-900
      border-red-900
    `,
    color === 'red' && active && tw`bg-red-900`,
    color === 'blue' &&
      tw`
      text-white
      bg-blue-600 hover:bg-blue-700 active:bg-blue-900
      border-blue-900
    `,
    color === 'blue' && active && tw`bg-blue-900`,
  ]
);

Button.defaultProps = {
  color: 'white',
  kind: 'normal',
  active: false,
  type: 'button',
};

export default Button;
