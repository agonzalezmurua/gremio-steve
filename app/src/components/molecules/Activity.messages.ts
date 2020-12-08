import { defineMessages } from 'react-intl';

const Messages = defineMessages({
  comment_on_journey: {
    id: 'generic.activity_feed.comment_on_journey',
    defaultMessage: '{user} left a comment on {target}.',
    description:
      'Activity message indicating that someone left a comment on one of your journeys',
  },
  comment_on_comment: {
    id: 'generic.activity_feed.comment_on_comment',
    defaultMessage: '{user} replied to your comment.',
    description:
      'Activity message indicating that someone replied to your comment ',
  },
  comment_on_user: {
    id: 'generic.activity_feed.comment_on_user',
    defaultMessage: '{user} left a {comment} on your profile',
    description:
      'Activity message indicating that someone commented on your profile',
  },
  mention_on_comment: {
    id: 'generic.activity_feed.mention_on_comment',
    defaultMessage: '{user} mentioned you on a {comment}',
    description:
      'Activity message indicating that someone mentioned you on a comment',
  },
  mention_on_journey: {
    id: 'generic.activity_feed.mention_on_journey',
    defaultMessage: '{user} mentioned {journey} you a {comment}',
    description:
      'Activity message indicating that someone mentioned your Journey on a comment',
  },
  default: {
    id: 'generic.activity_feed.default',
    defaultMessage:
      'How did you even got this message?... Please contact the devs!',
    description:
      'Generic activity message if for some reason there is no valid combination',
  },
});

export default Messages;
