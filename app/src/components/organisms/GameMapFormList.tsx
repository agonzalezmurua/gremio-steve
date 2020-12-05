import React from 'react';
import { FormattedMessage } from 'react-intl';
import { FieldArray, useFormikContext } from 'formik';

import Plus from '@assets/icons/outline/plus.svg';
import Button from '@components/atoms/form-controls/Button';
import GameMapFormEntry from '@components/molecules/GameMapFormEntry';
import { JourneyFormObject } from '@components/templates/journeys/JourneyForm.formik';

import Styles from './GameMapFormList.styles';

export const GameMapFormList = () => {
  const { values } = useFormikContext<JourneyFormObject>();

  return (
    <FieldArray
      name="maps"
      render={(helpers) => (
        <section css={[Styles.Wrapper]}>
          <Button
            name="add"
            onClick={() =>
              helpers.push({ name: '', mode: 'std', difficulty: 'normal' })
            }
          >
            <Plus />
            <span>
              <FormattedMessage
                defaultMessage="Add new"
                description="Add a new Beatmap difficulty entry"
              />
            </span>
          </Button>
          <section css={[Styles.GameMaps]}>
            <ul>
              {values.maps.map((_, index) => {
                return (
                  <li key={index}>
                    <GameMapFormEntry
                      onDelete={() => helpers.remove(index)}
                      index={index}
                    />
                  </li>
                );
              })}
            </ul>
          </section>
        </section>
      )}
    />
  );
};
