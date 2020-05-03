import React, { useContext, useEffect } from "react";
import AppContext from "../context/app-context";
import { useHistory } from "react-router-dom";

export default function ReportPage(props) {
  const context = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    const afunc = async () => {
      const id = props.match.params.id;
      console.log(props.match.params.id);
      if (!window.localStorage.signedIn) {
        history.push("/login");
      }
      await context.getReport(id);
      await console.log(context);
    };
    afunc();
  }, []);

  return <div>ReportPage</div>;
}
