import 'twin.macro';
import React from 'react';
import { useAsync } from 'react-use';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import JourneyTemplate from '_components/templates/journeys';

import api from '_api';

type RouteProps = {
  id: string;
};

const JourneyPage: React.FC<RouteComponentProps<RouteProps>> = (props) => {
  const {
    match: {
      params: { id },
    },
  } = props;
  const { value: journey = null, error } = useAsync(async () => {
    const response = await api.journeys.getById(id);
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
