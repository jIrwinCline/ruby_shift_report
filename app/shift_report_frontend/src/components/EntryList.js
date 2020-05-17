import React, { useContext, useEffect, useState } from "react";
import EntryItem from "./EntryItem";
import AppContext from "../context/app-context";
import { withRouter } from "react-router";

function EntryList(props) {
  const context = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    context.getEntries(props.match.params.id);
  }, [props.match.params.id]);

  return (
    <div className="entry-list">
      {context.currentEntries.map((entry) => {
        return <EntryItem key={entry.id} item={entry} />;
      })}
    </div>
  );
}
export default withRouter(EntryList);
