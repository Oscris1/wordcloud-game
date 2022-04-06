import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import CloudArea from '../components/CloudArea';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {useAppDispatch} from '../store';
import {setChecked, calculateFinalScore} from '../store/wordsSlice';

const GameScreen = ({navigation}) => {
  const dispatch = useAppDispatch();
  const words = useSelector((state: RootState) => state.words);

  const pressHandler = () => {
    if (words.checked) {
      dispatch(calculateFinalScore());
      navigation.navigate('Result');
    } else {
      dispatch(setChecked());
    }
  };

  return (
    <SafeAreaView style={styles.appContainer}>
      <View>
        <Text style={styles.header}>{words.question}</Text>
      </View>
      <CloudArea />
      <TouchableOpacity onPress={pressHandler} style={styles.button}>
        <Text style={styles.buttonText}>
          {words.checked ? 'finish game' : 'check answers'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    marginBottom: 5,
  },
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#4D96FF',
    width: 150,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#4D96FF',
    textAlign: 'center',
  },
});

export default GameScreen;
