import { styled } from 'twin.macro';

type JourneyBanner = {
  src?: string;
};

const JourneyBanner = styled.section<JourneyBanner>`
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;
export default JourneyBanner;
