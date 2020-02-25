import { ScoreTimewise } from 'musicxml-interfaces';

export const extractLyrics = (score: ScoreTimewise) => {
  const { measures } = score;

  const result: string[] = [];

  measures.forEach(measure => {
    const { parts } = measure;
    Object.entries(parts).forEach(([partName, part]) => {
      part.forEach(note => {
        if (typeof note !== 'object') {
          return;
        }

        const { lyrics } = note;
        if (lyrics === undefined || !Array.isArray(lyrics)) {
          return;
        }

        lyrics.forEach(lyric => {
          if (typeof lyric !== 'object') {
            return;
          }
          const { lyricParts } = lyric;
          if (lyricParts === undefined || !Array.isArray(lyricParts)) {
            return;
          }

          lyricParts.forEach(lp => {
            if (typeof lp !== 'object') {
              return;
            }

            const { data } = lp;
            if (data === undefined || data === 0) {
              return;
            }

            const d = String(data);
            if (!result.includes(d)) {
              result.push(d);
            }
          });
        });
      });
    });
  });

  return result;
};

export const mapLyrics = (score: ScoreTimewise) => {
  const { measures } = score;

  const result: string[] = [];

  measures.forEach(measure => {
    const { parts } = measure;
    Object.entries(parts).forEach(([partName, part]) => {
      part.forEach(note => {
        if (typeof note !== 'object') {
          return;
        }

        const { lyrics } = note;
        if (lyrics === undefined || !Array.isArray(lyrics)) {
          return;
        }

        lyrics.forEach(lyric => {
          if (typeof lyric !== 'object') {
            return;
          }
          const { lyricParts } = lyric;
          if (lyricParts === undefined || !Array.isArray(lyricParts)) {
            return;
          }

          lyricParts.forEach(lp => {
            if (typeof lp !== 'object') {
              return;
            }

            const { data } = lp;
            if (data === undefined || data === 0) {
              return;
            }

            const d = String(data);
            if (!result.includes(d)) {
              result.push(d);
            }
          });
        });
      });
    });
  });

  return result;
};
