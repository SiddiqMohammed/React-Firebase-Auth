import React, { useState } from "react";

import QrScan from "react-qr-reader";

function QRscanner() {
  const [qrscan, setQrscan] = useState("No result");
  const handleScan = (data) => {
    if (data) {
      setQrscan(data);
      console.log(data)
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div>
      {/* <span>QR Scanner</span> */}

        <div style={{ marginTop: 0 }}>
          <QrScan
            delay={500}
            onError={handleError}
            onScan={handleScan}
            showViewFinder={false}
            onLoad={{mirrorVideo: false}}
            style={{ width:300, height:300}}
          />
        </div>
    </div>
  );
}

export default QRscanner;
