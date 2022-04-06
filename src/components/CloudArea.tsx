import React from 'react';
import {View, StyleSheet} from 'react-native';
import CloudElement from './CloudElement';
import {RootState} from '../store';
import {useSelector} from 'react-redux';

const CloudArea = () => {
  const data = useSelector((state: RootState) => state.words);
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {data.all_words.map(item => (
          <CloudElement key={item} word={item} />
        ))}
      </View>
    </View>
  );
};

export default CloudArea;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: '50%',
    borderWidth: 2,
  },
  innerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
});
