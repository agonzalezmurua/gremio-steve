import NewJourneyTemplate from '@components/templates/journeys/NewJourney';
import React from 'react';

const NewJourneyPage: React.FC = () => {
  return <NewJourneyTemplate onSave={() => console.log('saved!')} />;
};

export default NewJourneyPage;
