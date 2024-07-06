const ToggleAI = ({AIOpponent, setAIOpponent}) => {
    return ( <>
    <button onClick={() => setAIOpponent(!AIOpponent)}>AI Opponent {AIOpponent ? 'Activated' : 'Deactivated'} </button>
    </> );
}
 
export default ToggleAI;