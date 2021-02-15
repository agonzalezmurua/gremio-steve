import 'twin.macro';
// import React, { useContext } from 'react';
// import Operations from '@/services/api';
// import AppContext from '@/App.context';
// import { FormattedMessage } from 'react-intl';
// import { useAsync } from 'react-use';

// import UserActivityTemplate from '@/components/templates/user-activity';

const ActivityPage = () => {
  return null;
  // const { currentUser } = useContext(AppContext);
  // const { value: activity } = useAsync(async () => {
  //   const { data } = await Operations.user.activity(currentUser._id);
  //   return data;
  // }, []);

  // return (
  //   <main tw="p-4 space-y-4">
  //     <FormattedMessage
  //       id="pages.user.activity.titleHeader"
  //       defaultMessage="Activity"
  //       description="Activity Page Header"
  //       tagName="h1"
  //     />
  //     <UserActivityTemplate activity={activity} />
  //   </main>
  // );
};

export default ActivityPage;
