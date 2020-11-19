import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Compra from "../screens/Compra";


const Stack = createStackNavigator();

export default function CompraStack() {

    return(
        <Stack.Navigator>
        <Stack.Screen 
        name="compra" 
        component={Compra}
        options={{title:"CompraLaGrande"}}
         />
      </Stack.Navigator>
    )
}