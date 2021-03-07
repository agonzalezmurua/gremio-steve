import React from 'react';
import { FormattedMessage } from 'react-intl';
import { FieldArray, useFormikContext } from 'formik';

import Plus from '_/assets/icons/outline/plus.svg';

import Button from '_/components/atoms/button';
import BeatmapListEntry from '_/components/organisms/beatmapset-form-list/beatmap-list-entry';
import { JourneyFormObject } from '_/components/templates/journey-form/validations';

import Styles from './styles';
import { DIFFICULTIES, MODES } from '_/constants/beatmapset';

const GameMapFormList = () => {
  const { values } = useFormikContext<JourneyFormObject>();

  return (
    <FieldArray
      name="beatmaps"
      render={(helpers) => (
        <section css={[Styles.Wrapper]}>
          <Button
            name="add"
            onClick={() =>
              helpers.push({
                name: '',
                mode: MODES.std,
                difficulty: DIFFICULTIES.normal,
              })
            }
          >
            <Plus />
            <FormattedMessage
              id="components.organisms.gameMapForm.addNewDifficultyButton"
              defaultMessage="Add"
              description="Add a new Beatmap to the Journey"
              tagName="span"
            />
          </Button>
          <section css={[Styles.GameMaps]}>
            <ul>
              {values.beatmaps.map((_, index) => {
                return (
                  <li key={index}>
                    <BeatmapListEntry
                      name="beatmaps"
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
