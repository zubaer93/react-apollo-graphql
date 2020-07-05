import React, { useState } from 'react';
import { gql } from "apollo-boost";
import { useQuery, useMutation } from '@apollo/react-hooks';

const TextBox = () => {
    const [message, setMessage] = useState('')

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

export default TextBox;

  