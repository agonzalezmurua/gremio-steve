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
