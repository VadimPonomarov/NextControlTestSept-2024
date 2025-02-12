export interface IniState {
  accessToken?: string;
  refreshToken?: string;
  authMe?: IDummyAuthMeResponse;
  comboBoxItems?: IComboBoxItem[];
  usersAll?: IUser[];
  filteredUsers?: IUser[];
  filteredRecipes?: IRecipe[];
  currentUser?: IUser;
}
