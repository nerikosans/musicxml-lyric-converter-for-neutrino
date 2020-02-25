import * as React from 'react';
import styled from 'styled-components';
import { parseScore, ScoreTimewise } from 'musicxml-interfaces';
import InputArea from './InputArea';
import ScoreInfo from './ScoreInfo';
import { sampleScore } from '../lib/sample';

interface MainProps {}
const Main: React.FC<MainProps> = () => {
  const [inputXml, setInputXml] = React.useState<string>(sampleScore);
  const [score, setScore] = React.useState<ScoreTimewise | null>(null);

  const parseXml = () => {
    const result = parseScore(inputXml);
    setScore(result);
    console.log(result);
  };

  return (
    <MainWrapper>
      <InputArea onChange={e => setInputXml(e.target.value)} value={inputXml} />
      <Button onClick={() => parseXml()}>Parse!</Button>
      <ScoreInfo score={score} />
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  width: 50rem;
  max-width: 100vw;
  margin: 0 auto;

  text-align: center;
`;

const Button = styled.button``;

export default Main;
