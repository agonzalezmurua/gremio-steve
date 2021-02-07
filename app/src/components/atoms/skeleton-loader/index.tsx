import tw, { styled } from 'twin.macro';

const SkeletonLoader = styled.section(() => [
  tw`rounded animate-pulse bg-gray-500`,
]);

export default SkeletonLoader;
