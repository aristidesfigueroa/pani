import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import ConsultaPremios from "../screens/ConsultaPremios";


const Stack = createStackNavigator();

export default function ConsultaPremiosStack() {

    return(
        <Stack.Navigator>
        <Stack.Screen 
        name="consultapremios" 
        component={ConsultaPremios}
        options={{title:"Consulta Premios"}}
         />
      </Stack.Navigator>
    )
}