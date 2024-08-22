import { styled } from "styled-components";
import React, { useState, useEffect } from 'react';


const FourTilesCOntainer = styled.div`
    width:80vw;
    display:flex;
    padding:4em 1em;
    justify-content:space-around;
    background-color: ${ props => props.win && 'yellow'}
`

const Tile = styled.div`
    width:10vw;
    aspect-ratio:1;
    border-radius:50%;
    background-color: ${ props => props.color === 1 ? 'red' : 'blue'};
`

const FourTiles = () => {
  const [tileColors, setTileColors] = useState([1, 2, 1, 2]);
  const [winning, setWinning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTileColors = [
        Math.floor(Math.random() * 2) + 1,
        Math.floor(Math.random() * 2) + 1,
        Math.floor(Math.random() * 2) + 1,
        Math.floor(Math.random() * 2) + 1,
      ];

      setTileColors(newTileColors);

      setWinning(
        newTileColors[0] === newTileColors[1] &&
        newTileColors[0] === newTileColors[2] &&
        newTileColors[0] === newTileColors[3]
      );
    }, 1000); // <-- adjust time here

    return () => clearInterval(interval);
  }, []);

    return ( 
        <FourTilesCOntainer win={winning}>
        {tileColors.map((tile, index) => <Tile color={tileColors[index]}/>)}
    </FourTilesCOntainer> );
}
 
export default FourTiles;