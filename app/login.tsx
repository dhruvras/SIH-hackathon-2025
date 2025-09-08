import { useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
export default function login() {
    const router = useRouter();
  return (
    <ImageBackground
      source={require("../assets/images/loginbg.png")}
      style={styles.background}>

        <View style={styles.mainframe}>
            <View style={styles.elementframe}>
                <Text style={styles.text}>Login</Text>
                <TextInput placeholder=' username...' style={styles.inputbox}/>
                <TextInput placeholder=' password...' style={styles.inputbox}/>
            </View>
        <View style={styles.signupbutton}>
            <TouchableOpacity onPress={()=>{router.navigate("/home");}}>
                <Text style={styles.textsignup}>Sign Up</Text>
            </TouchableOpacity>
        </View>
        </View>
      
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // cover, contain, stretch
    justifyContent: "center",
  },
  mainframe:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  elementframe:{
    height:250,
    width:300,
    // backgroundColor:'blue',
    alignItems:'center',
    // justifyContent:'center',
    marginTop:100,
  },
  text:{
    fontWeight:'bold',
    fontSize:50,
  },
  inputbox:{backgroundColor:'white', 
    borderRadius:15,
    marginHorizontal:10, 
    width:'90%',
    marginVertical:10,
    borderWidth:4,
    borderColor:'#234307'
  },
  textsignup:{
    fontWeight:'bold',
    fontSize:30,
    padding:10,

  },
  signupbutton:{
    backgroundColor:'#ffc107',
    borderRadius:20,
  }
});