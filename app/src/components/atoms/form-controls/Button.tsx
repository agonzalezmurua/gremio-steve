import { FocusRingFlatStyle } from '@globals/ElementFocusStyle';
import tw, { styled } from 'twin.macro';

type ButtonProps = React.HTMLProps<HTMLButtonElement> & {
  color?: 'red' | 'white' | 'blue';
  variant?: 'normal' | 'small' | 'self-contained';
  active?: boolean;
  fullWidth?: boolean;
};

const Button = styled.button<ButtonProps>(
  ({ color, variant: size, active, fullWidth: fullWidth }) => [
    tw`
      border
      rounded
      transition-colors
      duration-200
      ease-in-out
      outline-none
      font-bold
      text-gray-700
    `,
    fullWidth && tw`w-full`,
    FocusRingFlatStyle,
    size === 'normal' && tw`p-2 h-12`,
    size === 'small' && tw`p-1 text-sm`,
    color === 'white' &&
      tw`
      bg-white
      disabled:(text-gray-300 border-gray-300 bg-gray-100) 
      hover:(bg-gray-100)
      active:(bg-gray-200)
    `,
    color === 'white' && active && tw`bg-gray-200`,
    color === 'red' &&
      tw`
      text-white
      bg-red-500 hover:bg-red-700 active:bg-red-900
      border-red-700
    `,
    color === 'red' && active && tw`bg-red-900`,
    color === 'blue' &&
      tw`
      text-white
      bg-blue-500 hover:bg-blue-700 active:bg-blue-900
      border-blue-700
    `,
    color === 'blue' && active && tw`bg-blue-900`,
  ]
);

Button.defaultProps = {
  color: 'white',
  variant: 'normal',
  active: false,
  type: 'button',
};

export default Button;
