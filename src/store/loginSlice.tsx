import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface LoginState {
  name: string;
}

const initialState = {name: ''} as LoginState;

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setName(state, {payload}: PayloadAction<string>) {
      state.name = payload;
    },
  },
});

export const {setName} = loginSlice.actions;
export default loginSlice;
