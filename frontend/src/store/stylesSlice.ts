import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FontInfo {
    family: string;
    variants: string;
    letterSpacings: string;
    fontWeight: string;
    url: string;
}

interface StylesState {
  fonts: FontInfo[];
  primaryButton: Record<string, any> | null;
}

const initialState: StylesState = {
  fonts: [],
  primaryButton: null,
};

const stylesSlice = createSlice({
  name: 'styles',
  initialState,
  reducers: {
    setStyles(state, action: PayloadAction<StylesState>) {
      state.fonts = action.payload.fonts;
      state.primaryButton = action.payload.primaryButton;
    },
    clearStyles(state) {
      state.fonts = [];
      state.primaryButton = null;
    },
  },
});

export const { setStyles, clearStyles } = stylesSlice.actions;

export default stylesSlice.reducer;
