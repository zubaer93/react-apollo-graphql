import ApolloClient from 'apollo-boost';
import React, { useState } from 'react';
import { render } from 'react-dom';
import { gql } from "apollo-boost";
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ApolloProvider } from '@apollo/react-hooks';


const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
  });

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h2>Twisker Assignment</h2>
    </div>
    <ExchangeRates></ExchangeRates>
  </ApolloProvider>
);

const GET_MESSAGE = gql`
  query fetchMessage {
    message
  }
`;

const CHANGE_MESSAGE = gql`
    mutation updateMessage($message: String!) {
        updateMessage(message: $message)
    }
`;

function ExchangeRates() {
    const [message, setMessage] = useState('')

    const { loading, error, data } = useQuery(GET_MESSAGE);
    const [updateMessage, { error2 }] = useMutation(CHANGE_MESSAGE, {
        variables: { message }, refetchQueries: ["fetchMessage"]
    });

    if (error2) {
        console.log('error: ', error)
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div className="App">
            <input
                onChange={e => setMessage(e.target.value)}
            />
            <button onClick={updateMessage}>Update Message</button>
            <div>
                <strong>{data.message}</strong>
            </div>            
        </div>
    );
  }

render(<App />, document.getElementById('root'));