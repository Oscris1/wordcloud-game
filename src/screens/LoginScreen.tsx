import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useAppDispatch} from '../store';
import {setName} from '../store/loginSlice';
import {fetchWords} from '../store/wordsSlice';

const LoginScreen = ({navigation}) => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState<string>('');
  const pressHandler = () => {
    dispatch(setName(username));
    navigation.navigate('Game');
  };

  useEffect(() => {
    dispatch(fetchWords());
  }, []);

  return (
    <SafeAreaView style={styles.appContainer}>
      <Text style={styles.header}>WORDCLOUD GAME</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="Enter your nickname here..."
        placeholderTextColor="#000"
      />
      <TouchableOpacity onPress={pressHandler} style={styles.button}>
        <Text style={styles.buttonText}>play</Text>
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
    fontSize: 25,
    fontWeight: '700',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 14,
    width: '60%',
    color: 'black',
    marginBottom: 15,
    fontSize: 12,
  },
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#4D96FF',
    width: 100,
    borderRadius: 8,
  },
  buttonText: {
    color: '#4D96FF',
    textAlign: 'center',
  },
});

export default LoginScreen;
