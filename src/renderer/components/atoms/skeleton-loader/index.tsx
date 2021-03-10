import tw, { styled } from 'twin.macro';

const SkeletonLoader = styled.section(() => [
  tw`rounded animate-pulse light:bg-gray-500 dark:bg-gray-700`,
]);

export default SkeletonLoader;
