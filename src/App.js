import ApolloClient from 'apollo-boost';
import React, { useState } from 'react';
import { TextBox } from './components';
import { render } from 'react-dom';

class App extends React.Component {

  render() {
    const client = new ApolloClient({
        uri: 'http://localhost:3000/graphql',
    });

    return (
      <ApolloProvider client={client}>
      <div>
        <h2>Twisker Assignment</h2>
      </div>
      <TextBox></TextBox>
      </ApolloProvider>
    )
  }
}

export default App;
