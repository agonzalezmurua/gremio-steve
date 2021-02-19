import tw from 'twin.macro';
import { Props } from './index';

export const DefaultStyles = ({ color, active }: Props) => [
  tw`
    outline-none
    rounded
    border
    disabled:(text-gray-300 cursor-not-allowed)
    light:(text-black)
    dark:(text-white)
  `,
  color === 'default' &&
    tw`
      bg-white
      light:(border-gray-100)
      light:active:(bg-gray-200) dark:active:(bg-gray-900)
      light:hover:(bg-gray-100) dark:hover:(bg-gray-600)
      light:disabled:(bg-gray-100) 

      dark:(bg-gray-800 border-gray-500)
      dark:active:(bg-gray-900)
      dark:hover:(bg-gray-500)
      dark:disabled:(bg-gray-900 border-gray-800)
    `,
  color === 'red' &&
    tw`
      light:(bg-red-500 border-red-700)
      light:active:bg-red-900
      light:hover:bg-red-700
      light:disabled:(bg-red-700)

      dark:(bg-red-700 border-red-500)
      dark:active:(bg-red-800)
      dark:hover:(bg-red-500)
      dark:disabled:(bg-red-900 border-red-800)
    `,
  color === 'blue' &&
    tw`
      light:(bg-blue-500 border-blue-600)
      light:active:(bg-blue-900)
      light:hover:(bg-blue-600)
      light:disabled:(bg-blue-600)

      dark:(bg-blue-700 border-blue-500)
      dark:active:(bg-blue-800)
      dark:hover:(bg-blue-500)
      dark:disabled:(bg-blue-900 border-blue-800)
    `,
  active && color === 'default' && tw`bg-gray-200`,
  active && color === 'red' && tw`bg-red-900`,
  active && color === 'blue' && tw`bg-blue-900`,
];

export const LinkStyles = ({ color }: Props) => [
  tw`rounded`,
  color === 'default' &&
    tw`
    dark:(text-white border border-transparent)
    dark:hover:(border-white)
  `,
  color === 'blue' &&
    tw`
    dark:(text-blue-500 border border-transparent)
    dark:hover:(border-blue-500)
  `,
  color === 'red' &&
    tw`
    dark:(text-red-500 border border-transparent)
    dark:hover:(border-red-500)
  `,
];

export const IconStyles = ({ color }: Props) => [
  tw`rounded-full`,
  color === 'default' &&
    tw`
      light:text-black
      light:hover:(bg-gray-200)

      dark:text-white
      dark:hover:(bg-gray-700)
    `,
  color === 'blue' &&
    tw`
      text-blue-500

      light:hover:(bg-blue-100)
      dark:hover:(bg-blue-900)
    `,
  color === 'red' &&
    tw`
      text-red-500

      light:hover:(bg-red-100)
      dark:hover:(bg-red-900)
    `,
];
