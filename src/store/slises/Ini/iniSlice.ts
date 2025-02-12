import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { initialState } from "@/store/slises/Ini/constants";

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export const iniSlice = createSlice({
  name: "ini",
  initialState,
  reducers: (/*create*/) => ({
    /*setTokenPair: create.reducer<IDummyAuthRefreshResponse>((state, action) => {
              state.accessToken = action.payload.accessToken;
              state.refreshToken = action.payload.refreshToken;
            }),
            unsetTokenPair: create.reducer<void>(state => {
              state.accessToken = undefined;
              state.refreshToken = undefined;
            }),
            setMe: create.reducer<IDummyAuthMeResponse>((state, action) => {
              state.authMe = action.payload;
            }),
            setCurrentUserById: create.reducer<number>((state, action) => {
              state.currentUser = state.usersAll?.find(
                (user: { id: number }) => user.id === action.payload,
              );
            }),
            unsetMe: create.reducer<void>(state => {
              state.authMe = undefined;
            }),
            setUsersAll: create.reducer<IUser[]>((state, action) => {
              state.usersAll = action.payload;
            }),
        
            setFilteredUsers: create.reducer<IUser[]>((state, action) => {
              state.filteredUsers = action.payload;
            }),
            unsetFilteredUsers: create.reducer<void>(state => {
              state.filteredUsers = undefined;
            }),
            setFilteredRecipes: create.reducer<IRecipe[]>((state, action) => {
              state.filteredRecipes = action.payload;
            }),
            unsetFilteredRecipes: create.reducer<void>(state => {
              state.filteredRecipes = undefined;
            }),
        
            setComboBoxItems: create.reducer<IUsersResponse>((state, action) => {
              state.comboBoxItems =
                action.payload?.users
                  .map(item => ({
                    id: item.id,
                    value: `${item.firstName} ${item.lastName}`,
                    label: `${item.firstName} ${item.lastName}`,
                  }))
                  .sort((a, b) => a.label.localeCompare(b.label)) || [];
            }),*/
  }),
});

export const { ...iniActions } = iniSlice.actions;

export default iniSlice.reducer;
