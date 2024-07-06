import { styled } from "styled-components";

const SlotBox = styled.div`
    border: 1px solid aliceblue;
    padding:0.6em;
    border-radius:50%;
    width:1em;
    aspect-ratio:1;
    background-color:${props => props.value===1 ? 'red' : props.value===2 ? 'blue' : '#333232'}
    
`

const Slot = ({value}) => {
    return ( <>
    <SlotBox value={value}></SlotBox>
    </> );
}
 
export default Slot;