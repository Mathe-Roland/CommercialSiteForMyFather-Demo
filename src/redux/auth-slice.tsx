import { Token } from "@mui/icons-material";
import { createSlice ,PayloadAction} from "@reduxjs/toolkit";

type authState={
    value:{
        isLoggedIn: boolean;
        Token: string;
    }
}

const initialState={
    value:{
        isLoggedIn: false,
        Token: '',}
} as authState;


export const auth= createSlice({
    name:'auth',
    initialState,
    reducers:{
        setLogin: (state, action: PayloadAction<{ isLoggedIn: boolean; }>) => {
            state.value.isLoggedIn = action.payload.isLoggedIn;
        },

        setToken: (state, action: PayloadAction<string>) => {
            state.value.Token = action.payload; 
        
        },

        setLogout: (state) => {
            state.value.isLoggedIn = false;
            state.value.Token = '';
        }
    }
})


export const {setLogin,setToken,setLogout} = auth.actions;
export default auth.reducer;