import Slot from "./Slot";
import { styled } from "styled-components";

const RowContainer = styled.div`
    display:flex;
    justify-content: space-between;
    padding: 1em;
`

const Row = ({rowArr}) => {
    return ( <RowContainer>
    {rowArr.map((slotVal, idx) => <Slot value={slotVal} key={idx}/>)}
    </RowContainer> );
}
 
export default Row;