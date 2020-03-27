import * as React from 'react';
import styled from 'styled-components';

import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';
interface FooterProps {}
const Footer: React.FC<FooterProps> = () => {
  return (
    <Wrapper>
      <Link
        href='https://n3utrino.work/'
        target='_blank'
        rel='noopener noreferrer'
      >
        <Typography variant='subtitle1'>NEUTRINO 公式ページ</Typography>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled(Container)`
  margin-top: 3rem;
  text-align: center;
`;

const Link = styled.a`
  color: #ffffff;
`;

export default Footer;
