import { useEffect, useRef } from "react";
import { BrowserQRCodeReader } from "@zxing/browser";
import { css } from "@emotion/react";

const QRCodeReader = ({ onReadQRCode }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }
    const codeReader = new BrowserQRCodeReader();
    (async () => {
      const result = await codeReader.decodeOnceFromVideoDevice(
        undefined,
        videoRef.current
      );
      onReadQRCode(result);
    })();
  }, []);

  return (
    <video
      css={css`
        width: 100%;
        height: 100%;
      `}
      ref={videoRef}
    />
  );
};

export default QRCodeReader;
