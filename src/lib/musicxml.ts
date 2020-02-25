import { ScoreTimewise } from 'musicxml-interfaces';
import { LyricMap } from './lyricmap';

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

export const mapLyrics = (score: ScoreTimewise, mapper: LyricMap) => {
  const { measures } = score;

  const result = {
    ...score,
    measures: measures.map(measure => {
      const { parts } = measure;

      return {
        ...measure,
        parts: Object.fromEntries(
          Object.entries(parts).map(([partName, part]) => {
            return [
              partName,
              part.map(note => {
                if (typeof note !== 'object') {
                  return note;
                }

                const { lyrics } = note;
                if (lyrics === undefined || !Array.isArray(lyrics)) {
                  return note;
                }

                return {
                  ...note,
                  lyrics: lyrics.map(lyric => {
                    if (typeof lyric !== 'object') {
                      return lyric;
                    }
                    const { lyricParts } = lyric;
                    if (
                      lyricParts === undefined ||
                      !Array.isArray(lyricParts)
                    ) {
                      return lyric;
                    }

                    return {
                      ...lyric,
                      lyricParts: lyricParts.map(lp => {
                        if (typeof lp !== 'object') {
                          return lp;
                        }

                        const { data } = lp;
                        if (data === undefined || data === 0) {
                          return lp;
                        }

                        const d = String(data);

                        return {
                          ...lp,
                          data: mapper[d] ?? d,
                        };
                      }),
                    };
                  }),
                };
              }),
            ];
          })
        ),
      };
    }),
  };

  return result;
};
