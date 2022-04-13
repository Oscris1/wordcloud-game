import {RootState} from './index';
import {createSelector} from '@reduxjs/toolkit';
const words = (state: RootState) => state.words;

export const calculateFinalScore = createSelector(words, state => {
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

  return score;
});
