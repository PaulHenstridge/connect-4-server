import React from 'react';
import { PlayerProvider } from './PlayerContext.jsx';
import { GameProvider } from './GameContext.jsx';
import { LobbyProvider } from './LobbyContext.jsx';
import { ChatProvider } from './ChatContext.jsx';

const CombinedProvider = ({ children }) => {
  return (
    <PlayerProvider>
      <GameProvider>
        <LobbyProvider>
          <ChatProvider>
            {children}
          </ChatProvider>
        </LobbyProvider>
      </GameProvider>
    </PlayerProvider>
  );
};

export default CombinedProvider;
