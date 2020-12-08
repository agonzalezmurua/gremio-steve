import 'twin.macro';
import Activity from '@components/molecules/Activity';
import React from 'react';

type ActivityFeedProps = {
  activity: UserActivity[];
};

const ActivityFeed: React.FC<ActivityFeedProps> = (props) => {
  return (
    <ul tw="space-y-4 divide-y">
      {props.activity.map((entry) => (
        <li key={entry.__id}>
          <Activity entry={entry} />
        </li>
      ))}
    </ul>
  );
};

export default ActivityFeed;
