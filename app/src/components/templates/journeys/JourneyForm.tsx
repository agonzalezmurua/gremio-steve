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
  JourneyFormObject,
} from './JourneyForm.formik';
import BpmInput from '@components/atoms/form-controls/BpmInput';

type JourneyFormProps = {
  onSubmit: (journey: JourneyFormObject) => Promise<void>;
};

const NewJourneyForm: React.FC<FormikProps<JourneyFormObject>> = ({
  handleSubmit,
  handleChange,
  values,
  errors,
}) => {
  return (
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
            error={errors.title}
          />
        </Label>

        <Label text="Artist" htmlFor="artist">
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
          <Label text="Duration" htmlFor="duration" tw="w-1/4">
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
          <Label text="Genre" htmlFor="genre" tw="w-1/4">
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
          <Label text="Banner" htmlFor="banner" tw="w-1/2">
            <FileUpload
              id="banner"
              name="banner"
              accept="image/jpeg, image/jpg"
              error={errors.banner}
            />
          </Label>
          <Label text="Thumbnail" htmlFor="thumbnail" tw="w-1/2">
            <FileUpload
              id="thumbnail"
              name="thumbnail"
              accept="image/jpeg, image/jpg"
              error={errors.thumbnail}
            />
          </Label>
        </section>

        <Label text="Description" htmlFor="description">
          <section tw="h-72">
            <MarkdownEditor
              id="description"
              name="description"
              value={values.description}
              error={errors.description}
              onChange={handleChange}
            />
          </section>
        </Label>
      </fieldset>

      <fieldset tw="space-y-4">
        <legend>
          <FormattedMessage
            defaultMessage="Difficulties"
            description="Difficulties header"
          />
        </legend>
        <GameMapFormList />
      </fieldset>

      <fieldset tw="space-y-4">
        <legend>Extras</legend>
        <Label text="Private" htmlFor="private">
          <input name="private" type="checkbox" />
        </Label>
      </fieldset>

      <Button color="blue" type="submit" onClick={() => handleSubmit()}>
        <FormattedMessage
          defaultMessage="Save"
          description="Submit new journey form"
        />
      </Button>
    </form>
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