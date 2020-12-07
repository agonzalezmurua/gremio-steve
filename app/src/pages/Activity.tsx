import React from 'react';
import { FormattedMessage } from 'react-intl';

const ActivityPage = () => {
  return (
    <main tw="p-4">
      <FormattedMessage
        defaultMessage="Activity"
        description="Activity Page Header"
        tagName="h1"
      />
    </main>
  );
};

export default ActivityPage;
