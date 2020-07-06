import React, { useState } from 'react';
import { gql } from "apollo-boost";
import { useQuery, useMutation } from '@apollo/react-hooks';
import styles from './App.module.css';
import { Button, TextareaAutosize } from '@material-ui/core';

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
    
    const [updateMessage] = useMutation(CHANGE_MESSAGE, {
        variables: { message }, refetchQueries: ["fetchMessage"]
    });
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    
    return (
        <div className={styles.textbox}>
            <div className={styles.text}>
                <strong>{data.message}</strong>  
            </div> 
            <div className={styles.textarea}>   
                <TextareaAutosize rowsMax={4} aria-label="empty textarea" placeholder="Insert Text" onChange={e => setMessage(e.target.value)}/>
            </div> 
            <div className={styles.button}>   
                <Button variant="contained" color="primary" onClick={updateMessage}>Update Text</Button> 
            </div>           
        </div>
    );
}

export default TextBox;

  