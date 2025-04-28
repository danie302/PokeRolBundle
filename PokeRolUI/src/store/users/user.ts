import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    id: string;
    username: string;
    name: string;
    email: string;
}

const initialState: UserState = {
    id: '',
    username: '',
    name: '',
    email: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (_state, action: PayloadAction<UserState>) => {
            return action.payload;
        },
        clearUser: () => {
            return initialState;
        },
        updateUser: (state, action: PayloadAction<UserState>) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { setUser, clearUser, updateUser } = userSlice.actions;

export default userSlice.reducer;


