import * as React from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

interface ScoreParsingProps {}
const ScoreParsing: React.FC<ScoreParsingProps> = () => {
  return (
    <Paper>
      <Typography>解析中...</Typography>
    </Paper>
  );
};

export default ScoreParsing;
