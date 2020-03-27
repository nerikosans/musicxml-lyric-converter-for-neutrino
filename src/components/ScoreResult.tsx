import * as React from 'react';
import styled from 'styled-components';
import CopyToClipboard from 'react-copy-to-clipboard';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputArea from './InputArea';

interface ScoreResultProps {
  resultXml: string;
}
const ScoreResult: React.FC<ScoreResultProps> = props => {
  return (
    <Paper>
      <ScoreResultWrapper>
        <Typography>変換完了！</Typography>
        <InputArea value={props.resultXml} readOnly />
        <CopyToClipboard text={props.resultXml}>
          <Button variant='contained' color='primary'>
            クリップボードにコピー
          </Button>
        </CopyToClipboard>
      </ScoreResultWrapper>
    </Paper>
  );
};

const ScoreResultWrapper = styled.div`
  margin: 3rem 0;
  padding: 2rem 0;
`;

export default ScoreResult;
