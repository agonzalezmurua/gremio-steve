/* eslint-disable react/no-children-prop */
import React, { useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

import 'twin.macro';

import Button from './Button';

type EditorProps = { value: string } & React.HTMLProps<HTMLTextAreaElement>;

const Editor: React.FC<EditorProps> = (props) => {
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');
  const areaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <section tw="flex flex-col h-72 w-full shadow rounded">
      <textarea
        tw="flex-grow w-full resize-none overflow-y-scroll"
        {...props}
        ref={areaRef}
        hidden={mode !== 'edit'}
      />

      <section
        tw="flex-grow w-full overflow-y-scroll"
        hidden={mode !== 'preview'}
      >
        <ReactMarkdown
          plugins={[gfm]}
          children={props.value || areaRef.current?.value || ''}
        />
      </section>

      <section tw="border-t space-x-1">
        <Button
          variant="small"
          tw="border-none rounded-none"
          active={mode === 'edit'}
          onClick={() => setMode('edit')}
          name={`set ${props.name} to edit mode`}
        >
          Edit
        </Button>
        <Button
          variant="small"
          tw="border-none rounded-none"
          active={mode === 'preview'}
          onClick={() => setMode('preview')}
          name={`set ${props.name} to preview mode`}
        >
          Preview
        </Button>
      </section>
    </section>
  );
};

export default Editor;
