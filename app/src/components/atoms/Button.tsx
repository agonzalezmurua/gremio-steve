import tw, { styled } from 'twin.macro';

type ButtonProps = {
  color?: 'red' | 'white' | 'blue';
};

const Button = styled.button<ButtonProps>(({ color }) => [
  tw`border rounded p-2 pl-4 pr-4 transition-colors duration-200 ease-in-out`,
  color === 'white' && tw`bg-white hover:bg-gray-100 active:bg-gray-300`,
  color === 'red' &&
    tw`text-white bg-red-600 hover:bg-red-700 active:bg-red-900`,
  color === 'blue' &&
    tw`text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-900`,
]);

Button.defaultProps = {
  color: 'white',
};

export default Button;
