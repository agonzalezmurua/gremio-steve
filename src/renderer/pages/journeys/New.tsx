import 'twin.macro';
import React, { useCallback } from 'react';

import JourneyForm from '_/components/templates/journey-form';
import { JourneyFormObject } from '_/components/templates/journey-form/validations';
import Api from '_/services/api';

const NewJourneyPage: React.FC = () => {
  const handleSubmit = useCallback(
    async (values: JourneyFormObject) =>
      Api.Client.operations.createOneJourney({ body: { journey: values } }),
    []
  );
  return <JourneyForm onSubmit={handleSubmit} />;
};

export default NewJourneyPage;
