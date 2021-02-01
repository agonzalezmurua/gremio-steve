import 'twin.macro';
import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { JourneyMessages } from '@globals/constants/GenericMessages';

const JourneyStatusBadge: React.FC<{ status: Journey['status'] }> = (props) => {
  const statusMessage = useMemo(() => {
    switch (props.status) {
      case 'closed':
        return JourneyMessages['generic.journey.statusClosed'];
      case 'suspended':
        return JourneyMessages['generic.journey.statusSuspended'];
      default:
      case 'open':
        return JourneyMessages['generic.journey.statusOpen'];
    }
  }, [props.status]);
  return (
    <section tw="flex-none text-sm border rounded-full text-center p-2 bg-white font-bold dark:(text-black)">
      <FormattedMessage {...statusMessage} />
    </section>
  );
};

export default JourneyStatusBadge;
