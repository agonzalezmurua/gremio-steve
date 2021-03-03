import tw, { styled } from 'twin.macro';

export const Container = styled.section(() => [
  tw`
  flex-grow
  flex
  flex-row
  overflow-auto
  light:(text-gray-900)
  dark:(text-gray-300)
  px-4
  py-2
  space-x-4
  `,
]);
export const SideBar = styled.section(() => [
  tw`
  flex-shrink
  space-y-4
  w-20
  md:(w-60)
  `,
]);
export const Content = styled.section(() => [
  tw`
  flex-grow
  bg-white
  border-2
  dark:(bg-gray-900 border-gray-700)
  rounded-lg
  shadow-xl
  overflow-y-auto
  `,
]);
