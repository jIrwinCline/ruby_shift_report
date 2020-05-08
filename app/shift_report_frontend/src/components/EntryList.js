import React, { useContext, useEffect, useState } from "react";
import EntryItem from "./EntryItem";
import AppContext from "../context/app-context";

export default function EntryList(props) {
  const context = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  return (
    <div className="entry-list">
      {context.currentEntries.map((entry) => {
        return <EntryItem key={entry.id} item={entry} />;
      })}
    </div>
  );
}
