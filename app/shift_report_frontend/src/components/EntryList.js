import React, { useContext, useEffect, useState } from "react";
import EntryItem from "./EntryItem";
import AppContext from "../context/app-context";

export default function EntryList(props) {
  const context = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     async function fetchData() {
  //       await context.getEntries(props.reportId);
  //       console.log(context);
  //       setLoading(context.currentEntries == undefined ? false : true);
  //     }
  //     fetchData();
  //   }, []);

  return (
    <div>
      {context.currentEntries.map((entry) => {
        return <EntryItem item={entry} />;
      })}
    </div>
  );
}
