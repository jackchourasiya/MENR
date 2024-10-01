import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token:'',
  datas: [],
}

export const userSlice = createSlice({
  name: 'loginuser',
  initialState,
  reducers: {
    LoginUserData: (state,action) => {
        state.datas = action.payload
    },
    Token:(state,action) => {
      state.token = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { LoginUserData,Token } = userSlice.actions

export default userSlice.reducer