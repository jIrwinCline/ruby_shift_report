import React, { useEffect } from "react";

export default function FileDownload(props) {
  useEffect(() => {
    let btn = document.getElementById("submit-button");
    btn.click();
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitted!!!");
  };
  return (
    <form
      onSubmit={handleSubmit}
      onDownloadComplete={null}
      style={{ display: "hidden" }}
    >
      <button id="submit-button"></button>
    </form>
  );
}
