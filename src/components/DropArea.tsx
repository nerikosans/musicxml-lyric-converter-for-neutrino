import * as React from 'react';
import styled from 'styled-components';
import { useDropzone, DropzoneOptions, DropEvent } from 'react-dropzone';

type onDropHandler = <T extends File>(
  acceptedFiles: T[],
  rejectedFiles: T[],
  event: DropEvent
) => void;

interface DropAreaProps {
  onAccept: (text: string) => void;
  onError?: () => void;
}
const DropArea: React.FC<DropAreaProps> = props => {
  const { onAccept, onError } = props;

  const onDrop: onDropHandler = React.useCallback(
    acceptedFiles => {
      acceptedFiles.forEach(file => {
        const reader = new FileReader();

        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => {
          onError?.();
        };
        reader.onload = () => {
          const resultStr = reader.result;

          if (typeof resultStr === 'string') {
            onAccept(resultStr);
          }
        };
        reader.readAsText(file);
      });
    },
    [onAccept, onError]
  );

  const options: DropzoneOptions = {
    onDrop,
    // accept: [
    //   'application/vnd.recordare.musicxml+xml,',
    //   'application/vnd.recordare.musicxml',
    // ],
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone(options);

  return (
    <DropAreaWrapper {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </DropAreaWrapper>
  );
};

const DropAreaWrapper = styled.div`
  width: 50%;
  margin: 2rem auto;
  padding: 5rem 0;
  border-radius: 1rem;
  border: rgba(0, 0, 0, 0.25) 1px dotted;
`;

export default DropArea;
