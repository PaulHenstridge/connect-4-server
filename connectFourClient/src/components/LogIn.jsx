import { styled } from "styled-components";
import React, { useState } from 'react';


const Container = styled.form`
    border: 2px solid aliceblue;
    padding: 0.6em;
    display: flex;
    flex-direction: column;
`
const LogIn = ({onSignUp, onLogIn}) => {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [newPlayer, setNewPlayer] = useState(true);
    return ( <>   

    <button onClick={() => {
        newPlayer ?
            setNewPlayer(false)
        :
            setNewPlayer(true)
        }
    }
        >{newPlayer ? 'Returning players log in here' : 'new players sign up here'}</button>  
    { newPlayer && <Container>
        <h3>New player sign up </h3>
        <label for='userName'  >User Name</label>
        <input id='userName' value={userName}onChange={e => setUserName(e.target.value)}/>
        <label for='email'  >Email</label>
        <input id='email' value={email}onChange={e => setEmail(e.target.value)}/>
        <label for='password'  >Password</label>
        <input id='password' value={password}onChange={e => setPassword(e.target.value)}/>
        <button 
            onClick={(e) => {
                e.preventDefault()
                onSignUp(userName, email, password)
            }
            }
            >Sign Up!
        </button>
    </Container>}

   {!newPlayer && <Container>
        <h3>Returning player log in </h3>
        <label for='email'  >Email</label>
        <input id='email' value={email}onChange={e => setEmail(e.target.value)}/>
        <label for='password'  >Password</label>
        <input id='password' value={password}onChange={e => setPassword(e.target.value)}/>
        <button 
            onClick={(e) => {
                e.preventDefault()
                onLogIn(email, password)
            }
            }
            >Play!
        </button>
    </Container>}
    </> );
}
 
export default LogIn;