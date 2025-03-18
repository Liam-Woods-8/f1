import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DriverPerformance {
  points: number;
  position: number;
  wins: number;
  podiums: number;
  fastestLaps: number;
  qualifyingRecord: {
    q1: number;
    q2: number;
    q3: number;
  };
}

interface DriverData {
  driverId: string;
  name: string;
  number: number;
  team: string;
  nationality: string;
  image: string;
  performance: DriverPerformance;
  age: number;
  experience: number; // Years in F1
}

interface DriverState {
  drivers: DriverData[];
  selectedDriver: string | null;
  comparisonDrivers: string[]; // Array of driver IDs being compared
  loading: boolean;
  error: string | null;
}

const initialState: DriverState = {
  drivers: [],
  selectedDriver: null,
  comparisonDrivers: [],
  loading: false,
  error: null,
};

const driverSlice = createSlice({
  name: 'driver',
  initialState,
  reducers: {
    setDrivers: (state, action: PayloadAction<DriverData[]>) => {
      state.drivers = action.payload;
    },
    selectDriver: (state, action: PayloadAction<string>) => {
      state.selectedDriver = action.payload;
    },
    addToComparison: (state, action: PayloadAction<string>) => {
      if (!state.comparisonDrivers.includes(action.payload)) {
        state.comparisonDrivers.push(action.payload);
      }
    },
    removeFromComparison: (state, action: PayloadAction<string>) => {
      state.comparisonDrivers = state.comparisonDrivers.filter(id => id !== action.payload);
    },
    clearComparison: (state) => {
      state.comparisonDrivers = [];
    },
    updateDriverPerformance: (state, action: PayloadAction<{ driverId: string; performance: Partial<DriverPerformance> }>) => {
      const driver = state.drivers.find(d => d.driverId === action.payload.driverId);
      if (driver) {
        driver.performance = { ...driver.performance, ...action.payload.performance };
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    addDriver: (state, action: PayloadAction<DriverData>) => {
      state.drivers.push(action.payload);
    },
    removeDriver: (state, action: PayloadAction<string>) => {
      state.drivers = state.drivers.filter(driver => driver.driverId !== action.payload);
      if (state.selectedDriver === action.payload) {
        state.selectedDriver = null;
      }
      state.comparisonDrivers = state.comparisonDrivers.filter(id => id !== action.payload);
    },
    updateDriverTeam: (state, action: PayloadAction<{ driverId: string; team: string }>) => {
      const driver = state.drivers.find(d => d.driverId === action.payload.driverId);
      if (driver) {
        driver.team = action.payload.team;
      }
    },
  },
});

export const {
  setDrivers,
  selectDriver,
  addToComparison,
  removeFromComparison,
  clearComparison,
  updateDriverPerformance,
  setLoading,
  setError,
  addDriver,
  removeDriver,
  updateDriverTeam,
} = driverSlice.actions;

export default driverSlice.reducer; 