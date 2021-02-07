import 'twin.macro';
import React from 'react';

import api from '_api';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { useAsync } from 'react-use';

import JourneyTemplate from '_components/templates/journeys';

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
