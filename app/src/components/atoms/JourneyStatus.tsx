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
  props.status === 'pending' && tw`bg-green-500`,
  props.status === 'open' && tw`bg-green-500`,
  props.status === 'ready' && tw`bg-green-500`,
  props.status === 'alert' && tw`bg-green-500`,
  props.status === 'problem' && tw`bg-green-500`,
]);

export default JourneyStatus;
