import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/app-context";
import { useHistory } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";

import EntryList from "../components/EntryList";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function ReportPage(props) {
  const classes = useStyles();
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
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h2>{context.currentReport.title}</h2>
        </Grid>
        <Grid container xs={12}>
          <Grid container xs={12}>
            <form id="entry-form" onSubmit={handleSubmit}>
              <Grid item xs={12}>
                <input
                  name="time"
                  onChange={handleChange}
                  placeholder="Approximate time"
                  type="text"
                />
              </Grid>
              <Grid item={12}>
                <textarea
                  name="body"
                  onChange={handleChange}
                  placeholder="Make an entry"
                  type="text"
                />
              </Grid>
            </form>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              form="entry-form"
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<SendIcon />}
            >
              Make Entry
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<SaveIcon />}
              onClick={() => context.generateDocx(props.match.params.id)}
            >
              Generate Report
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <EntryList reportId={props.match.params.id} />
        </Grid>
      </Grid>
    </div>
  );
}
