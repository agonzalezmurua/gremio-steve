import 'twin.macro';
import React, { useMemo } from 'react';
import { useField } from 'formik';

import Input from '_/components/atoms/input';
import Label from '_/components/atoms/label';
import DifficultySelect from '_/components/molecules/difficulty-select';
import ModeSelect from '_/components/molecules/mode-select';
import Button from '_/components/atoms/button';

import Trash from '_/assets/icons/outline/trash.svg';
import { DIFFICULTIES, MODES } from '_/constants/beatmapset';

type Props = {
  name: string;
  index: number;
  onDelete?: () => void;
};

const BeatmapListEntry: React.FC<Props> = ({ name, onDelete, index }) => {
  const inputs = useMemo(
    () => ({
      name: `${name}[${index}].name`,
      mode: `${name}[${index}].mode`,
      difficulty: `${name}[${index}].difficulty`,
    }),
    [index]
  );
  const [nameField, nameFieldMeta] = useField<string>({
    name: inputs.name,
    type: 'text',
  });
  const [modeField] = useField<MODES>({
    name: inputs.mode,
  });
  const [difficultyField] = useField<DIFFICULTIES>({ name: inputs.difficulty });

  return (
    <React.Fragment>
      <Button
        magnitude="self-contained"
        tw="h-8 p-2"
        color="red"
        onClick={onDelete}
      >
        <Trash tw="h-4 w-4" />
      </Button>

      <Label tw="flex-grow" text="Name" htmlFor={`maps[${index}].name`}>
        <Input
          name={nameField.name}
          onChange={(e) => nameField.onChange(e)}
          value={nameField.value}
          error={nameFieldMeta.error}
        />
      </Label>

      <Label tw="flex-grow" text="Mode" htmlFor={inputs.mode}>
        <ModeSelect
          name={modeField.name}
          onChange={(e) => modeField.onChange(e)}
          value={modeField.value}
        />
      </Label>

      <Label tw="flex-grow" text="Difficulty" htmlFor={inputs.difficulty}>
        <DifficultySelect
          name={difficultyField.name}
          onChange={(e) => difficultyField.onChange(e)}
          value={difficultyField.value}
          mode={modeField.value}
        />
      </Label>
    </React.Fragment>
  );
};

export default BeatmapListEntry;
