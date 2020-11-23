import tw, { styled } from 'twin.macro';

type LoaderProps = {
  show?: boolean;
};

const FullScreenLoader = styled.section<LoaderProps>((props) => [
  tw`absolute h-full w-full bg-gray-200 flex justify-center items-center animate-pulse`,
  props.show === false && tw`animate-fadeout`,
]);

export default FullScreenLoader;
