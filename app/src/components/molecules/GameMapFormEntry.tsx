import React from 'react';
import 'twin.macro';

import Input from '@components/atoms/form-controls/Input';
import Label from '@components/atoms/form-controls/Label';
import GameMapDifficultySelect from '@components/atoms/GameMapDifficultySelect';
import GameMapModeSelect from '@components/atoms/GameMapModeSelect';
import Button from '@components/atoms/form-controls/Button';

import Minus from '@assets/icons/outline/minus.svg';

type GameMapFormEntryProps = {
  id: string;
  onDelete?: (id: string) => void;
};

const GameMapFormEntry: React.FC<GameMapFormEntryProps> = ({
  id,
  onDelete,
}) => {
  return (
    <React.Fragment>
      <Button
        variant="self-contained"
        tw=" h-8 px-2"
        color="red"
        onClick={() => onDelete && onDelete(id)}
      >
        <Minus tw="h-4 w-4" />
      </Button>

      <Label text="Name" htmlFor={`name.${id}`}>
        <Input id={`name.${id}`} name={`name.${id}`} type="text" required />
      </Label>

      <Label text="Mode" htmlFor={`mode.${id}`}>
        <GameMapModeSelect />
      </Label>

      <Label text="Difficulty" htmlFor={`difficulty.${id}`}>
        <GameMapDifficultySelect />
      </Label>
    </React.Fragment>
  );
};

export default GameMapFormEntry;
