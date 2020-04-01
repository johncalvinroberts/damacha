/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';

export default () => {
  return (
    <div
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div sx={{ p: 2 }}>
        <Styled.h1
          sx={{
            fontSize: [3, 4, 5],
            mb: 2,
          }}
        >
          Not Found
        </Styled.h1>
        <Styled.p>
          The track you are seeking has been removed, maybe it was never here at
          all.
        </Styled.p>
      </div>
    </div>
  );
};
