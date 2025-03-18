import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TeamPerformance {
  points: number;
  position: number;
  wins: number;
  podiums: number;
  fastestLaps: number;
}

interface TeamData {
  teamId: string;
  name: string;
  color: string;
  logo: string;
  drivers: string[];
  performance: TeamPerformance;
  carImage: string;
}

interface TeamState {
  teams: TeamData[];
  selectedTeam: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: TeamState = {
  teams: [],
  selectedTeam: null,
  loading: false,
  error: null,
};

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    setTeams: (state, action: PayloadAction<TeamData[]>) => {
      state.teams = action.payload;
    },
    selectTeam: (state, action: PayloadAction<string>) => {
      state.selectedTeam = action.payload;
    },
    updateTeamPerformance: (state, action: PayloadAction<{ teamId: string; performance: Partial<TeamPerformance> }>) => {
      const team = state.teams.find(t => t.teamId === action.payload.teamId);
      if (team) {
        team.performance = { ...team.performance, ...action.payload.performance };
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    addTeam: (state, action: PayloadAction<TeamData>) => {
      state.teams.push(action.payload);
    },
    removeTeam: (state, action: PayloadAction<string>) => {
      state.teams = state.teams.filter(team => team.teamId !== action.payload);
      if (state.selectedTeam === action.payload) {
        state.selectedTeam = null;
      }
    },
    updateTeamDrivers: (state, action: PayloadAction<{ teamId: string; drivers: string[] }>) => {
      const team = state.teams.find(t => t.teamId === action.payload.teamId);
      if (team) {
        team.drivers = action.payload.drivers;
      }
    },
  },
});

export const {
  setTeams,
  selectTeam,
  updateTeamPerformance,
  setLoading,
  setError,
  addTeam,
  removeTeam,
  updateTeamDrivers,
} = teamSlice.actions;

export default teamSlice.reducer; 