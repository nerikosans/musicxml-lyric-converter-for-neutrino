import * as React from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputArea from './InputArea';

interface ScoreInputProps {
  onParse: (text: string) => void;
  onChange: (v: string) => void;
  value: string;
}
const ScoreInput: React.FC<ScoreInputProps> = props => {
  return (
    <Paper>
      <ScoreInputWrapper>
        <Typography>MusicXMLを貼り付けてください</Typography>
        <InputArea
          onChange={e => props.onChange(e.target.value)}
          value={props.value}
        />
        <Button
          variant='contained'
          color='primary'
          onClick={() => props.onParse(props.value)}
        >
          Parse!
        </Button>
      </ScoreInputWrapper>
    </Paper>
  );
};

const ScoreInputWrapper = styled.div`
  padding: 2rem 0;
`;

export default ScoreInput;
