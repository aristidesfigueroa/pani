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
              _sorteo: 0,
              _fecha_sorteo: "",
              _vencimiento_sorteo: "",
              _premios_menor: [],
              // _numeroGanador: ([]),
             }
  }

  


  consultaLaChica (sorteo) {
    console.log('ConsultaLaChica();');
    const url = "http://190.5.111.142:9999/PAGOS_CUSTOM_REST_SERVICES/_ws_getinfosorteos/2/";

    return fetch(url+sorteo)
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

  verPremiosDerechoReves () {
    let _numeroDerecho = "";
    let _numeroReves   = "";
    let _textoReturn;
    console.log('verPremiosMenor();');
    let verArray = this.state._premios_menor.map((val, key) => {
      // console.log(val.numero);
      if (val.clasificacion === "NUMERO" && val.tipo === "GANADOR") {
        _numeroDerecho = val.numero;    

      }
      else{
        if (val.clasificacion === "NUMERO" && val.tipo === "REVES") {
          _numeroReves = val.numero;

        }else{
          _numeroReves = _numeroDerecho;

        }

      }
      
    });

    _textoReturn = 
    (
      <View   style={styles.item}>
        <Text style={styles.textG}>{_numeroDerecho} Derecho </Text>
        <Text style={styles.textR}>{_numeroReves} Revés </Text>
        {/* <Text style={styles.textE}> Derecho </Text>                          */}
       </View>
     );

    console.log(_numeroDerecho);
    console.log(_numeroReves);
    

    return _textoReturn;

  }

  verSerieDerecho () {
    let _serieDerecho = "";
    let _serieReves  = [];
    let _textoSerieDerecho;
    console.log('verSeries();');
    let verArray = this.state._premios_menor.map((val, key) => {
      // console.log(val.numero);
      if (val.clasificacion === "SERIE" && val.tipo === "GANADOR") {
        _serieDerecho = val.numero + ' L.' + val.pago_premio;    

      }
      else{
        if (val.clasificacion === "SERIE" && val.tipo === "REVES") {
          _serieReves.push(val.numero + ' L.' + val.pago_premio);

        }

      }
      
    });

    _textoSerieDerecho  = 
    (
      <View   >
        <Text style={styles.textSd}>Derecho {_serieDerecho}</Text>           
       </View>
     );    

    return _textoSerieDerecho;

  }

  verSerieReves () {
    let _serieDerecho = "";
    let _serieReves  = [];
    let _textoSerieReves;
    console.log('verSeries();');
    let verArray = this.state._premios_menor.map((val, key) => {
      // console.log(val.numero);
      if (val.clasificacion === "SERIE" && val.tipo === "GANADOR") {
        _serieDerecho = val.numero + ' L.' + val.pago_premio;    

      }
      else{
        if (val.clasificacion === "SERIE" && val.tipo === "REVES") {
          _serieReves.push(val.numero + ' L.' + val.pago_premio);

        }

      }
      
    });

    _textoSerieReves  = _serieReves.map((val, key) => {
      return <View key={key} >
              <Text style={styles.textSr}> Revés {val}</Text>               
              </View>

    });

    console.log(_serieReves); 
    
    

    return _textoSerieReves;

  }





  componentDidMount () {

    console.log('LA CHICA DID MOUNT');
    this.setState._sorteo = 3293;
    this.consultaLaChica(this.setState._sorteo);    

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

       

      );
      
    }else{      

      let encabezado =   
      // style={styles.item}    
       (<View  >
           {/* <Text style={styles.textE}> Sorteo: {this.state._sorteo} </Text>   */}
           <Text style={styles.textE}> Sorteo Jugado: {this.state._fecha_sorteo} </Text>
           <Text style={styles.textE}> Caduciad Premios: {this.state._vencimiento_sorteo} </Text>             
        </View>
       );
      
       let derechoReves = this.verPremiosDerechoReves();

       let series =   
      // style={styles.item}    
       (<View  >           
           <Text style={styles.textS}> SERIES </Text>                        
        </View>
       );

       let serieDerecho = this.verSerieDerecho();
       let serieReves   = this.verSerieReves();
      

            
      
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
            {derechoReves} 
            {series}
            {serieDerecho}          
            {serieReves}        
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
        borderBottomColor: "#2AC218",
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
    textE: {
      fontWeight: "bold",    
      fontSize: 15,
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
  textG: {
    fontWeight: "bold",    
    fontSize: 30,
    marginBottom: 10,
    textAlign: "center", 
    color: "#2AC218",    
  },
  textR: {
    fontWeight: "bold",    
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center", 
    color: "#2AC218",    
  },
  textS: {
    fontWeight: "bold",    
    fontSize: 25,
    marginBottom: 10,
    textAlign: "center", 
    color: "#2AC218",    
  },
  textSd: {
    fontWeight: "bold",    
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center", 
    color: "#2AC218",    
  },
  textSr: {
    fontWeight: "bold",    
    fontSize: 15,
    marginBottom: 10,
    textAlign: "center", 
    color: "#2AC218",    
  },
    
});

