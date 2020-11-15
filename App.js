import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {

  constructor( props ) {
    super(props);
    this.state = {
      isLoading : true,
      dataSource: null,
    }
  }

  componentDidMount () {

    return fetch('http://190.5.111.142:9999/PAGOS_CUSTOM_REST_SERVICES/_ws_getinfosorteos/2/0')
    .then(( response ) => response.json() )
    .then((reponseJson) => {

      this.setState({
        isLoading: false,
        dataSource: reponseJson.premios_menor,
      })

    })

    .catch((error) => {
      console.log('Entra Here')
      console.log(error);
      if (error === "Network request failed") {
        console.log('NO HAY INTERNET');
        
      }

    });

  }

  render(){

    if (this.state.isLoading) {

      return (
        <View style={styles.container}>  
        <ActivityIndicator />      
        <StatusBar style="auto" />
      </View>

      );
      
    }else{

      let premiosMenor = this.state.dataSource.map((val, key) => {
        return <View key={key}  style={styles.item}>
                <Text>{val.numero} {val.clasificacion}</Text>   
                {/* <Text>{val.clasificacion}</Text>             */}
                </View>

      });

      return (
        <View style={styles.container}>
          {premiosMenor}        
          <StatusBar style="auto" />
        </View>
      );

    }




    

  }
  
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    alignSelf: "stretch",
    margin: 10,
    alignItems: "center",
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: "#00a680"


  }
});




// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Welcome App PANI </Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
