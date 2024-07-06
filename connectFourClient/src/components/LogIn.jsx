import { styled } from "styled-components";
import React, { useState } from 'react';


const LogInContainer = styled.div`
    border: 2px solid aliceblue;
    padding: 0.6em;
`
const LogIn = ({onEnterLobby}) => {

    const [inputValue, setInputValue] = useState('');

    return ( <>
    <LogInContainer>
        <input onChange={e => setInputValue(e.target.value)}/>
        <button 
            onClick={() => onEnterLobby(inputValue)}
            >Enter Lobby
        </button>
    </LogInContainer>
    </> );
}
 
export default LogIn;