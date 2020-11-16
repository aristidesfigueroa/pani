import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import LaMenor from "../screens/LaMenor";


const Stack = createStackNavigator();

export default function LaMenorStack() {

    return(
        <Stack.Navigator>
        <Stack.Screen 
        name="lamenor" 
        component={LaMenor}
        options={{title:"La Chica"}}
         />
      </Stack.Navigator>
    )
}



