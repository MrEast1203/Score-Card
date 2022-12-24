import { createContext, useContext, useState } from 'react';

const ADD_MESSAGE_COLOR = '#3d84b8';
const REGULAR_MESSAGE_COLOR = '#2b2e4a';
const ERROR_MESSAGE_COLOR = '#fb3640';

const ScoreCardContext = createContext({
  messages: [],
  queryMessage: [],
  table: [],
  table_query: [],

  addCardMessage: () => {},
  addRegularMessage: () => {},
  addErrorMessage: () => {},
  setMessagesEmpty: () => {},
  addRegularMessage_query: () => {},
  addErrorMessage_query: () => {},
  addQueryTable: () => {},
});

const makeMessage = (message, color) => {
  return { message, color };
};

const ScoreCardProvider = (props) => {
  const [messages, setMessages] = useState([]);
  const [queryMessage, setqueryMessage] = useState([]);
  const [table, setTable] = useState([]);
  const [table_query, setTable_query] = useState([]);

  const addCardMessage = (message) => {
    setMessages([...messages, makeMessage(message, ADD_MESSAGE_COLOR)]);
  };

  const addRegularMessage = (ms) => {
    setTable(ms);
  };

  const addErrorMessage = (message) => {
    setMessages([...messages, makeMessage(message, ERROR_MESSAGE_COLOR)]);
  };

  const setMessagesEmpty = (message) => {
    setMessages([makeMessage(message, REGULAR_MESSAGE_COLOR)]);
    setqueryMessage([makeMessage(message, REGULAR_MESSAGE_COLOR)]);
    setTable([]);
    setTable_query([]);
  };

  const addRegularMessage_query = (...ms) => {
    setqueryMessage([
      ...queryMessage,
      ...ms.map((m) => makeMessage(m, REGULAR_MESSAGE_COLOR)),
    ]);
  };

  const addErrorMessage_query = (message) => {
    setqueryMessage([
      ...queryMessage,
      makeMessage(message, ERROR_MESSAGE_COLOR),
    ]);
  };

  const addQueryTable = (ms) => {
    setTable_query(ms);
  };

  return (
    <ScoreCardContext.Provider
      value={{
        messages,
        queryMessage,
        table,
        table_query,
        addCardMessage,
        addRegularMessage,
        addErrorMessage,
        setMessagesEmpty,
        addRegularMessage_query,
        addErrorMessage_query,
        addQueryTable,
      }}
      {...props}
    />
  );
};

function useScoreCard() {
  return useContext(ScoreCardContext);
}

export { ScoreCardProvider, useScoreCard };
