import supabase from "../supabaseClient.js";

const signUpUser = async(email, password) => {
    const {data, error} = await supabase.auth.signUp({email, password})

    if (error) {
        console.error('Error signing up:', error.message)
        return { data, error }
    } else {
        console.log('Signup successful:', data);
        return { data, error};
      }
}

const logInUser = async (email, password) => {
    const {data, error} = await supabase.auth.signInWithPassword({email, password})

    if (error) {
        console.error('Error logging in:', error.message)
        return { data, error }
    } else {
        console.log('Signup successful:', data);
        return { data, error };
      }
}

export {signUpUser, logInUser}