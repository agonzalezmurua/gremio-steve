import React from 'react';
import 'twin.macro';

import Input from '@components/atoms/form-controls/Input';
import Label from '@components/atoms/form-controls/Label';
import Editor from '@components/atoms/form-controls/Editor';
import FormWithProgress from '@components/atoms/form-controls/FormWithProgress';
import MapModeSelect from '@components/molecules/MapModeSelect';

const NewJourneyPage: React.FC = () => {
  return (
    <main tw="p-4">
      <FormWithProgress
        steps={['Basic information', 'Maps', 'Finishing touches']}
      >
        <section>
          <fieldset tw="space-y-4">
            <legend>Maps</legend>

            <Label text="Mode" htmlFor="diff">
              <MapModeSelect
                onSelect={(value) => {
                  console.log(value);
                }}
              />
            </Label>
          </fieldset>
        </section>
        <section>
          <fieldset tw="space-y-4">
            <legend>Basic Information</legend>

            <Label text="Title" htmlFor="title">
              <Input id="title" name="title" type="text" required />
            </Label>

            <Label text="Artist" htmlFor="artist">
              <Input id="artist" name="artist" type="text" required />
            </Label>

            <Label text="Description" htmlFor="description">
              <section tw="h-72">
                <Editor />
              </section>
            </Label>
          </fieldset>
        </section>
      </FormWithProgress>
    </main>
  );
};

export default NewJourneyPage;
