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
    </Wrapper>
  );
};

const Wrapper = styled(Container)`
  margin: 3rem 0;
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

export default Header;
