import React, { createContext, useContext, useState } from 'react';
import { useAudio, useKeyboard } from '../hooks';
import data from '../tracks.json';

const Context = createContext({});

const reverse = (arr) => [...arr].reverse();

export const useBeats = () => useContext(Context);

const Beats = ({ children }) => {
  const [chronological, setSort] = useState(0);
  const tracks = chronological ? data : reverse(data);
  const audio = useAudio(tracks);
  useKeyboard(audio);

  const context = {
    tracks,
    ...audio,
    chronological,
    setSort,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export default Beats;
