import React from 'react';
import { FormattedMessage } from 'react-intl';
import { FieldArray, useFormikContext } from 'formik';

import Plus from '@assets/icons/outline/plus.svg';
import Button from '@components/atoms/form-controls/Button';
import GameMapFormEntry from '@components/molecules/GameMapFormEntry';
import { JourneyForm } from '@components/templates/journeys/NewJourney.form';

import Styles from './GameMapFormList.styles';

export const GameMapFormList = () => {
  const { values } = useFormikContext<JourneyForm>();

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
                defaultMessage="Add Game Map"
                description="Add a new GameMap"
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
