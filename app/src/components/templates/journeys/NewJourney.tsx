import React from 'react';
import 'twin.macro';

import Input from '@components/atoms/form-controls/Input';
import Label from '@components/atoms/form-controls/Label';
import MarkdownEditor from '@components/atoms/form-controls/MarkdownEditor';
import Progress from '@components/atoms/form-controls/Progress';
import { GameMapFormList } from '../../organisms/GameMapFormList';

type NewJourneyTemplateProps = {
  onSave: () => void;
};

const NewJourneyTemplate: React.FC<NewJourneyTemplateProps> = () => {
  return (
    <main tw="p-4">
      <Progress steps={['Basic information', 'Maps', 'Finishing touches']}>
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
                <MarkdownEditor />
              </section>
            </Label>
          </fieldset>
        </section>

        <section>
          <fieldset tw="space-y-4">
            <legend>Maps</legend>
            <GameMapFormList />
          </fieldset>
        </section>

        <section>
          <fieldset tw="space-y-4">
            <legend>Finishing touches</legend>
            <Label text="Private" htmlFor="private">
              <input name="private" type="checkbox" />
            </Label>
          </fieldset>
        </section>
      </Progress>
    </main>
  );
};

export default NewJourneyTemplate;
