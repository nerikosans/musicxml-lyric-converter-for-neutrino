import * as React from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import DropArea from './DropArea';

interface ScoreInputProps {
  onParse: (text: string) => void;
}
const ScoreInput: React.FC<ScoreInputProps> = props => {
  return (
    <Paper>
      <ScoreInputWrapper>
        <Typography>MusicXMLを貼り付けてください</Typography>
        <DropArea onAccept={props.onParse} />
      </ScoreInputWrapper>
    </Paper>
  );
};

const ScoreInputWrapper = styled.div`
  padding: 2rem 0;
`;

export default ScoreInput;
