import * as React from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import DropArea from './DropArea';

interface ScoreInputProps {
  onParse: (text: string) => void;
  isError?: boolean;
}
const ScoreInput: React.FC<ScoreInputProps> = props => {
  return (
    <Paper>
      <ScoreInputWrapper>
        <Typography variant='body1'>MusicXMLを読み込んでください</Typography>
        {props.isError && <ErrorText>不正な形式です。</ErrorText>}
        <DropArea onAccept={props.onParse} />
      </ScoreInputWrapper>
    </Paper>
  );
};

const ScoreInputWrapper = styled.div`
  padding: 2rem 0;
`;

const ErrorText = styled(Typography).attrs({
  variant: 'caption',
})`
  color: #ff0000;
  margin: '1rem 0';
`;

export default ScoreInput;
