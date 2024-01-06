import React, { useEffect, useState } from "react";
const crypto = require('crypto');

const API_URL = "http://localhost:8080";

function App() {
  const [data, setData] = useState<string>();
  const [checksum, setChecksum] = useState<number>();

  const calculateChecksum = (data: string): number => {
      return crypto.createHash('sha256').update(data).digest('hex');
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch(API_URL);
    const res = await response.json();
    setData(res.data);
    setChecksum(res.checksum);
  };

  const updateData = async () => {
    await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ data }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    await getData();
  };

  //Function verify if the the data has been tampered or not.
  const verifyData = async () => {
    const clientChecksum = calculateChecksum(data!);

    if (clientChecksum !== checksum) {
      alert("Data is tampered");
    } else {
      alert("Data is intact!");
    }
  };

  //Function to get the original data from the backup database
  const retriveData = async () => {
    const response = await fetch(API_URL);
    const res = await response.json();
    setData(res.data);
    setChecksum(res.checksum);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        position: "absolute",
        padding: 0,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
        fontSize: "30px",
      }}
    >
      <div>Saved Data</div>
      <input
        style={{ fontSize: "30px" }}
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />

      <div style={{ display: "flex", gap: "10px" }}>
        <button style={{ fontSize: "20px" }} onClick={updateData}>
          Update Data
        </button>
        <button style={{ fontSize: "20px" }} onClick={verifyData}>
          Verify Data
        </button>
        <button style={{ fontSize: "20px" }} onClick={retriveData}>
          Retrive Data
        </button>
      </div>
    </div>
  );
}

export default App;
