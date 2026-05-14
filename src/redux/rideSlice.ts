import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RideState {
  currentRide: any | null;
  history: any[];
  availableDrivers: any[];
}

const initialState: RideState = {
  currentRide: null,
  history: [],
  availableDrivers: [],
};

const rideSlice = createSlice({
  name: 'ride',
  initialState,
  reducers: {
    setCurrentRide: (state, action: PayloadAction<any>) => {
      state.currentRide = action.payload;
    },
    setHistory: (state, action: PayloadAction<any[]>) => {
      state.history = action.payload;
    },
    setAvailableDrivers: (state, action: PayloadAction<any[]>) => {
      state.availableDrivers = action.payload;
    },
  },
});

export const { setCurrentRide, setHistory, setAvailableDrivers } = rideSlice.actions;
export default rideSlice.reducer;
