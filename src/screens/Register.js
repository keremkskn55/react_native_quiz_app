import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    Pressable,
    Alert,
  } from 'react-native';
  import {useSelector, useDispatch} from 'react-redux';
  import {
    setRegisterUsername,
    setRegisterPassword,
    setRegisterPasswordAgain,
    setCurrentUserId,
  } from '../redux/actions/actions';
  import { 
    addNewUser,
    takeNewCurrentUserFromUsers,
    addNewCurrentUser,
} from '../services/LocalStorage';

  

export default function Register({navigation}) {

  const {username, password, passwordAgain} = useSelector(state => state.registerReducer);
  const dispatch = useDispatch();


    const loginButton = () => {
        navigation.navigate("Login");
    }

    const registerButton = async () => {
      console.log("result is: " + username + " " + password + " " + passwordAgain);
      if (username == "" || password == "" || passwordAgain == ""){
        Alert.alert("WARNING", "Please fill all spaces...");
      } else if (password != passwordAgain) {
        Alert.alert("Warning", "Passwords don't match...");
      } else {
        try {
          await addNewUser(username, password);
          var currentId = await takeNewCurrentUserFromUsers(username, password);
          await addNewCurrentUser(currentId);
          dispatch(setCurrentUserId(currentId));
          navigation.navigate("Home");
        } catch (error) {
          console.log(error);
        }
      }
    }

    return (
        <View style={styles.body}>
          <View>
            <Image
            style={styles.image}
              source={{uri: 'http://cdn.onlinewebfonts.com/svg/img_238906.png'}}
            />
            <Text style={styles.text}>
              QUIZ APP
            </Text>
          </View>
          <View style={styles.all_inputs}>
            <TextInput
              style={styles.input}
              placeholder='Username'
              onChangeText={(value) => dispatch(setRegisterUsername(value))}
            />
            <TextInput
              style={styles.input}
              placeholder='Password'
              secureTextEntry
              onChangeText={(value) => dispatch(setRegisterPassword(value))}
            />
            <TextInput
              style={styles.input}
              placeholder='Password'
              secureTextEntry
              onChangeText={(value) => dispatch(setRegisterPasswordAgain(value))}
            />
            <View style={styles.button}>
            <Button
              title='Register'
              color={'#104F55'}
              onPress={registerButton}
            />
          </View>
          </View>
          <View style={styles.register_component}>
            <Text>
              Do have account? 
            </Text>
            <Pressable
            onPress={loginButton}
            >
              <Text style={styles.register_text_button}>
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      );
}

const styles = StyleSheet.create({
    body: {
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      padding: 16,
    },
    image: {
      width: 120,
      height: 100,
    },
    all_inputs:{
      width: '100%',
    },
    input: {
      borderWidth: 1,
      marginTop: 16,
      marginBottom: 8,
      borderRadius: 16,
    },
    text: {
      fontSize: 32,
      color: '#000',
    },
    button: {
      alignSelf: 'flex-end',
      marginRight: 16,
    },
    register_component: {
      flexDirection: 'row',
    },
    register_text_button: {
      color: '#104F55',
      fontSize: 16,
      fontWeight: 'bold',
    }
  });