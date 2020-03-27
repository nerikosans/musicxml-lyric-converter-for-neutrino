import * as React from 'react';
import styled from 'styled-components';
import { ScoreTimewise } from 'musicxml-interfaces';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { extractLyrics } from '../lib/musicxml';
import { defaultLyricMap, LyricMap } from '../lib/lyricmap';

const useStyles = makeStyles({
  container: {
    width: '50%',
    height: '40rem',
    margin: '0 25% 1rem',
    maxHeight: 250,
  },
});

interface ScoreInfoProps {
  score: ScoreTimewise | null;
  onMap: (mapper: LyricMap) => void;
}

const alphabetRe = new RegExp(/^[a-zA-Z]+$/);

const ScoreInfo: React.FC<ScoreInfoProps> = props => {
  const styles = useStyles();
  const { score } = props;
  const [mapper, setMapper] = React.useState<LyricMap>(defaultLyricMap);

  React.useEffect(() => {
    if (score === null) return;
    console.log('gg');

    const alphabetLyrics = extractLyrics(score).filter(l => alphabetRe.test(l));
    setMapper(
      Object.fromEntries(alphabetLyrics.map(l => [l, mapByDefault(l)]))
    );
  }, [score]);

  const onMapperChange = React.useCallback((key: string, value: string) => {
    setMapper(_mapper => {
      return {
        ..._mapper,
        [key]: value,
      };
    });
  }, []);

  if (props.score === null) {
    return (
      <Paper>
        <ScoreInfoWrapper>
          <ErrorText>楽譜が読み込まれていないか、不正な形式です。</ErrorText>
        </ScoreInfoWrapper>
      </Paper>
    );
  }

  const sc = props.score;
  const mapByDefault = (v: string) => defaultLyricMap[v] ?? v;

  const alphabetLyrics = extractLyrics(sc)
    .filter(l => alphabetRe.test(l))
    .sort((a, b) => (mapByDefault(a) < mapByDefault(b) ? -1 : 1));

  return (
    <Paper>
      <ScoreInfoWrapper>
        <BasicInfo>
          <Row>
            <Name>タイトル</Name>
            <Value>{sc.work.workTitle}</Value>
          </Row>
          <Row>
            <Name>パート数</Name>
            <Value>{sc.partList.length}</Value>
          </Row>
        </BasicInfo>
        <TableText>以下の歌詞を変換します。</TableText>
        <TableContainer className={styles.container}>
          <Table stickyHeader aria-label='sticky table' size='small'>
            <TableHead>
              <TableRow>
                <TableCell> 変換前</TableCell>
                <TableCell> 変換後</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alphabetLyrics.map(lyric => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={lyric}>
                    <TableCell>{lyric}</TableCell>
                    <TableCell>
                      <TextField
                        variant='outlined'
                        value={mapper[lyric] ?? lyric}
                        onChange={e => onMapperChange(lyric, e.target.value)}
                        size='small'
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant='contained'
          color='primary'
          onClick={() => props.onMap(mapper)}
        >
          変換!
        </Button>
      </ScoreInfoWrapper>
    </Paper>
  );
};

const ScoreInfoWrapper = styled.div`
  margin-top: 4rem;
  padding: 2rem 0;
`;

const ErrorText = styled.div``;

const BasicInfo = styled.div`
  width: 60%;
  margin: 1rem auto;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
`;
const TableText = styled(Typography).attrs({
  variant: 'body1',
})`
  width: 100%;
  margin: 0.5rem 0;
`;
const Name = styled(Typography).attrs({
  variant: 'body1',
})`
  width: 20%;
`;
const Value = styled(Typography).attrs({
  variant: 'body1',
})``;

export default ScoreInfo;
