import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
// import LaMenor from "../screens/LaMenor";

import LaMenorA from "../screens/LaMenorA";


const Stack = createStackNavigator();

export default function LaMenorStack() {

    return(
        <Stack.Navigator>
        <Stack.Screen 
        name="lamenor" 
        component={LaMenorA}
        options={{title:"La Chica"}}
         />
      </Stack.Navigator>
    )
}



