/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 
import React from 'react';
 
import {
  Alert,
  Button,
  TextInput,
  TouchableNativeFeedback,
  View,
} from 'react-native';
 
import RNFS from 'react-native-fs';
import InputScrollView from 'react-native-input-scroll-view';
 
 
const App = () => {
 
  let [url, changeUrl] = React.useState('Please, enter json url here');
  let [file, changeFile] = React.useState('Please, enter file name here');
  let [data, changeData] = React.useState('');
 
  const getJSON = (url) => {
    fetch(url)
      .then((response) => {
        if (response.ok)
          response.text()
            .then(function (text) {
              changeData(text)
            });
        else {
          Alert.alert('Error ' + response.status)
        }
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };
 
  const save = (text) => {
    try {
      JSON.parse(text)
    } catch (e) {
        if (e instanceof SyntaxError) {
          Alert.alert('Invalid JSON');
        }
        return
    }
 
    var path = RNFS.DocumentDirectoryPath + '/' + file;
 
    RNFS.writeFile(path, data, 'utf8')
    .then((success) => {
      Alert.alert('File saved');
    })
    .catch((err) => {
      Alert.alert(err.message);
    });
  }
  
  return (
    <>
      <TextInput
        onChangeText={text => changeUrl(text)}
        value={url}
      />
      <TouchableNativeFeedback>
        <Button
          title="Load"
          onPress={() => getJSON(url)}
        />
      </TouchableNativeFeedback>
 
      <TextInput
        onChangeText={text => changeFile(text)}
        value={file}
      />
      <TouchableNativeFeedback>
        <Button
          title="Save"
          onPress={() => save(data)}
        />
      </TouchableNativeFeedback>
 
      <InputScrollView>
        <View>
          <TextInput
            multiline
            onChangeText={text => changeData(text)} 
            value={data} 
          />
        </View>
      </InputScrollView>
    </>
  );
};
 
export default App;
