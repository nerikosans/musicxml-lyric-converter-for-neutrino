import * as React from 'react';
import styled from 'styled-components';

import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';
import GithubButton from './GithubButton';

interface HeaderProps {}
const Header: React.FC<HeaderProps> = () => {
  return (
    <Wrapper>
      <Title>MusicXML変換くん for NEUTRINO</Title>
      <SubTitle>Author: @nerikosans</SubTitle>

      <GithubButton />
      <Description>
        {
          'musicxmlに含まれるアルファベットの歌詞をひらがな表記に変換して、NEUTRINOで読み込めるようにします。\n開発は非公式であり、NEUTRINO本体の開発元とは関係しておりません。'
        }
      </Description>
    </Wrapper>
  );
};

const Wrapper = styled(Container)`
  margin: 3rem 0 1rem;
  text-align: center;
`;

const Title = styled(Typography).attrs({
  variant: 'h4',
})`
  color: #ffffff;
`;
const SubTitle = styled(Typography).attrs({
  variant: 'subtitle1',
})`
  color: #ffffff;
`;

const Description = styled(Typography).attrs({
  variant: 'body2',
})`
  color: #ffffff;
  margin: 1rem auto 0;
  width: 60%;
  white-space: pre-line;
`;

export default Header;
