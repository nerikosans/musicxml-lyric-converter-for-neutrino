import * as React from 'react';
import styled from 'styled-components';
import { ScoreTimewise } from 'musicxml-interfaces';
import { extractLyrics, mapLyrics } from '../lib/musicxml';
import { defaultLyricMap } from '../lib/lyricmap';
import { Paper } from '@material-ui/core';

interface ScoreInfoProps {
  score: ScoreTimewise | null;
}

const ScoreInfo: React.FC<ScoreInfoProps> = props => {
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
  const lyrics = extractLyrics(sc);
  console.log(lyrics);
  const mapped = mapLyrics(sc, defaultLyricMap);
  console.log(mapped);

  return (
    <Paper>
      <ScoreInfoWrapper>
        <Row>
          <Name>タイトル</Name>
          <Value>{sc.work.workTitle}</Value>
        </Row>
        <Row>
          <Name>パート数</Name>
          <Value>{sc.partList.length}</Value>
        </Row>
      </ScoreInfoWrapper>
    </Paper>
  );
};

const ScoreInfoWrapper = styled.div`
  margin-top: 4rem;
  padding: 2rem 0;
`;

const ErrorText = styled.div``;

const Row = styled.div`
  width: 80%;
  display: flex;
`;
const Name = styled.div`
  width: 20%;
`;
const Value = styled.div``;

export default ScoreInfo;
