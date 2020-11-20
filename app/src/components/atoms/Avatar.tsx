import tw, { styled } from "twin.macro";

type AvatarProps = {
  size?: "jumbo" | "big" | "medium" | "small";
};

const Avatar = styled.img<AvatarProps>`
  ${tw`rounded inline-block bg-white`}

  ${({size}) => {
    switch (size) {
      case "small":
        return tw`w-8 h-8`;
      case "medium":
        return tw`w-12 h-12`
      case "big":
        return tw`w-16 h-16`
      case "jumbo":
        return tw`w-24 h-24`
    }
  }}
`;

Avatar.defaultProps = {
  size: "medium",
};

export default Avatar;
