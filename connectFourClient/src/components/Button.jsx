import { styled } from "styled-components";

const StyledButton = styled.button`
  background-color: #070727;
  color: white;
  padding: 0 0.2em;
  border: none;
  outline:none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 2.2rem;

  &:hover {
    background-color: darkblue;
  }

  &:focus {
    outline:none;
  }
`;


const Button = ({index, onColumnSelect}) => {
    return ( <StyledButton onClick={() => onColumnSelect(index)} >
    <h4>↓</h4>
    </StyledButton> );
}
 
export default Button;