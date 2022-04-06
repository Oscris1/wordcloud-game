import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

interface WordsState {
  status: 'idle' | 'loading' | 'success' | 'error';
  question: string;
  all_words: string[];
  good_words: string[];
  selected_words: string[];
  checked: boolean;
  final_score: number | null;
}

export const fetchWords = createAsyncThunk('words/fetchWords', async () => {
  const response = await axios.get(
    'https://624b478f44505084bc4f66b8.mockapi.io/api/words',
  );
  const randomElement =
    response.data[Math.floor(Math.random() * response.data.length)];
  return randomElement;
});

const initialState = {
  status: 'idle',
  question: '',
  all_words: [],
  good_words: [],
  selected_words: [],
  checked: false,
  final_score: null,
} as WordsState;

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    setChecked: state => {
      state.checked = true;
    },
    toggleSelectedWord: (state, {payload}) => {
      if (state.selected_words.includes(payload)) {
        const newState = state.selected_words.filter(item => item !== payload);
        state.selected_words = newState;
      } else {
        state.selected_words.push(payload);
      }
    },
    calculateFinalScore: state => {
      let score = 0;

      let selectedWordsCopy = [...state.selected_words];
      state.good_words.map(word => {
        if (state.selected_words.includes(word)) {
          score += 2;
          selectedWordsCopy = selectedWordsCopy.filter(item => item !== word);
        } else {
          score -= 1;
        }
      });
      score -= selectedWordsCopy.length;
      state.final_score = score;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchWords.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchWords.fulfilled, (state, {payload}) => {
        state.status = 'success';
        state.question = payload.question;
        state.all_words = payload.all_words;
        state.good_words = payload.good_words;
      });
  },
});

export const {setChecked, toggleSelectedWord, calculateFinalScore} =
  wordsSlice.actions;
export default wordsSlice;
