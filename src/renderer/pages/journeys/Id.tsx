import 'twin.macro';
import React from 'react';
import { useAsync } from 'react-use';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import JourneyTemplate from '_/components/templates/journeys';

import Api from '_/services/api';

const JourneyPage: React.FC<
  RouteComponentProps<{
    id: string;
  }>
> = (props) => {
  const {
    match: {
      params: { id },
    },
  } = props;
  const { value: journey = null, error } = useAsync(async () => {
    const response = await Api.Operations.getOneJourneyById({
      path: { id: id },
    });
    return response.data;
  }, [id]);

  if (error) {
    return <Redirect to="/not-found" />;
  }
  return (
    <main tw="h-full">
      <JourneyTemplate journey={journey} />
    </main>
  );
};

JourneyPage.displayName = `JourneyPage`;

export default JourneyPage;
