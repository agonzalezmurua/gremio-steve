import { defineMessages } from 'react-intl';

export const UserMessages = defineMessages({
  'generic.user.messageAction': {
    id: 'generic.user.messageAction',
    defaultMessage: 'Message',
    description: 'Generic action that opens a message dialog with certain user',
  },
  'generic.user.followAction': {
    id: 'generic.user.followAction',
    defaultMessage: 'Follow',
    description: 'Generic action that allows to follow a certain user',
  },
  'generic.user.availability.playtesting': {
    id: 'generic.user.availability.playtesting',
    defaultMessage: 'Playtesting',
    description: "User is/isn't available for playtesting maps",
  },
  'generic.user.availability.mods': {
    id: 'generic.user.availability.mods',
    defaultMessage: 'Mods',
    description: "User is/isn't available for playtesting maps",
  },
  'generic.user.availability.guest_diffs': {
    id: 'generic.user.availability.guest_diffs',
    defaultMessage: 'GD',
    description: "User is/isn't available for guest diffs maps",
  },
  'generic.user.availability.collab': {
    id: 'generic.user.availability.collab',
    defaultMessage: 'Collab',
    description: "User is/isn't available for collabs",
  },
});
