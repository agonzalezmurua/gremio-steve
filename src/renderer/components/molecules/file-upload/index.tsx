import 'twin.macro';
import { useFormikContext } from 'formik';
import React, { useEffect, useRef } from 'react';

import Upload from '@/assets/icons/outline/upload.svg';

import Styles from '../../atoms/input/styles';
import useKeyDownHotkey from '@/hooks/useKeydownHotkey';

type FileUploadProps = {
  error?: string;
  message?: string;
};

const FileUpload: React.FC<
  FileUploadProps & React.HTMLProps<HTMLInputElement>
> = ({ name, id, accept, error, message, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const readerRef = useRef<FileReader>(new FileReader());
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files![0];
    if (!file) {
      return;
    }

    inputRef.current!.value = file.name;
    readerRef.current.readAsDataURL(file);
  };
  useEffect(() => {
    readerRef.current!.onload = (item) => {
      setFieldValue(name!, item.target!.result);
    };
  }, []);

  useKeyDownHotkey(inputRef, 'Enter', (event) => {
    event.preventDefault();
    fileInputRef.current!.click();
  });
  useKeyDownHotkey(inputRef, ' ', (event) => {
    event.preventDefault();
    fileInputRef.current!.click();
  });

  return (
    <section
      css={[Styles.Wrapper, error && Styles.ErrorWrapper]}
      {...props}
      onClickCapture={() => fileInputRef.current!.click()}
    >
      {(message || error) && (
        <section css={[Styles.Messsage]}>{message || error}</section>
      )}
      <input
        type="file"
        name={name}
        id={id}
        accept={accept}
        onChange={handleChange}
        ref={fileInputRef}
        hidden
      />
      <input css={[Styles.Input]} readOnly ref={inputRef} />
      <Upload tw="h-4 w-4 mx-2 my-auto text-gray-500" />
    </section>
  );
};

export default FileUpload;
