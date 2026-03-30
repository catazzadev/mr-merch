import { createContext, useContext, useState, ReactNode } from "react";
import { Chapter } from "./chapters";

type ChapterContextType = {
  selectedChapter: Chapter | null;
  setSelectedChapter: (chapter: Chapter | null) => void;
};

const ChapterContext = createContext<ChapterContextType>({
  selectedChapter: null,
  setSelectedChapter: () => {},
});

export function ChapterProvider({ children }: { children: ReactNode }) {
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  return (
    <ChapterContext.Provider value={{ selectedChapter, setSelectedChapter }}>
      {children}
    </ChapterContext.Provider>
  );
}

export function useChapter() {
  return useContext(ChapterContext);
}
