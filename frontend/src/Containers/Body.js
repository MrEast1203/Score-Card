import { useState } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

///////////////////////////
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
/////////////////////////

import { useStyles } from '../hooks';
import axios from '../api';
import { useScoreCard } from '../hooks/useScoreCard';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1em;
`;

const StyledFormControl = styled(FormControl)`
  min-width: 120px;
`;

const ContentPaper = styled(Paper)`
  height: 300px;
  padding: 2em;
  overflow: auto;
`;
///////////////////////////

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

//////////////////////////
function createData(name, subject, score) {
  return { name, subject, score };
}

const rows = [createData('Kan', 'Math', 100)];

/////////////////////////

const Body = () => {
  const classes = useStyles();

  const {
    messages,
    queryMessage,
    table,
    table_query,
    addCardMessage,
    addRegularMessage,
    addErrorMessage,
    addRegularMessage_query,
    addErrorMessage_query,
    addQueryTable,
  } = useScoreCard();

  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState(0);

  const [queryType, setQueryType] = useState('name');
  const [queryString, setQueryString] = useState('');
  ///////////////////////////////////////////////
  const [value, setValue] = React.useState(0);

  const handleChange_tap = (event, newValue) => {
    setValue(newValue);
  };
  /////////////////////////////////////////////
  const handleChange = (func) => (event) => {
    func(event.target.value);
  };

  const handleAdd = async () => {
    // console.log('name', name);
    // console.log('subject', subject);
    // console.log('score', score);
    const {
      data: { message, card },
    } = await axios.post('/card', {
      name,
      subject,
      score,
    });

    const {
      data: { messages_query },
    } = await axios.get('/cards_add', {
      params: {
        type: 'name',
        queryString: name,
      },
    });

    if (!card) addErrorMessage(message);
    else addCardMessage(message);

    addRegularMessage(messages_query);
  };

  const handleQuery = async () => {
    const {
      data: { messages, message },
    } = await axios.get('/cards', {
      params: {
        type: queryType,
        queryString,
      },
    });

    if (!messages) addErrorMessage_query(message);
    else {
      addRegularMessage_query(...messages);
      const {
        data: { messages_query },
      } = await axios.get('/cards_add', {
        params: {
          type: queryType,
          queryString,
        },
      });
      addQueryTable(messages_query);
    }
  };

  return (
    <Wrapper>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange_tap}
            aria-label="basic tabs example">
            <Tab label="Add" {...a11yProps(0)} />
            <Tab label="Query" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Row>
            {/* Could use a form & a library for handling form data here such as Formik, but I don't really see the point... */}
            <TextField
              className={classes.input}
              placeholder="Name"
              value={name}
              onChange={handleChange(setName)}
            />
            <TextField
              className={classes.input}
              placeholder="Subject"
              style={{ width: 240 }}
              value={subject}
              onChange={handleChange(setSubject)}
            />
            <TextField
              className={classes.input}
              placeholder="Score"
              value={score}
              onChange={handleChange(setScore)}
              type="number"
            />
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              disabled={!name || !subject}
              onClick={handleAdd}>
              Add
            </Button>
          </Row>
          <ContentPaper variant="outlined">
            {messages.map((m, i) => (
              <Typography
                variant="body2"
                key={m + i}
                style={{ color: m.color }}>
                {m.message}
              </Typography>
            ))}
          </ContentPaper>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Subject</TableCell>
                  <TableCell align="right">Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {table.map((m, i) => (
                  <TableRow
                    key={m + i}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {m.name}
                    </TableCell>
                    <TableCell align="right">{m.subject}</TableCell>
                    <TableCell align="right">{m.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Row>
            <StyledFormControl>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  value={queryType}
                  onChange={handleChange(setQueryType)}>
                  <FormControlLabel
                    value="name"
                    control={<Radio color="primary" />}
                    label="Name"
                  />
                  <FormControlLabel
                    value="subject"
                    control={<Radio color="primary" />}
                    label="Subject"
                  />
                </RadioGroup>
              </FormControl>
            </StyledFormControl>
            <TextField
              placeholder="Query string..."
              value={queryString}
              onChange={handleChange(setQueryString)}
              style={{ flex: 1 }}
            />
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              disabled={!queryString}
              onClick={handleQuery}>
              Query
            </Button>
          </Row>
          <ContentPaper variant="outlined">
            {queryMessage.map((m, i) => (
              <Typography
                variant="body2"
                key={m + i}
                style={{ color: m.color }}>
                {m.message}
              </Typography>
            ))}
          </ContentPaper>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Subject</TableCell>
                  <TableCell align="right">Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {table_query.map((m, i) => (
                  <TableRow
                    key={m + i}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {m.name}
                    </TableCell>
                    <TableCell align="right">{m.subject}</TableCell>
                    <TableCell align="right">{m.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Box>
    </Wrapper>
  );
};

export default Body;
