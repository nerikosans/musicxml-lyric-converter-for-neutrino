import * as React from 'react';
import styled from 'styled-components';

const GithubButton: React.FC<{}> = () => {
  return (
    <GithubButtonWrapper>
      <iframe
        src='https://ghbtns.com/github-btn.html?user=nerikosans&repo=musicxml-lyric-converter-for-neutrino&type=star&count=true'
        frameBorder='0'
        scrolling='0'
        width='160px'
        height='30px'
        title='github-button'
      ></iframe>
    </GithubButtonWrapper>
  );
};

const GithubButtonWrapper = styled.div`
  margin-top: 1rem;
`;

export default GithubButton;
