import 'twin.macro';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button from '_components/atoms/button';
import Activity from '_components/molecules/activity';

type ActivityFeedProps = {
  activity: UserActivity[];
};

const ActivityFeed: React.FC<ActivityFeedProps> = (props) => {
  return (
    <>
      <ul tw="space-y-4 divide-y">
        {props.activity.map((entry) => (
          <li key={entry._id}>
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