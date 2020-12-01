import React from 'react';
import 'twin.macro';

import Input from '@components/atoms/form-controls/Input';
import Label from '@components/atoms/form-controls/Label';
import Editor from '@components/atoms/form-controls/Editor';
import Progress from '@components/atoms/form-controls/Progress';
import GameMapModeSelect from '@components/molecules/GameMapModeSelect';
import GameMapDifficultySelect from '@components/molecules/GameMapDifficultySelect';

const NewJourneyPage: React.FC = () => {
  return (
    <main tw="p-4">
      <Progress steps={['Basic information', 'Maps', 'Finishing touches']}>
        <section>
          <fieldset tw="space-y-4">
            <legend>Maps</legend>

            <Label text="Name" htmlFor="difficulty">
              <Input id="title" name="title" type="text" required />
            </Label>

            <Label text="Mode" htmlFor="mode">
              <GameMapModeSelect />
            </Label>

            <Label text="Difficulty" htmlFor="difficulty">
              <GameMapDifficultySelect mode="ctb" />
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
      </Progress>
    </main>
  );
};

export default NewJourneyPage;
