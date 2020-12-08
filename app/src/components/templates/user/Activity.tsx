import 'twin.macro';
import React from 'react';
import Skeleton from '@components/atoms/Skeleton';
import ActivityFeed from '@components/organisms/ActivityFeed';

type UserActivityTemplateProps = {
  activity?: UserActivity[];
};

const UserActivityTemplate: React.FC<UserActivityTemplateProps> = (props) => {
  console.log(props.activity || 'loading');
  return (
    <section tw="space-y-4">
      {(props.activity && <ActivityFeed activity={props.activity} />) || (
        <>
          <Skeleton tw="h-40 w-full" />
          <Skeleton tw="h-40 w-full" />
          <Skeleton tw="h-40 w-full" />
        </>
      )}
    </section>
  );
};

export default UserActivityTemplate;
