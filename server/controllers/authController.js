import {signUpUser, logInUser} from "../services/auth.js"

const authController = () => {

    const signUp = async (playerName, email, password) => {
        const {data,error} = await signUpUser(email, password)

        if(error){
            return {error}
        } else {
            // get id from DB and use in app
            const playerId = data.user.id
            return ({playerName, playerId})
        }
    }


    const logIn = async (email, password) => {
        const {data, error} = await logInUser(email, password)
        console.log('data,error in LOGIN', data, error)

        // TODO - get values form data to produce player object
        if(error){
        return{error}
        } else {
            const playerId = data.user.id
            return ({ playerId})
        }
        
    }
    
    return {signUp, logIn}
}
export default authController();