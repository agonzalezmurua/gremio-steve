import 'twin.macro';
import React, { useCallback } from 'react';

import JourneyForm from '_/components/templates/journey-form';
import { JourneyFormObject } from '_/components/templates/journey-form/validations';

const NewJourneyPage: React.FC = () => {
  const handleSubmit = useCallback(async (values: JourneyFormObject) => {
    console.log(JSON.stringify(values, null, 2));
  }, []);
  return <JourneyForm onSubmit={handleSubmit} />;
};

export default NewJourneyPage;
