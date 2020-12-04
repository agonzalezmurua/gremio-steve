import tw, { styled } from 'twin.macro';

type JourneyBanner = {
  src?: string;
};

const JourneyBanner = styled.section<JourneyBanner>`
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  &:before {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    content: '';
    opacity: 0.65;
    ${tw`bg-gray-100`}
  }
  > * {
    position: relative;
  }
`;
export default JourneyBanner;
