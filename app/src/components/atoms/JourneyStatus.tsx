import tw, { styled } from 'twin.macro';

type JourneyStatusProps = {
  status: Journey['status'];
};

const JourneyStatus = styled.section<JourneyStatusProps>((props) => [
  `
    &:before {
      content: "${props.status}";
    }
  `,
  tw`flex w-full h-full text-white items-center justify-center uppercase text-sm font-bold`,
  props.status === 'open' && tw`bg-green-500`,
]);

export default JourneyStatus;
