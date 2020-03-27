import * as React from 'react';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';

import { ScoreTimewise } from 'musicxml-interfaces';
import ScoreInfo from './ScoreInfo';
import ScoreInput from './ScoreInput';
import { LyricMap } from '../lib/lyricmap';
import { mapTextLyrics, parseScorePromise } from '../lib/musicxml';
import ScoreResult from './ScoreResult';
import ScoreParsing from './ScoreParsing';

interface MainProps {}
const Main: React.FC<MainProps> = () => {
  const [inputXml, setInputXml] = React.useState<string>('');
  const [parsing, setParsing] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [score, setScore] = React.useState<ScoreTimewise | null>(null);
  const [resultXml, setResultXml] = React.useState<string>('');

  const parseXml = (text: string) => {
    setInputXml(text);
    setParsing(true);
    parseScorePromise(text)
      .then(result => {
        setScore(result);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setParsing(false);
      });
  };

  const onMap = (mapper: LyricMap) => {
    if (!score) return;
    setResultXml(mapTextLyrics(inputXml, mapper));
  };

  const onError = React.useCallback(() => {
    setIsError(true);
    setScore(null);
  }, []);

  return (
    <Container>
      <MainWrapper>
        {score === null && <ScoreInput onParse={parseXml} isError={isError} />}
        {score === null && parsing && <ScoreParsing />}
        {score !== null && (
          <ScoreInfo score={score} onMap={onMap} onError={onError} />
        )}
        {resultXml && <ScoreResult resultXml={resultXml} />}
      </MainWrapper>
    </Container>
  );
};

const MainWrapper = styled.div`
  width: 50rem;
  max-width: 100vw;
  margin: 5rem auto 0;

  text-align: center;
`;

export default Main;
