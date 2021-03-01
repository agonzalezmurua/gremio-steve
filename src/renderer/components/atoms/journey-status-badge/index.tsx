import tw, { styled } from 'twin.macro';
import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import JourneyMessages from '_/constants/messages/journey';
import { Definitions } from '_/services/api';

const JourneyStatusBadge: React.FC<{
  status: Definitions['Journey']['status'];
}> = (props) => {
  const statusMessage = useMemo(() => {
    switch (props.status) {
      case 'closed':
        return JourneyMessages['generic.journey.statusClosed'];
      case 'closed':
        return JourneyMessages['generic.journey.statusSuspended'];
      case 'pending':
        return JourneyMessages['generic.journey.statusPending'];
      default:
      case 'open':
        return JourneyMessages['generic.journey.statusOpen'];
    }
  }, [props.status]);
  return (
    <section {...props}>
      <FormattedMessage {...statusMessage} />
    </section>
  );
};

export default styled(JourneyStatusBadge)((props) => [
  tw`flex-none text-sm border rounded-full text-center p-2 bg-white font-bold dark:(text-black)`,
  props.status === 'pending' &&
    tw`
      light:(bg-orange-100 text-orange-900 border-orange-300)
      dark:(bg-orange-700 text-orange-100 border-orange-900)
    `,
  props.status === 'open' &&
    tw`
      light:(bg-lightBlue-100 text-lightBlue-900 border-lightBlue-300)
      dark:(bg-lightBlue-700 text-lightBlue-100 border-lightBlue-900)
    `,
  props.status === 'ready' &&
    tw`
      light:(bg-green-100 text-green-900 border-green-300)
      dark:(bg-green-700 text-green-100 border-green-900)
    `,
  props.status === 'alert' &&
    tw`
      light:(bg-yellow-100 text-yellow-900 border-yellow-300)
      dark:(bg-yellow-700 text-yellow-100 border-yellow-900)
    `,
  props.status === 'problem' &&
    tw`
      light:(bg-red-100 text-red-900 border-red-300)
      dark:(bg-red-700 text-red-100 border-red-900)
    `,
]);
