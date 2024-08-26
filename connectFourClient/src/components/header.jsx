import { styled } from "styled-components";

const StyledH1 = styled.h1`
    color: yellow;
`

const Header = ({name}) => {
    return ( <>
    <StyledH1>Connect-4</StyledH1>
    {name && <p> {name}</p>}
    </> );
}
 
export default Header;