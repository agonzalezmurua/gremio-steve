import { defineMessages } from 'react-intl';

export const JourneyMessages = defineMessages({
  'generic.journey.statusOpen': {
    id: 'generic.journey.statusOpen',
    defaultMessage: 'Open',
    description: 'Journey is open for either applications or mods',
  },
  'generic.journey.statusSuspended': {
    id: 'generic.journey.statusSuspended',
    defaultMessage: 'Suspended',
    description: 'Journey is suspended for any kind of interactions',
  },
  'generic.journey.statusClosed': {
    id: 'generic.journey.statusClosed',
    defaultMessage: 'Closed',
    description: 'Journey is either finished or cancelled',
  },
});

export default JourneyMessages;
