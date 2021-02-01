/* eslint-disable react/no-children-prop */
import React, { useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import 'twin.macro';

import Button from './Button';
import Styles from './MarkdownEditor.styles';
import InputStyles from '@components/atoms/form-controls/Input.styles';
import Markdown from '@components/atoms/Markdown';

type EditorProps = {
  value?: string;
  message?: string;
  error?: string;
} & React.HTMLProps<HTMLTextAreaElement>;

const MarkdownEditor: React.FC<EditorProps> = ({
  message,
  error,
  ...props
}) => {
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');
  const areaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <section css={[Styles.Wrapper, error && InputStyles.ErrorWrapper]}>
      {(message || error) && (
        <section css={[Styles.Message]}>{message || error}</section>
      )}
      <textarea
        css={[Styles.Preview]}
        {...props}
        ref={areaRef}
        hidden={mode !== 'edit'}
      />

      <section css={[Styles.Preview]} hidden={mode !== 'preview'}>
        <Markdown value={props.value || areaRef.current?.value || ''} />
      </section>

      <section css={[Styles.ButtonWrapper]}>
        <Button
          size="small"
          active={mode === 'edit'}
          onClick={() => setMode('edit')}
          name={`set ${props.name} to edit mode`}
          tabIndex={-1}
        >
          <FormattedMessage
            id="components.atoms.form-controls.editButton"
            description="Set markdown editor form component into edit mode"
            defaultMessage="Edit"
          />
        </Button>
        <Button
          size="small"
          active={mode === 'preview'}
          onClick={() => setMode('preview')}
          name={`set ${props.name} to preview mode`}
          tabIndex={-1}
        >
          <FormattedMessage
            id="components.atoms.form-controls.previewButton"
            description="Set markdown editor form component into preview mode"
            defaultMessage="Preview"
          />
        </Button>
      </section>
    </section>
  );
};

export default MarkdownEditor;
