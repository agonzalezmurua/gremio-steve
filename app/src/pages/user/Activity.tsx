import 'twin.macro';
import React, { useContext } from 'react';
import api from '@api';
import AppContext from 'AppContext';
import { FormattedMessage } from 'react-intl';
import { useAsync } from 'react-use';

import UserActivityTemplate from '@components/templates/user/Activity';

const ActivityPage = () => {
  const { currentUser } = useContext(AppContext);
  const { loading, value } = useAsync(async () => {
    const { data } = await api.user.activity(currentUser.__id);
    return data;
  }, []);

  return (
    <main tw="p-4 space-y-4">
      <FormattedMessage
        id="page.user.activity"
        defaultMessage="Activity"
        description="Activity Page Header"
        tagName="h1"
      />
      <UserActivityTemplate activity={value} />
    </main>
  );
};

export default ActivityPage;
