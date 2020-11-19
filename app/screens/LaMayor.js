import { StatusBar } from 'expo-status-bar';
import React from "react";
import { StyleSheet  ,View, Text, Image, ScrollView, ActivityIndicator} from "react-native";
import { Icon } from 'react-native-elements';


export default class LaMayor extends React.Component {


    constructor( props ) { 
        super(props);        
            this.state = {              
              __error: "",
              isLoading : true,
              _sorteo: "",
              _fecha_sorteo: "",
              _vencimiento_sorteo: "",
              _premios_mayor: [],
            }
  }

  consultaLaGrande () {

    console.log('ConsultaLaGrande();');

    return fetch('http://190.5.111.142:9999/PAGOS_CUSTOM_REST_SERVICES/_ws_getinfosorteos/1/0')
    .then(( response ) => response.json() )
    .then((reponseJson) => {

      this.setState({
        isLoading: false,
        _sorteo: reponseJson.sorteo,
        _fecha_sorteo: reponseJson.fecha_sorteo,
        _vencimiento_sorteo: reponseJson.vencimiento_sorteo,
        _premios_mayor: reponseJson.premios,        
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

    console.log('DID LA MAYOR DID-MOUNT');

    this.consultaLaGrande();    

  }

  

  render(){    

    if (this.state.isLoading && this.state.__error === "Network request failed") {

        let _error = 
        ( <View>          
           <Text style={styles.textA} > Solicitud de red fallida </Text>
           <Text></Text>             
          </View>
        );   

      return (
        // <ScrollView centerContent={true} style={styles.myViewBody}>
        <ScrollView  style={styles.myViewBody}>
          <Image 
              source={require("../../assets/img/logo-grande.png")}
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
                color='#ffbb33'                
                onPress={() => this.consultaLaGrande()}
               />


          </View>
       </ScrollView>

      );
      
    }else{      

      let encabezado = 
       (<View   style={styles.item}>
           <Text style={styles.textE}> Sorteo: {this.state._sorteo} </Text>  
           <Text style={styles.textE}> Jugado: {this.state._fecha_sorteo} </Text>
           <Text style={styles.textE}> Caduciad Premios: {this.state._vencimiento_sorteo} </Text>             
        </View>
       );

            

      let premiosMayor = this.state._premios_mayor.map((val, key) => {
        return <View key={key}  style={styles.item}>
                <Text>{val.numero} {val.pago_premio}</Text>               
                </View>

      });

      return (
        <ScrollView style={styles.myScroll}>
        <Image 
              source={require("../../assets/img/logo-grande.png")}              
              resizeMode="contain"
              style={styles.myImage}              
          />
          <View style={styles.container}>
            {encabezado}
            {/* <Text> Sorteo  #: {sorteo}  style={styles.textA}</Text>
            <Text> Juagado  : {fechaSorteo} style={styles.textA}</Text>
            <Text> Caducidad de Premios  : {fechaVencimiento} style={styles.textA}</Text> */}
            {premiosMayor}        
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
        marginBottom:10,                              
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
        borderBottomColor: "#ffbb33",
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
      color: "#ffbb33",    
    },
    textE: {
      fontWeight: "bold",    
      fontSize: 15,
      marginBottom: 10,
      textAlign: "center", 
      color: "#ffbb33",    
    },
    myBtnView: {
      flex: 1,
      alignItems: "center",
    },
    myBtn: {
      backgroundColor: "#ffbb33",
  },
    

});

