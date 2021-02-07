import { UserMessages } from '@globals/constants/GenericMessages';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import tw, { styled } from 'twin.macro';

type Props = User['availability'];

const Circle = styled.section<{ enabled: boolean }>((props) => [
  tw`h-3 w-3 rounded-full`,
  (props.enabled && tw`bg-green-500`) || tw`bg-gray-200`,
]);

const Indicator: React.FC<{ enabled: boolean }> = (props) => (
  <section tw="flex flex-row items-center space-x-1">
    <Circle enabled={props.enabled} />
    <span>{props.children}</span>
  </section>
);

const UserAvailability: React.FC<Props> = (props) => {
  return (
    <section tw="flex flex-row space-x-4 text-xs text-gray-900 dark:(text-gray-300)">
      <Indicator enabled={props.mods}>
        <FormattedMessage {...UserMessages['generic.user.availability.mods']} />
      </Indicator>

      <Indicator enabled={props.guest_diffs}>
        <FormattedMessage
          {...UserMessages['generic.user.availability.guest_diffs']}
        />
      </Indicator>

      <Indicator enabled={props.playtesting}>
        <FormattedMessage
          {...UserMessages['generic.user.availability.playtesting']}
        />
      </Indicator>
    </section>
  );
};

export default UserAvailability;
