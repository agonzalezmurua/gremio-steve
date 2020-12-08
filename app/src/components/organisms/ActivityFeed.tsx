import 'twin.macro';
import Activity from '@components/molecules/Activity';
import React from 'react';
import Button from '@components/atoms/form-controls/Button';
import { FormattedMessage } from 'react-intl';

type ActivityFeedProps = {
  activity: UserActivity[];
};

const ActivityFeed: React.FC<ActivityFeedProps> = (props) => {
  return (
    <>
      <ul tw="space-y-4 divide-y">
        {props.activity.map((entry) => (
          <li key={entry.__id}>
            <Activity entry={entry} />
          </li>
        ))}
      </ul>
      <Button fullWidth>
        <FormattedMessage
          id="components.organisms.activityFeed.loadMoreButton"
          defaultMessage="Load more"
          description="Activity feed, load more activities"
        />
      </Button>
    </>
  );
};

export default ActivityFeed;
