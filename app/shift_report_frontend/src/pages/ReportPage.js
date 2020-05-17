import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/app-context";
import { useHistory, withRouter } from "react-router-dom";
// MUI
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import TextField from "@material-ui/core/TextField";
//ElasticUI
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageSideBar,
  EuiTitle,
} from "@elastic/eui";
// import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
//Helpers
import { formatAMPM } from "../helpers";
// Components
import EntryList from "../components/EntryList";
import Drawer from "../components/Drawer";

const useStyles = makeStyles((theme) => ({
  button: {
    // margin: theme.spacing(1),
  },
}));

function ReportPage(props) {
  const classes = useStyles();
  const context = useContext(AppContext);
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [entryTime, setEntryTime] = useState(Date.now());
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
  const handleDateChange = (date) => {
    setEntryTime(date);
    setEntry({ ...entry, time: formatAMPM(date) });
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
      <div className="report-section">
        <Drawer />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h1 className="report-header">
              {context.currentReport.title} Details
            </h1>
          </Grid>
          <Grid container>
            <Grid container>
              <form id="entry-form" onSubmit={handleSubmit}>
                <Grid item xs={12}>
                  <MuiPickersUtilsProvider
                    id="time-picker"
                    utils={DateFnsUtils}
                  >
                    <KeyboardTimePicker
                      margin="normal"
                      label="Time picker"
                      value={entryTime}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change time",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    // fullWidth
                    className="entry-input"
                    name="body"
                    label="What happened?"
                    multiline
                    rows={4}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
              </form>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                id="entry-button"
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
                className="generate-button"
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
    </div>
  );
}
export default withRouter(ReportPage);
