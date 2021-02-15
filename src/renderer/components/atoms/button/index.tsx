import { FocusRingFlatStyle } from '@/globals/styles/focus';
import tw, { styled } from 'twin.macro';

type ButtonProps = React.HTMLProps<HTMLButtonElement> & {
  color?: 'red' | 'default' | 'blue';
  magnitude?: 'normal' | 'small' | 'self-contained';
  active?: boolean;
  fullWidth?: boolean;
};

const Button = styled.button<ButtonProps>(
  ({ color, magnitude: size, active, fullWidth: fullWidth }) => [
    tw`
      border
      rounded
      transition-colors
      duration-200
      ease-in-out
      outline-none
      font-bold
      text-black
      ring-offset-1
    `,
    fullWidth && tw`w-full`,
    FocusRingFlatStyle,
    size === 'normal' && tw`p-2 px-4`,
    size === 'small' && tw`p-1 px-2 text-sm`,
    color === 'default' &&
      tw`
      bg-white dark:bg-gray-800
      border-gray-100 dark:border-gray-500
      text-black dark:text-white
      disabled:(text-gray-300 border-gray-300 bg-gray-100) 
      light:hover:(bg-gray-100) dark:hover:(bg-gray-600)
      light:active:(bg-gray-200) dark:active:(bg-gray-900)
    `,
    color === 'default' && active && tw`bg-gray-200`,
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
      bg-blue-500
      light:border-blue-700 dark:border-blue-300
      hover:(bg-blue-700)
      active:(bg-blue-900)
    `,
    color === 'blue' && active && tw`bg-blue-900`,
  ]
);

Button.defaultProps = {
  color: 'default',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  magnitude: 'normal',
  active: false,
  type: 'button',
};

export default Button;
