
import supabase from "../supabaseClient.js"



    // add a player
const insertPlayer = async (player) => {
    const { data, error } = await supabase
  .from('Player')
  .insert([
    {
        playerId: player.playerId,
        player_name: player.playerName,
        games_played: player.gamesPlayed,
        wins:player.wins
    },
  ])
  .select()

  console.log('insert DB response', data || error)
}



// update a player
const updatePlayer = async (player) => {
    const { data, error } = await supabase
  .from('Player')
  .update({ 
    games_played: player.gamesPlayed,
    wins: player.wins
 })
  .eq('playerId', player.playerId)
  .select()

  console.log('update DB response', data || error)

}

// remove a player


// return all players


// return a single player by id

const getPlayerById = async playerId => {
  let { data: player, error } = await supabase
  .from('Player')
  .select('*')
  .eq('playerId', playerId)
  .single();

if (error) {
  console.error('Error fetching player:', error.message);
  return null;
}
return player;
}



export{ insertPlayer, updatePlayer, getPlayerById };
