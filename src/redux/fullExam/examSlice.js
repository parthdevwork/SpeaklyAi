import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { fetchQuestions, fetchVideo } from './examApi';

const initialState = {
  questions: [],
  video:[]
};

export const examSlice = createSlice({
  name: 'exam',
  initialState,
  reducers: {
   
    getQuestions: (state, action) => {
      state.questions = action.payload;
    },
    
  },
});

// Action creators are generated for each case reducer function
export const {  getQuestions } = examSlice.actions;

export const fetchQuestionThunk = (part, token)=>async(dispatch)=>{
   const data =  await fetchQuestions(part, token);
   console.log(data,'data');
   dispatch(getQuestions(data));
}


export default examSlice.reducer;
