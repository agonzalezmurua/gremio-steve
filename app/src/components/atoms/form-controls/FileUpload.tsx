import React, { useRef } from 'react';
import tw from 'twin.macro';

import Upload from '@assets/icons/outline/upload.svg';

import InputStyles from './Input.styles';

type FileUploadProps = {
  onChange: (event: { target: { name?: string; value: File } }) => void;
  value?: File;
};

const FileUpload: React.FC<
  React.HTMLProps<HTMLInputElement> & FileUploadProps
> = ({ value, ...props }) => {
  // const image = useRef<HTMLImageElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files![0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    // image.current!.title = file.name;
    // reader.onload = function (event) {
    //   image.current!.src = event.target!.result as string;
    // };
    reader.readAsDataURL(file);

    props.onChange &&
      props.onChange({ target: { name: props.name, value: file } });
  };

  return (
    <section css={[InputStyles.Wrapper]}>
      <input {...props} onChange={handleChange} hidden ref={input} />
      <input
        css={[InputStyles.Input]}
        readOnly
        onClick={() => input.current!.click()}
        value={value?.name}
      />
      <Upload tw="h-4 w-4 mx-2 my-auto text-gray-500" />
    </section>
  );
};

export default FileUpload;
