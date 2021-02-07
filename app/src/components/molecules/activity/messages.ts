import { defineMessages } from 'react-intl';

const Messages = defineMessages({
  comment_on_journey: {
    id: 'components.molecules.activity.comment_on_journey',
    defaultMessage: '{user} left a {comment} on {journey}.',
    description:
      'Activity message indicating that someone left a comment on one of your journeys',
  },
  comment_on_comment: {
    id: 'components.molecules.activity.comment_on_comment',
    defaultMessage: '{user} replied to your {comment} on {journey}.',
    description:
      'Activity message indicating that someone replied to your comment ',
  },
  comment_on_user: {
    id: 'components.molecules.activity.comment_on_user',
    defaultMessage: '{user} left a {comment} on your profile',
    description:
      'Activity message indicating that someone commented on your profile',
  },
  mention_on_comment: {
    id: 'components.molecules.activity.mention_on_comment',
    defaultMessage: '{user} mentioned you on a {comment}',
    description:
      'Activity message indicating that someone mentioned you on a comment',
  },
  mention_on_journey: {
    id: 'components.molecules.activity.mention_on_journey',
    defaultMessage: '{user} mentioned {journey} on a {comment}',
    description:
      'Activity message indicating that someone mentioned your Journey on a comment',
  },
  create_a_journey: {
    id: 'components.molecules.activity.create_a_journey',
    defaultMessage: '{user} created a new journey {journey}',
    description:
      'Activity message indicating that someone you follow created a new Journey',
  },
  edit_a_journey: {
    id: 'components.molecules.activity.edit_a_journey',
    defaultMessage: '{user} edited {journey}',
    description:
      'Activity message indicating that someone you edited a Journey you follow',
  },
  default: {
    id: 'components.molecules.activity.default',
    defaultMessage:
      'How did you even got this message?... Please contact the devs!',
    description:
      'Generic activity message if for some reason there is no valid combination',
  },
});

export default Messages;
