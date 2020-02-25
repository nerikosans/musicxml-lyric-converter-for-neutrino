import * as React from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputArea from './InputArea';
import { sampleScore } from '../lib/sample';

interface ScoreInputProps {
  onParse: (text: string) => void;
}
const ScoreInput: React.FC<ScoreInputProps> = props => {
  const [inputXml, setInputXml] = React.useState<string>(sampleScore);

  return (
    <Paper>
      <ScoreInputWrapper>
        <Typography>MusicXMLを貼り付けてください</Typography>
        <InputArea
          onChange={e => setInputXml(e.target.value)}
          value={inputXml}
        />
        <Button
          variant='contained'
          color='primary'
          onClick={() => props.onParse(inputXml)}
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
