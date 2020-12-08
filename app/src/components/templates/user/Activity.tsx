import Skeleton from '@components/atoms/Skeleton';
import ActivityFeed from '@components/organisms/ActivityFeed';
import React from 'react';

type UserActivityTemplateProps = {
  activity?: UserActivity[];
};

const UserActivityTemplate: React.FC<UserActivityTemplateProps> = (props) => {
  return (
    <section>
      <ul>
        {(props.activity && <ActivityFeed activity={props.activity} />) || (
          <Skeleton tw="h-16 w-full" />
        )}
      </ul>
    </section>
  );
};

export default UserActivityTemplate;
