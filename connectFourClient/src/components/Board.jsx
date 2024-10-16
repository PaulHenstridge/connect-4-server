import ColumnButtons from "./ColumnButtons";
import Row from "./Row";
import { styled } from "styled-components";


const BoardContainer = styled.section`
    width:80vw;
    border:2px solid white;
    background-color: #191818;

`

const Board = ({boardArr, onColumnSelect}) => {


    return (<BoardContainer>
        {boardArr.map((rowArr, idx) => <Row rowArr={rowArr} key={idx} onColumnSelect={onColumnSelect}/>)}  
    </BoardContainer>
    )
}
 
export default Board;