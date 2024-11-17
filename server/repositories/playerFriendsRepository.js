import supabase from "../supabaseClient.js";

// add a friend row
const addFriendToDb = async (playerId, friendId) => {
    const { data, error } = await supabase
  .from('playerfriends')
  .insert([
    { player_id: playerId, friend_id: friendId },
  ])
  .select()

  if (error) {
    console.error('Error adding friend:', error.message);
    return { error };
    }

return { data };
}


// get all friends of a given player

const getAllFriends = async playerId => {
    let { data, error } = await supabase
  .from('playerfriends')
  .select("friend_id")
  // Filters
  .eq('player_id', playerId)

  if (error) {
    console.error('Error fetching friend Ids from DB:', error.message);
    return { error };
}
console.log('data from getAllFriends -', data)
return { friendIds: data };
}


export {addFriendToDb, getAllFriends}
