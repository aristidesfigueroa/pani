import { StatusBar } from 'expo-status-bar';
import React from "react";
import { StyleSheet  ,View, Text, Image, ScrollView, ActivityIndicator} from "react-native";
import { Icon } from 'react-native-elements';

export default class LaMenor extends React.Component {


    constructor( props ) { 
        super(props);        
            this.state = {
              __error: "",
              isLoading : true,
              _sorteo: "",
              _fecha_sorteo: "",
              _vencimiento_sorteo: "",
              _premios_menor: [],
             }
  }


  consultaLaChica () {
    console.log('ConsultaLaChica();');

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
      console.log(error.message); 
      this.setState({
        isLoading: true,
        __error: error.message,              
      })      

    });

  }


  componentDidMount () {

    console.log('LA CHICA DID MOUNT');
    this.consultaLaChica();    

  }

  render(){

    if (this.state.isLoading && this.state.__error === "Network request failed") {

      let _error = 
        ( <View>          
           <Text style={styles.textA}> Solicitud de red fallida </Text>   
           <Text></Text>          
          </View>
        );

      return (
        <ScrollView  style={styles.myViewBody}>
          <Image 
              source={require("../../assets/img/logo-chica.png")}
              resizeMode="contain"
              style={styles.myImageErorr}
          />
          {_error}
          
          <View style={styles.myBtnView}>
              {/* <Button
                title="Recargar"
                icon=
                buttonStyle={styles.myBtn}
                containerStyle={styles.myContainer}
                // onPress={() => myNavigation.navigate("login")}
                onPress={() => console.log('Recargar')}
              />               */}
              <Icon
                raised                
                name='reload'
                // size= "30"
                type="material-community"
                color='#2AC218'                
                onPress={() => this.consultaLaChica()}
               />


          </View>
       </ScrollView>

        // {/* <View >
        //   <Image 
        //       source={require("../../assets/img/logo-chica.png")}             
        //       resizeMode="contain"
        //       style={styles.myImage}              
        //   />
        //   {/* <ActivityIndicator />       */}
        //      {_error}
        //   <StatusBar style="auto" />

        // </View>  */}

      );
      
    }else{      

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
        marginLeft: 0,
        marginRight: 0,
    }, 
    myImage: {
        height: 100,    
        width:"100%",
        marginBottom:20,                      
    }, 
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
        
    },

    // Styles for SOLITUD DE RED FALLIDA
    myViewBody: {
      marginLeft: 5,
      marginRight: 5,
    },
    myImageErorr: {
      height: 100,
      width:"100%",
      marginBottom:20,                   
    },    
    textA: {
      fontWeight: "bold",    
      fontSize: 19,
      marginBottom: 10,
      textAlign: "center", 
      color: "#2AC218",    
    },
    myBtnView: {
      flex: 1,
      alignItems: "center",
    },
    myBtn: {
      backgroundColor: "#ffbb33",
  },
    
});

