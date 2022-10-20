import { Container, Stack, Typography } from "@mui/material";
import { css } from "@emotion/react";
import PigImage from "../assets/img/pig.png";

const NotFound = () => {
  return (
    <div
      css={css`
        height: 750px;
        background-image: url(${PigImage});
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        background-color: rgba(255, 255, 255, 0.6);
        background-blend-mode: lighten;
        background-size: 180%;
        @media screen and (min-width: 768px) {
          background-size: 100%;
        }
        @media screen and (min-width: 1024px) {
          max-width: 1600px;
        }
        position: center;
        width: 100%;
        height: calc(100vh - 80px);
        margin: 0 auto;
      `}
    >
      <div>
        <Container
          css={css`
            max-width: 90%;
          `}
        >
          <Stack
            spacing={5}
            css={css`
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 80%;
              text-align: center;
            `}
          >
            <div>
              <Typography variant="h2" element="h1">
                404
              </Typography>
              <Typography variant="h4" element="h1">
                Not Found
              </Typography>
            </div>
            <Typography variant="h6" element="p">
              子豚はここにはいません
            </Typography>
          </Stack>
        </Container>
      </div>
    </div>
  );
};

export default NotFound;
