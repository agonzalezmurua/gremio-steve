import 'twin.macro';
import React, { useCallback } from 'react';

import NewJourneyForm from '_/components/templates/journey-form';
import { JourneyFormObject } from '_/components/templates/journey-form/styles';

const NewJourneyPage: React.FC = () => {
  const handleSubmit = useCallback(async (values: JourneyFormObject) => {
    console.log(JSON.stringify(values, null, 2));
  }, []);
  return (
    <main tw="p-4">
      <NewJourneyForm onSubmit={handleSubmit} />
    </main>
  );
};

export default NewJourneyPage;
