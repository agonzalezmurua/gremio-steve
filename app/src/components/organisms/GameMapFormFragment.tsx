import React from 'react';
import 'twin.macro';

import Input from '@components/atoms/form-controls/Input';
import Label from '@components/atoms/form-controls/Label';
import GameMapModeSelect from '@components/molecules/GameMapModeSelect';
import GameMapDifficultySelect from '@components/molecules/GameMapDifficultySelect';

import Styles from './GameMapFormFragment.styles';

export const GameMapFormPart = () => {
  return (
    <section css={[Styles.Wrapper]}>
      <Label text="Name" htmlFor="difficulty">
        <Input id="title" name="title" type="text" required />
      </Label>

      <Label text="Mode" htmlFor="mode">
        <GameMapModeSelect />
      </Label>

      <Label text="Difficulty" htmlFor="difficulty">
        <GameMapDifficultySelect mode="ctb" />
      </Label>
    </section>
  );
};
