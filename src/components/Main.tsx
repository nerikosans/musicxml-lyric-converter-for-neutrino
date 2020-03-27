import * as React from 'react';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';

import { parseScore, ScoreTimewise } from 'musicxml-interfaces';
import ScoreInfo from './ScoreInfo';
import ScoreInput from './ScoreInput';
import { LyricMap } from '../lib/lyricmap';
import { mapTextLyrics } from '../lib/musicxml';
import ScoreResult from './ScoreResult';
import { sampleScore } from '../lib/sample';

interface MainProps {}
const Main: React.FC<MainProps> = () => {
  const [inputXml, setInputXml] = React.useState<string>(sampleScore);
  const [score, setScore] = React.useState<ScoreTimewise | null>(null);
  const [resultXml, setResultXml] = React.useState<string>('');

  const parseXml = () => {
    const result = parseScore(inputXml);
    setScore(result);
    console.log(result);
  };

  const onMap = (mapper: LyricMap) => {
    if (!score) return;
    setResultXml(mapTextLyrics(inputXml, mapper));
  };

  return (
    <Container>
      <MainWrapper>
        <ScoreInput
          onParse={parseXml}
          onChange={setInputXml}
          value={inputXml}
        />
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
