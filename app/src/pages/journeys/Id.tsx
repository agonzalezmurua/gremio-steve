import api from '@api';
import React from 'react';
import { generatePath } from 'react-router';
import { Link, Redirect, RouteComponentProps } from 'react-router-dom';
import { useAsync } from 'react-use';
import ReactMarkdown from 'react-markdown';
import 'twin.macro';
import JourneyTemplate from '@components/templates/journeys/Journey';

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
  return <JourneyTemplate journey={journey} />;
};

JourneyPage.displayName = `JourneyPage`;

export default JourneyPage;
