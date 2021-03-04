import React from 'react';
import 'twin.macro';
import Api from '_/services/api';
import { useAsync } from 'react-use';
import { RouteComponentProps } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import QueueTemplate from '_/components/templates/user-queue';

type Props = {
  id: string;
};

const UserQueuePage: React.FC<RouteComponentProps<Props>> = () => {
  const { value: journeys } = useAsync(async () => {
    const { data } = await Api.Client.operations().getMyQueue();
    return data;
  }, []);

  return (
    <main tw="p-4 space-y-4">
      <FormattedMessage
        id="pages.user.queue.titleHeader"
        defaultMessage="Queue"
        description="Queue Page Header"
        tagName="h1"
      />
      <QueueTemplate journeys={journeys} />
    </main>
  );
};

export default UserQueuePage;
