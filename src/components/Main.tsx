import * as React from 'react';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';

import { parseScore, ScoreTimewise } from 'musicxml-interfaces';
import ScoreInfo from './ScoreInfo';
import ScoreInput from './ScoreInput';

interface MainProps {}
const Main: React.FC<MainProps> = () => {
  const [score, setScore] = React.useState<ScoreTimewise | null>(null);

  const parseXml = (text: string) => {
    const result = parseScore(text);
    setScore(result);
    console.log(result);
  };

  return (
    <Container>
      <MainWrapper>
        <ScoreInput onParse={text => parseXml(text)} />
        <ScoreInfo score={score} />
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
