import 'twin.macro';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { FormikProps, withFormik } from 'formik';

import Input from '_/components/atoms/input';
import Label from '_/components/atoms/label';
import FileInput from '_/components/molecules/file-input';
import Button from '_/components/atoms/button';
import BeatmapsetFormList from '_/components/organisms/beatmapset-form-list';
import BpmInput from '_/components/molecules/bpm-input';

import {
  initialValues,
  validationSchema,
  JourneyFormObject,
} from './validations';

type JourneyFormProps = {
  onSubmit: (journey: JourneyFormObject) => Promise<any>;
};

const NewJourneyForm: React.FC<FormikProps<JourneyFormObject>> = ({
  handleSubmit,
  handleChange,
  values,
  errors,
}) => {
  return (
    <main tw="p-4">
      <form onSubmit={handleSubmit} tw="space-y-8">
        <fieldset tw="space-y-4">
          <FormattedMessage
            id="components.templates.journeysForm.essentialsLegend"
            description="Journey template, title for new Journey form"
            defaultMessage="Essentials"
            tagName="legend"
          />

          <Label text="Title" htmlFor="title" required>
            <Input
              id="title"
              name="title"
              type="text"
              onChange={handleChange}
              value={values.title}
              error={errors.title}
              autoFocus
            />
          </Label>

          <Label text="Artist" htmlFor="artist" required>
            <Input
              id="artist"
              name="artist"
              type="text"
              onChange={handleChange}
              value={values.artist}
              error={errors.artist}
            />
          </Label>

          <section tw="flex flex-row space-x-2 ">
            <Label text="BPM" htmlFor="metadata.bpm" tw="w-1/2">
              <BpmInput
                id="metadata.bpm"
                name="metadata.bpm"
                value={values.metadata?.bpm}
                onChange={handleChange}
              />
            </Label>
            <Label text="Duration" htmlFor="duration" tw="w-1/4" required>
              <Input
                id="duration"
                name="metadata.duration"
                type="number"
                min="1"
                max="120"
                value={values.metadata.duration}
                error={errors.metadata?.duration}
                onChange={handleChange}
              />
            </Label>
            <Label text="Genre" htmlFor="genre" tw="w-1/4" required>
              <Input
                id="genre"
                name="metadata.genre"
                type="text"
                value={values.metadata.genre}
                error={errors.metadata?.genre}
                onChange={handleChange}
              />
            </Label>
          </section>

          <section tw="flex space-x-2">
            <Label text="Banner" htmlFor="banner" tw="w-1/2" required>
              <FileInput
                id="banner"
                name="banner_url"
                accept="image/jpeg, image/jpg"
                error={errors.banner_url}
              />
            </Label>
            <Label text="Thumbnail" htmlFor="thumbnail" tw="w-1/2" required>
              <FileInput
                id="thumbnail"
                name="thumbnail_url"
                accept="image/jpeg, image/jpg"
                error={errors.thumbnail_url}
              />
            </Label>
          </section>
        </fieldset>

        <fieldset tw="space-y-4">
          <FormattedMessage
            id="components.templates.journeysForm.difficultiesLegend"
            defaultMessage="Difficulties"
            description="Difficulties legend"
            tagName="legend"
          />
          <BeatmapsetFormList />
        </fieldset>

        <Button
          fullWidth
          color="blue"
          type="submit"
          onClick={() => handleSubmit()}
        >
          <FormattedMessage
            id="components.templates.journeysForm.saveButton"
            defaultMessage="Save"
            description="Submit new journey form"
          />
        </Button>
      </form>
    </main>
  );
};

export default withFormik<JourneyFormProps, JourneyFormObject>({
  validationSchema: validationSchema,
  handleSubmit: async (values, { setSubmitting, props }) => {
    setSubmitting(true);
    await props.onSubmit(values);
    setSubmitting(false);
  },
  validateOnBlur: false,
  validateOnChange: false,
  mapPropsToValues: () => {
    return initialValues;
  },
})(NewJourneyForm);
