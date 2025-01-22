import { toolbarMinHeight } from "@ui";
import { create } from "zustand";

type SetState<T> = (prev: (prevFooterHeight: T) => T) => void;

interface LayoutState {
  footerHeight: number;
  setFooterHeight: SetState<number>;
}

export const useLayoutStore = create<LayoutState>((set, get) => ({
  footerHeight: toolbarMinHeight,
  setFooterHeight: (prev) => {
    const footerHeight = prev(get().footerHeight);
    set({ footerHeight });
  },
}));
