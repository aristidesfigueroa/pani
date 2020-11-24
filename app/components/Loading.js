// Componente para REUTILIZABLE PARA MOSTRAR VISTA DE 
//    --------------------
//    |                  |
//    |   CARGANDO...... |
//    |                  | 
//    --------------------
// Recibe como parámetro isVisible=true text""El texto que desee= Cargando, Aguerde, recuperando etc"



import React from "react";
import {StyleSheet, View, Text, ActivityIndicator} from "react-native";
import { Overlay } from 'react-native-elements';

export default function Loading( props ) {
    
    const { isVisible, text } = props;
    return(
        <Overlay
        isVisible = {isVisible}
        windowBackgroundColor = "rgba(0, 0, 0, 0.5)"
        overlayBackgroundColor ="tranparent"
        overlayStyle={styles.overlayMy}
        >
            <View style={styles.viewMy} >
                <ActivityIndicator size="large" color="#00a680" />
                {text && <Text style={styles.textMy} >{text}</Text>}                
            </View>
        </Overlay>
    )
}

// Creando estilos

const styles = StyleSheet.create({
    overlayMy: {
        height: 100,
        width: 200,
        backgroundColor: "#fff",
        borderColor: "#00a680",
        borderWidth:2,
        borderRadius:10,
    },
    viewMy: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",            
    },
    textMy: {
        color: "#00a680",
        textTransform: "uppercase",
        marginTop: 10,
    },

});
