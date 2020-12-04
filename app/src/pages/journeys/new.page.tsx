import NewJourneyTemplate from '@components/templates/journeys/NewJourneyForm';
import React, { useCallback } from 'react';

const NewJourneyPage: React.FC = () => {
  const handleSubmit = useCallback((values) => {
    console.log(JSON.stringify(values, null, 2));
  }, []);
  return <NewJourneyTemplate onSave={handleSubmit} />;
};

export default NewJourneyPage;
