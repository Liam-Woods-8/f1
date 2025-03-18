import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoriteDriver {
  driverId: string;
  name: string;
  team: string;
}

interface FavoriteTeam {
  teamId: string;
  name: string;
}

interface UserPreferences {
  favoriteDrivers: FavoriteDriver[];
  favoriteTeams: FavoriteTeam[];
  darkMode: boolean;
  notifications: boolean;
}

interface UserState {
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
    username: string;
    preferences: UserPreferences;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState['user']>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    addFavoriteDriver: (state, action: PayloadAction<FavoriteDriver>) => {
      if (state.user) {
        state.user.preferences.favoriteDrivers.push(action.payload);
      }
    },
    removeFavoriteDriver: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.preferences.favoriteDrivers = state.user.preferences.favoriteDrivers.filter(
          (driver) => driver.driverId !== action.payload
        );
      }
    },
    addFavoriteTeam: (state, action: PayloadAction<FavoriteTeam>) => {
      if (state.user) {
        state.user.preferences.favoriteTeams.push(action.payload);
      }
    },
    removeFavoriteTeam: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.preferences.favoriteTeams = state.user.preferences.favoriteTeams.filter(
          (team) => team.teamId !== action.payload
        );
      }
    },
    toggleDarkMode: (state) => {
      if (state.user) {
        state.user.preferences.darkMode = !state.user.preferences.darkMode;
      }
    },
    toggleNotifications: (state) => {
      if (state.user) {
        state.user.preferences.notifications = !state.user.preferences.notifications;
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const {
  setUser,
  setLoading,
  setError,
  addFavoriteDriver,
  removeFavoriteDriver,
  addFavoriteTeam,
  removeFavoriteTeam,
  toggleDarkMode,
  toggleNotifications,
  logout,
} = userSlice.actions;

export default userSlice.reducer; 