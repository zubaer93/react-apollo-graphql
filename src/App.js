import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import TextBox from './Textbox';
import styles from './App.module.css';


const client = new ApolloClient({
  uri: window.location.href+'graphql',
});

const App = () => {
    return (
      <ApolloProvider client={client}>
      <div className={styles.container}>
          <h2>Twisker Assignment</h2>
      </div>
      <TextBox></TextBox>
      </ApolloProvider>
    )
}

export default App;
