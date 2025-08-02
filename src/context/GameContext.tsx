"use client";
import { useContext, createContext, ReactNode, useState } from "react";

type GameContextType = {
  currentregion: number[];
  setcurrentregion: (e: number[]) => void;
  countrylist: number[];
  setcountrylist: (e: number[]) => void;
  mapBbox: number[];
  setMapBbox: (e: number[]) => void;
  isitcustom: boolean;
  setisitcustom: (e: boolean) => void;
  isitloading: boolean;
  setisitloading: (e: boolean) => void;
};

const GameContext = createContext<GameContextType | null>(null);

export const GameContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentregion, setcurrentregion] = useState([0, 0]);
  const [countrylist, setcountrylist] = useState<number[]>([
    4, 24, 63, 66, 80, 88, 114, 128, 139, 183, 297, 346, 347, 391, 392, 440,
    441, 515, 580, 636,
  ]);
  const [mapBbox, setMapBbox] = useState<number[]>([2537, 430, 303, 208]);
  const [isitcustom, setisitcustom] = useState(false);
  const [isitloading, setisitloading] = useState(false);
  return (
    <GameContext.Provider
      value={{
        currentregion: currentregion,
        setcurrentregion: setcurrentregion,
        countrylist: countrylist,
        setcountrylist: setcountrylist,
        mapBbox: mapBbox,
        setMapBbox: setMapBbox,
        isitcustom: isitcustom,
        setisitcustom: setisitcustom,
        isitloading: isitloading,
        setisitloading: setisitloading,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("aaa");
  }
  return context;
}
