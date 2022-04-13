import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {RootState} from '../store';
import {useSelector} from 'react-redux';
import {calculateFinalScore} from '../store/selectors';

const ResultScreen = () => {
  const finalScore = useSelector(calculateFinalScore);
  const name = useSelector((state: RootState) => state.login.name);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Congratulations, {name}!</Text>
      <Text style={styles.text}>Your score:</Text>
      <Text style={styles.scoreText}>{finalScore} points</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  scoreText: {
    fontSize: 20,
    color: '#4D96FF',
    fontWeight: '700',
  },
});

export default ResultScreen;
