import React from 'react';
import { FormattedMessage } from 'react-intl';

const ActivityPage = () => {
  return (
    <div>
      <FormattedMessage
        defaultMessage="Activity"
        description="Activity Page Header"
        tagName="h1"
      />
    </div>
  );
};

export default ActivityPage;
