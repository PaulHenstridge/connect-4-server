import {signUpUser, logInUser} from "../services/auth.js"

const authController = () => {

    const signUp = async (playerName, email, password) => {
        const {data,error} = await signUpUser(email, password)

        if(!error){
            // get id from DB and use in app
            const playerId = data.user.id
            return ({playerName, playerId})

            const response = controller.enterLobby(playerName, playerId, socket.id);
            
            console.log("SignUp event response ", response)
            socket.emit("newPlayerObject", response.newPlayer);
            io.emit('enterLobbyResponse', response);

        }
    }

    const logIn = (email, password) => {
        const {data, error} = await logInUser(email, password)
        console.log('data,error in LOGIN', data, error)

        // TODO - get values form data to produce player object
        if(!error){
            return {playerId:data.user.id}
        } else {
            console.error(error.message)
        }
    }
}