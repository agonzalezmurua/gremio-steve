import tw, { styled } from 'twin.macro';

type JourneyBanner = {
  src?: string;
};

const JourneyBanner = styled.section<JourneyBanner>((props) => [
  props.src &&
    `
      background-image: url("${props.src}");
      backdrop-filter: blur(5px) brigthness(70%);
    `,
  tw`bg-fixed object-cover`,
]);

export default JourneyBanner;
