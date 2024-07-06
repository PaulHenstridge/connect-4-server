import Button from "./Button";
import { styled } from "styled-components";

const ButtonContainer = styled.div`
    display:flex;
    justify-content: space-between;
    padding:0 1em;
`
const ColumnButtons = ({boardArr, onColumnSelect}) => {
    return ( <ButtonContainer>
    {boardArr[0].map((_, index) => <Button key={index} index={index} onColumnSelect={onColumnSelect}/>)}
    </ButtonContainer> );
}
 
export default ColumnButtons;