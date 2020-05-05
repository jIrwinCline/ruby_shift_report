import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/app-context";
import { useHistory } from "react-router-dom";

import EntryList from "../components/EntryList";

export default function ReportPage(props) {
  const context = useContext(AppContext);
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [entry, setEntry] = useState({
    body: null,
    time: null,
    report_id: null,
  });

  useEffect(() => {
    async function fetchData() {
      const id = props.match.params.id;
      console.log(props.match.params.id);
      if (!window.localStorage.signedIn) {
        history.push("/login");
      }
      await context.getReport(id);
      await context.getEntries(id);
      setLoading(context.currentReport == undefined ? false : true);
    }
    fetchData();
  }, []);

  const handleChange = (event) => {
    setEntry({ ...entry, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await context.makeEntry({ ...entry, report_id: props.match.params.id });
    context.getEntries(props.match.params.id);
  };

  return loading ? (
    <div>loading...</div>
  ) : (
    <div>
      <h2>{context.currentReport.title}</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="time"
          onChange={handleChange}
          placeholder="Approximate time"
          type="text"
        />
        <br />
        <br />
        <textarea
          name="body"
          onChange={handleChange}
          placeholder="Make an entry"
          type="text"
        />
        <br />
        <button>Make Entry</button>
      </form>
      <button onClick={() => context.generateDocx(props.match.params.id)}>
        Generate Report
      </button>
      <EntryList reportId={props.match.params.id} />
    </div>
  );
}
