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
        setUser: (state, action: PayloadAction<UserState>) => {
            state = action.payload;
        },
        clearUser: (state) => {
            state = initialState;
        },
        updateUser: (state, action: PayloadAction<UserState>) => {
            state = { ...state, ...action.payload };
        },
    },
});

export const { setUser, clearUser, updateUser } = userSlice.actions;

export default userSlice.reducer;


