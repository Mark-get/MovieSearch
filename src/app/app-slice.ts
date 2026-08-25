import { createSlice } from '@reduxjs/toolkit'
const appSlice = createSlice({
    name: 'app',
    initialState:  {
        themeMode: "light" as ThemeMode
    },
    selectors: {
        selectThemeMode: (state) => state.themeMode
    },

    reducers: (create)=> ({
        changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
            state.themeMode = action.payload.themeMode
        }),
    }),
})

export const appReducer = appSlice.reducer
export const { selectThemeMode} = appSlice.selectors
export const {changeThemeModeAC} = appSlice.actions
export { appSlice }
export type ThemeMode = "dark" | "light"