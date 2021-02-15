import React from 'react';
import 'twin.macro';
import Api from '@/services/api';
import { useAsync } from 'react-use';
import { RouteComponentProps } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import QueueTemplate from '@/components/templates/user-queue';

type Props = {
  id: string;
};

const UserQueuePage: React.FC<RouteComponentProps<Props>> = () => {
  const { value } = useAsync(async () => {
    const { data } = await Api.Operations.getMyJourneys({
      query: { status: 'pending' },
    });
    return data;
  });

  return (
    <main tw="p-4 space-y-4">
      <FormattedMessage
        id="pages.user.queue.titleHeader"
        defaultMessage="Queue"
        description="Queue Page Header"
        tagName="h1"
      />
      <QueueTemplate journeys={value} />
    </main>
  );
};

export default UserQueuePage;
