import { styled } from "styled-components";
import React, { useState, useEffect } from 'react';


const FourTilesCOntainer = styled.div`
    width:25vw;
    display:flex;
    padding:2em 1em;
    border-top:2em;
    justify-content:space-around;
`

const Tile = styled.div`
    width:10vw;
    aspect-ratio:1;
    border-radius:50%;
    background-color: ${ ({color}) => color === 1 ? 'red' : 'blue'};
    box-shadow: ${ ({ win}) => win ? '#e2d19a 0 0 8px 5px;' : 'none'};
    margin:0.2em;
`

const FourTiles = () => {
  const [tileColors, setTileColors] = useState([1, 2, 1, 2]);
  const [winning, setWinning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {

      const changeColor = () => {
        const newTiles = tileColors.map(_=> Math.floor(Math.random() * 2) + 1)
        if (newTiles === tileColors) changeColor()
        return newTiles
      }

        const newTileColors = changeColor()

    

      setTileColors(newTileColors);

      setWinning(
        newTileColors[0] === newTileColors[1] &&
        newTileColors[0] === newTileColors[2] &&
        newTileColors[0] === newTileColors[3]
      );
    }, 1500); // <-- adjust time here

    return () => clearInterval(interval);
  }, []);

    return ( 
        <FourTilesCOntainer >
        {tileColors.map((tile, index) => <Tile color={tileColors[index]} win={winning} key={index}/>)}
    </FourTilesCOntainer> );
}
 
export default FourTiles;