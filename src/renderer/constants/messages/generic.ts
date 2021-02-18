/**
 * This file's function is to define messages that do not have or require
 * a context to make sense
 */

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

export const GamemodeMessages = defineMessages({
  'generic.gamemodes.std': {
    id: 'generic.gamemodes.std',
    defaultMessage: 'Standard',
    description: 'Gamemode name for Standard',
  },
  'generic.gamemodes.mania': {
    id: 'generic.gamemodes.mania',
    defaultMessage: 'Mania',
    description: 'Gamemode name for Mania',
  },
  'generic.gamemodes.taiko': {
    id: 'generic.gamemodes.taiko',
    defaultMessage: 'Taiko',
    description: 'Gamemode name for Taiko',
  },
  'generic.gamemodes.ctb': {
    id: 'generic.gamemodes.ctb',
    defaultMessage: 'Catch the beat',
    description: 'Gamemode name for Catch the beat',
  },
});
