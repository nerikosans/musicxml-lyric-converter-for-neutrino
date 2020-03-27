import * as React from 'react';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';

import { parseScore, serializeScore, ScoreTimewise } from 'musicxml-interfaces';
import ScoreInfo from './ScoreInfo';
import ScoreInput from './ScoreInput';
import { LyricMap } from '../lib/lyricmap';
import { mapLyrics } from '../lib/musicxml';
import ScoreResult from './ScoreResult';

interface MainProps {}
const Main: React.FC<MainProps> = () => {
  const [score, setScore] = React.useState<ScoreTimewise | null>(null);
  const [mappedScore, setMappedScore] = React.useState<ScoreTimewise | null>(
    null
  );
  const [resultXml, setResultXml] = React.useState<string>('');

  const parseXml = (text: string) => {
    const result = parseScore(text);
    setScore(result);
    console.log(result);
  };

  const onMap = (mapper: LyricMap) => {
    if (!score) return;
    const mapped = mapLyrics(score, mapper);
    setMappedScore(mapped);
    setResultXml(serializeScore(mapped));
  };

  return (
    <Container>
      <MainWrapper>
        <ScoreInput onParse={text => parseXml(text)} />
        <ScoreInfo score={score} onMap={onMap} />
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
