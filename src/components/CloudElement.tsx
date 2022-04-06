import React, {useState, useRef} from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {useAppDispatch} from '../store';
import {toggleSelectedWord} from '../store/wordsSlice';

interface Props {
  word: string;
}

const randomIntFromInterval = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const CloudElement: React.FC<Props> = ({word}) => {
  const dispatch = useAppDispatch();
  const checked = useSelector((state: RootState) => state.words.checked);
  const goodWords = useSelector((state: RootState) => state.words.good_words);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const width = useRef(`${randomIntFromInterval(15, 45)}%`);
  const marginTop = useRef(randomIntFromInterval(0, 10));

  const handlePress = () => {
    setIsSelected(prev => !prev);
    dispatch(toggleSelectedWord(word));
  };

  if (checked) {
    return (
      <View
        style={[
          styles.container,
          {minWidth: width.current, marginTop: marginTop.current},
        ]}>
        {isSelected &&
          (goodWords.includes(word) ? (
            <View>
              <Text style={styles.good}>Good</Text>
              <Text style={styles.greenText}>{word}</Text>
            </View>
          ) : (
            <View>
              <Text style={styles.bad}>Bad</Text>
              <Text style={styles.redText}>{word}</Text>
            </View>
          ))}

        {!isSelected && <Text style={styles.text}>{word}</Text>}
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={handlePress}
        style={[
          styles.container,
          {minWidth: width.current, marginTop: marginTop.current},
        ]}>
        <Text style={isSelected ? styles.selectedText : styles.text}>
          {word}
        </Text>
      </TouchableOpacity>
    );
  }
};

export default React.memo(CloudElement);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  text: {
    fontSize: 25,
  },
  greenText: {
    fontSize: 25,
    color: 'green',
  },
  redText: {
    fontSize: 25,
    color: 'red',
  },
  good: {
    color: 'green',
    fontWeight: '700',
  },
  bad: {
    color: 'red',
    fontWeight: '700',
  },

  selectedText: {
    fontSize: 25,
    color: 'gray',
  },
});
