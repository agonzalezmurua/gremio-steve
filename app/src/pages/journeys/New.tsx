import 'twin.macro';
import React, { useCallback } from 'react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

import NewJourneyForm from '@components/templates/journeys/JourneyForm';
import { JourneyFormObject } from '@components/templates/journeys/JourneyForm.formik';

const NewJourneyPage: React.FC = () => {
  const handleSubmit = useCallback(async (values: JourneyFormObject) => {
    console.log(JSON.stringify(values, null, 2));
  }, []);
  return (
    <main tw="p-4">
      <OverlayScrollbarsComponent>
        <NewJourneyForm onSubmit={handleSubmit} />
      </OverlayScrollbarsComponent>
    </main>
  );
};

export default NewJourneyPage;
