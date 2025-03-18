import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LapTime {
  lap: number;
  time: string;
  position: number;
}

interface PitStop {
  lap: number;
  duration: number;
  tireCompound: string;
}

interface RaceData {
  raceId: string;
  raceName: string;
  circuit: string;
  date: string;
  lapTimes: LapTime[];
  pitStops: PitStop[];
  isLive: boolean;
}

interface RaceState {
  currentRace: RaceData | null;
  historicalRaces: RaceData[];
  loading: boolean;
  error: string | null;
}

const initialState: RaceState = {
  currentRace: null,
  historicalRaces: [],
  loading: false,
  error: null,
};

const raceSlice = createSlice({
  name: 'race',
  initialState,
  reducers: {
    setCurrentRace: (state, action: PayloadAction<RaceData>) => {
      state.currentRace = action.payload;
    },
    addHistoricalRace: (state, action: PayloadAction<RaceData>) => {
      state.historicalRaces.push(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    updateLapTime: (state, action: PayloadAction<LapTime>) => {
      if (state.currentRace) {
        state.currentRace.lapTimes.push(action.payload);
      }
    },
    addPitStop: (state, action: PayloadAction<PitStop>) => {
      if (state.currentRace) {
        state.currentRace.pitStops.push(action.payload);
      }
    },
  },
});

export const {
  setCurrentRace,
  addHistoricalRace,
  setLoading,
  setError,
  updateLapTime,
  addPitStop,
} = raceSlice.actions;

export default raceSlice.reducer; 