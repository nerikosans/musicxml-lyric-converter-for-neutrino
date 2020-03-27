import * as React from 'react';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import { ScoreTimewise } from 'musicxml-interfaces';
import ScoreInfo from './ScoreInfo';
import ScoreInput from './ScoreInput';
import { LyricMap } from '../lib/lyricmap';
import { mapTextLyrics, parseScorePromise } from '../lib/musicxml';
import ScoreResult from './ScoreResult';
import ScoreParsing from './ScoreParsing';
import Header from './Header';
import Footer from './Footer';

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

  const onReset = React.useCallback(() => {
    setIsError(false);
    setScore(null);
    setInputXml('');
    setResultXml('');
    setParsing(false);
  }, []);

  return (
    <Container>
      <Header />
      <MainWrapper>
        {score === null && <ScoreInput onParse={parseXml} isError={isError} />}
        {score === null && parsing && <ScoreParsing />}
        {score !== null && (
          <ScoreInfo score={score} onMap={onMap} onError={onError} />
        )}
        {resultXml && <ScoreResult resultXml={resultXml} />}
        <ResetButton variant='contained' color='primary' onClick={onReset}>
          リセット
        </ResetButton>
      </MainWrapper>

      <Footer />
    </Container>
  );
};

const MainWrapper = styled.div`
  width: 50rem;
  max-width: 100%;
  margin: 5rem auto 0;

  text-align: center;
`;

const ResetButton = styled(Button)`
  margin-top: 1rem;
`;

export default Main;
