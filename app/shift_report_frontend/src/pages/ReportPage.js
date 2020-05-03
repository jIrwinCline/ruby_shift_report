import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/app-context";
import { useHistory } from "react-router-dom";

export default function ReportPage(props) {
  const context = useContext(AppContext);
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const id = props.match.params.id;
      console.log(props.match.params.id);
      if (!window.localStorage.signedIn) {
        history.push("/login");
      }
      await context.getReport(id);
      setLoading(context.currentReport == undefined ? false : true);
    }
    fetchData();
  }, []);

  const handleChange = () => {
    return null;
  };

  return loading ? (
    <div>loading...</div>
  ) : (
    <div>
      <h2>{context.currentReport.title}</h2>
      <form>
        <input
          name="body"
          onChange={handleChange}
          placeholder="Make an entry"
          type="text"
        />
        <button>Make Entry</button>
      </form>
    </div>
  );
}
