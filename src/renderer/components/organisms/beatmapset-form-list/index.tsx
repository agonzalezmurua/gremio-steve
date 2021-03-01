import React from 'react';
import { FormattedMessage } from 'react-intl';
import { FieldArray, useFormikContext } from 'formik';

import Plus from '_/assets/icons/outline/plus.svg';

import Button from '_/components/atoms/button';
import GameMapFormEntry from '_/components/molecules/beatmapset-form-entry';
import { JourneyFormObject } from '_/components/templates/journey-form/styles';

import Styles from './styles';

const GameMapFormList = () => {
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
            <FormattedMessage
              id="components.organisms.gameMapForm.addNewDifficultyButton"
              defaultMessage="Add new"
              description="Add a new Beatmap difficulty entry"
              tagName="span"
            />
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

export default GameMapFormList;
