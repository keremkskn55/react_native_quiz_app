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
  import {setLoginUsername, setLoginPassword, setCurrentUserId} from '../redux/actions/actions';
import { 
    takeNewCurrentUserFromUsers,
    addNewCurrentUser,
} from '../services/LocalStorage';
  

export default function Login({navigation}) {

  const {username, password} = useSelector(state => state.loginReducer);
  const dispatch = useDispatch();

  const loginButton = async () => {
    if (username == "" || password == "") {
      Alert.alert("WARNING", "Please fill all spaces...");
    }
    else {
      var currentId = await takeNewCurrentUserFromUsers(username, password);
      if (currentId == -1) {
        Alert.alert("WARNING", "username or password are wrong...");
      } else {
        await addNewCurrentUser(currentId);
        dispatch(setCurrentUserId(currentId));
        dispatch(setLoginUsername(""));
        dispatch(setLoginPassword(""));
        navigation.navigate("Home");
      }
    }
  }

    const registerButton = () => {
        navigation.navigate('Register');
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
              onChangeText={(value)=>dispatch(setLoginUsername(value))}
              value={username}
              placeholder='Username'
            />
            <TextInput
              style={styles.input}
              onChangeText={(value)=>dispatch(setLoginPassword(value))}
              placeholder='Password'
              value={password}
              secureTextEntry
            />
            <View style={styles.button}>
            <Button
              title='Login'
              color={'#104F55'}
              onPress={loginButton}
            />
          </View>
          </View>
          <View style={styles.register_component}>
            <Text>
              Don't have account? 
            </Text>
            <Pressable
            onPress={registerButton}
            >
              <Text style={styles.register_text_button}>
                Register
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