import 'twin.macro';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { FormikProps, withFormik } from 'formik';

import Input from '@components/atoms/form-controls/Input';
import Label from '@components/atoms/form-controls/Label';
import MarkdownEditor from '@components/atoms/form-controls/MarkdownEditor';
import FileUpload from '@components/atoms/form-controls/FileUpload';
import Button from '@components/atoms/form-controls/Button';
import { GameMapFormList } from '@components/organisms/GameMapFormList';
import {
  initialValues,
  validationSchema,
  JourneyForm,
} from './NewJourney.form';

const NewJourneyTemplate: React.FC<FormikProps<JourneyForm>> = ({
  handleSubmit,
  handleChange,
  values,
}) => {
  return (
    <main tw="p-4">
      <form onSubmit={handleSubmit} tw="space-y-8">
        <fieldset tw="space-y-4">
          <legend>Essentials</legend>

          <Label text="Title" htmlFor="title">
            <Input
              id="title"
              name="title"
              type="text"
              onChange={handleChange}
              value={values.title}
            />
          </Label>

          <Label text="Artist" htmlFor="artist">
            <Input
              id="artist"
              name="artist"
              type="text"
              onChange={handleChange}
              value={values.artist}
            />
          </Label>

          <section tw="flex flex-row space-x-2 ">
            <Label text="BPM" htmlFor="bpm" tw="w-1/6">
              <Input
                id="bpm"
                name="metada.bpm"
                type="number"
                min="1"
                max="500"
                value={String(values.metadata.bpm)}
                onChange={handleChange}
              />
            </Label>
            <Label text="Duration" htmlFor="duration" tw="w-1/6">
              <Input
                id="duration"
                name="metadata.duration"
                type="number"
                min="1"
                max="120"
                value={values.metadata.duration}
                onChange={handleChange}
              />
            </Label>
            <Label text="Genre" htmlFor="genre" tw="w-2/3">
              <Input
                id="genre"
                name="metadata.genre"
                type="text"
                value={values.metadata.genre}
                onChange={handleChange}
              />
            </Label>
          </section>

          <section tw="flex space-x-2">
            <Label text="Banner" htmlFor="banner" tw="w-1/2">
              <FileUpload
                id="banner"
                name="banner"
                accept="image/jpeg, image/jpg"
              />
            </Label>
            <Label text="Thumbnail" htmlFor="thumbnail" tw="w-1/2">
              <FileUpload
                id="thumbnail"
                name="thumbnail"
                accept="image/jpeg, image/jpg"
              />
            </Label>
          </section>

          <Label text="Description" htmlFor="description">
            <section tw="h-72">
              <MarkdownEditor
                id="description"
                name="description"
                value={values.description}
                onChange={handleChange}
              />
            </section>
          </Label>
        </fieldset>

        <fieldset tw="space-y-4">
          <legend>Maps</legend>
          <GameMapFormList />
        </fieldset>

        <fieldset tw="space-y-4">
          <legend>Extras</legend>
          <Label text="Private" htmlFor="private">
            <input name="private" type="checkbox" />
          </Label>
        </fieldset>

        <Button color="blue" type="submit">
          <FormattedMessage
            defaultMessage="Save"
            description="Submit new journey form"
          />
        </Button>
      </form>
    </main>
  );
};

export default withFormik<any, JourneyForm>({
  validationSchema: validationSchema,
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      console.log(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },
  mapPropsToValues: () => {
    return initialValues;
  },
})(NewJourneyTemplate);
