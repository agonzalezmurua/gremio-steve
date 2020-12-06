import NewJourneyForm from '@components/templates/journeys/JourneyForm';
import { JourneyFormObject } from '@components/templates/journeys/JourneyForm.formik';
import React, { useCallback } from 'react';

const NewJourneyPage: React.FC = () => {
  const handleSubmit = useCallback(async (values: JourneyFormObject) => {
    console.log(JSON.stringify(values, null, 2));
  }, []);
  return <NewJourneyForm onSubmit={handleSubmit} />;
};

export default NewJourneyPage;
