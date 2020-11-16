import { StatusBar } from 'expo-status-bar';
import React from "react";
import { StyleSheet  ,View, Text, Image, ScrollView, ActivityIndicator} from "react-native";

export default class LaMenor extends React.Component {


    constructor( props ) { 
        super(props);        
            this.state = {
            isLoading : true,
            _sorteo: "",
            _fecha_sorteo: "",
            _vencimiento_sorteo: "",
            _premios_menor: [],
         }
  }


  componentDidMount () {

    return fetch('http://190.5.111.142:9999/PAGOS_CUSTOM_REST_SERVICES/_ws_getinfosorteos/2/0')
    .then(( response ) => response.json() )
    .then((reponseJson) => {

      this.setState({
        isLoading: false,
        _sorteo: reponseJson.sorteo,
        _fecha_sorteo: reponseJson.fecha_sorteo,
        _vencimiento_sorteo: reponseJson.vencimiento_sorteo,
        _premios_menor: reponseJson.premios_menor,
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
        <ScrollView style={styles.myScroll}>
          <View style={styles.container}>  
             <ActivityIndicator />      
             <StatusBar style="auto" />
             </View>
        </ScrollView>
        

      );
      
    }else{


      // let sorteo = this.state._sorteo;
      // let fechaSorteo = this.state._fecha_sorteo;
      // let fechaVencimiento = this.state._vencimiento_sorteo;

      let encabezado = 
       (<View   style={styles.item}>
           <Text> Sorteo: {this.state._sorteo} </Text>  
           <Text> Juagado: {this.state._fecha_sorteo} </Text>
           <Text> Caduciad de Premios: {this.state._vencimiento_sorteo} </Text>             
        </View>
       );

            

      let premiosMenor = this.state._premios_menor.map((val, key) => {
        return <View key={key}  style={styles.item}>
                <Text>{val.numero} {val.clasificacion}</Text>               
                </View>

      });

      return (
        <ScrollView style={styles.myScroll}>
        <Image 
              source={require("../../assets/img/logo-chica.png")}              
              resizeMode="contain"
              style={styles.myImage}
          />
          <View style={styles.container}>
            {encabezado}
            {/* <Text> Sorteo  #: {sorteo}  style={styles.textA}</Text>
            <Text> Juagado  : {fechaSorteo} style={styles.textA}</Text>
            <Text> Caducidad de Premios  : {fechaVencimiento} style={styles.textA}</Text> */}
            {premiosMenor}        
            <StatusBar style="auto" />
          </View>
        </ScrollView>
        
      );

    }    

  }


}




/**
 * STYLES
 */ 
const styles = StyleSheet.create({
    myScroll: {
        marginLeft: 5,
        marginRight: 5,
    }, 
    myImage: {
        height: 200,    
        width:"100%",
        marginBottom:60,                      
    }, 
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textA: {
        fontWeight: "bold",    
        fontSize: 19,
        marginBottom: 10,
        textAlign: "center",     
    },
    item: {
        flex: 5,
        alignSelf: "stretch",
        margin: 10,
        alignItems: "center",
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: "#00a680",
        marginBottom:40,
        // fontSize: 19,
        //     marginBottom: 10,
        //     textAlign: "center", 
        
    }
});

