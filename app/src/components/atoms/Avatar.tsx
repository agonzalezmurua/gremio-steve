import tw, { styled } from 'twin.macro';

type AvatarProps = {
  size?: 'jumbo' | 'big' | 'medium' | 'small';
  isSkeleton?: boolean;
};

const Avatar = styled.img<AvatarProps>((props) => [
  tw`rounded-lg inline-block bg-gray-100 border`,
  props.size === 'small' && tw`w-8 h-8`,
  props.size === 'medium' && tw`w-12 h-12`,
  props.size === 'big' && tw`w-16 h-16`,
  props.size === 'jumbo' && tw`w-24 h-24`,
  props.isSkeleton && !props.src && tw`animate-pulse bg-gray-500`,
]);

Avatar.defaultProps = {
  size: 'medium',
};

export default Avatar;
