import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 20px;
  background-color: lightgray;
  border-radius: 10px;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 100%;
  background-color: red;
  width: ${({ width }) => width}%;
  transition: width 0.1s linear;
`;

const Countdown = ({onEndGame}) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev > 0 ? prev - 1 : 0));
    }, 80); // <-- adjust time here


    return () => clearInterval(interval);
  }, []);

  return (
    <ProgressBarContainer>
      <ProgressBar width={progress} />
    </ProgressBarContainer>
  );
};

export default Countdown;
