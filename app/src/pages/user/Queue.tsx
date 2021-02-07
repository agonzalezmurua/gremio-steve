import React from 'react';
import 'twin.macro';
import api from '@api';
import { useAsync } from 'react-use';
import { RouteComponentProps } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import QueueTemplate from '@components/templates/user-queue';

type RouteProps = {
  id: string;
};

const UserQueuePage: React.FC<RouteComponentProps<RouteProps>> = (props) => {
  const { value } = useAsync(async () => {
    const { data } = await api.user.queue(props.match.params.id);
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
