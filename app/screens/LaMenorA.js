// React Native Fetch – To make HTTP API call in React Native
// https://aboutreact.com/react-native-http-networking/

// import React in our code
import React from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

const LaMenorA = () => {

  const getDataUsingGet = () => {
    const url = "http://190.5.111.142:9999/PAGOS_CUSTOM_REST_SERVICES/_ws_getinfosorteos/2/0";
    //GET request
    // fetch('https://jsonplaceholder.typicode.com/posts/1'
    fetch(url, {
      method: 'GET',
      //Request Type
    })
      .then((response) => response.json())
      //If response is in json then in success
      .then((responseJson) => {
        //Success
        alert(JSON.stringify(responseJson));
        console.log(responseJson);
      })
      //If response is not in json then in error
      .catch((error) => {
        //Error
        alert(JSON.stringify(error));
        console.error(error);
      });
  };

  const getDataUsingPost = () => {
    //POST json
    var dataToSend = { title: 'foo', body: 'bar', userId: 1 };
    //making data to send on server
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    //POST request
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST', //Request Type
      body: formBody, //post body
      headers: {
        //Header Defination
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      //If response is in json then in success
      .then((responseJson) => {
        alert(JSON.stringify(responseJson));
        console.log(responseJson);
      })
      //If response is not in json then in error
      .catch((error) => {
        alert(JSON.stringify(error));
        console.error(error);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.container}>
          {/*Running GET Request*/}
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={getDataUsingGet}>
            <Text style={styles.textStyle}>Get Data Using GET</Text>
          </TouchableOpacity>
          {/*Running POST Request*/}
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={getDataUsingPost}>
            <Text style={styles.textStyle}>Get Data Using POST</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 18, textAlign: 'center', color: 'grey' }}>
          Ask Run Time Android Permission{'\n'}React Navigation
        </Text>
        <Text style={{ fontSize: 16, textAlign: 'center', color: 'grey' }}>
          www.aboutreact.com
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 20,
  },
  textStyle: {
    fontSize: 18,
    color: 'white',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#f4511e',
    padding: 10,
    marginVertical: 10,
  },
});

export default LaMenorA;
