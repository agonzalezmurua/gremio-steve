import React from 'react';
import tw, { styled } from 'twin.macro';

type AvatarProps = {
  src?: string;
  size?: 'jumbo' | 'big' | 'medium' | 'small';
  isSkeleton?: boolean;
};

const AvatarComponent: React.FC<AvatarProps> = ({
  src,
  isSkeleton,
  ...props
}: AvatarProps) => {
  return (
    <section {...props}>
      <img
        src={src}
        css={[
          tw`w-full h-full`,
          isSkeleton && !src && tw`animate-pulse bg-gray-500`,
        ]}
      />
    </section>
  );
};

const Avatar = styled(AvatarComponent)<AvatarProps>((props) => [
  tw`
  rounded-lg inline-block bg-white border overflow-hidden
  dark:border-gray-300
  `,
  props.size === 'small' && tw`w-8 h-8`,
  props.size === 'medium' && tw`w-12 h-12`,
  props.size === 'big' && tw`w-24 h-24`,
  props.size === 'jumbo' && tw`w-40 h-40`,
]);

Avatar.defaultProps = {
  size: 'medium',
};

export default Avatar;
