import React, { useEffect, useRef } from 'react';
import tw from 'twin.macro';

import Upload from '@assets/icons/outline/upload.svg';

import Styles from './Input.styles';
import { useFormikContext } from 'formik';

type FileUploadProps = {
  error?: string;
  message?: string;
};

const FileUpload: React.FC<
  FileUploadProps & React.HTMLProps<HTMLInputElement>
> = ({ name, id, accept, error, message, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const fileInput = useRef<HTMLInputElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const reader = useRef<FileReader>(new FileReader());
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files![0];
    if (!file) {
      return;
    }

    input.current!.value = file.name;
    reader.current.readAsDataURL(file);
  };
  useEffect(() => {
    reader.current!.onload = (item) => {
      setFieldValue(name!, item.target!.result);
    };
  }, []);

  return (
    <section
      css={[Styles.Wrapper]}
      {...props}
      onClickCapture={() => fileInput.current!.click()}
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
        ref={fileInput}
        hidden
      />
      <input css={[Styles.Input]} readOnly ref={input} />
      <Upload tw="h-4 w-4 mx-2 my-auto text-gray-500" />
    </section>
  );
};

export default FileUpload;
