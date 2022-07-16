import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Pressable,
} from 'react-native';
import { removeCurrentUser, fetchCurrentUserInfoFromUsers } from '../services/LocalStorage';
import {useSelector, useDispatch} from 'react-redux';
import {
  setCurrentUserId,
  getQuestion,
} from '../redux/actions/actions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useIsFocused } from "@react-navigation/native";


export default function Home({navigation}) {

  const isFocused = useIsFocused();

  const {questions} = useSelector(state => state.questionReducer);
  const {user_id} = useSelector(state => state.currentUserIdReducer);
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [total_score, setTotalScore] = useState(0);
  const [amount_quiz, setAmountQuiz] = useState(0);
  

  const logOutButton = async() => {
    await removeCurrentUser();

    navigation.navigate("Login");
  }

  const fetchCurrentUserInfoFromLocalStorage = async() => {
    var userInfoMap = await fetchCurrentUserInfoFromUsers(user_id);
    setUsername(userInfoMap.username);
    setTotalScore(userInfoMap.total_score);
    setAmountQuiz(userInfoMap.amount_quiz);
  }

  const quizButton = async () => {
    await dispatch(getQuestion());
    navigation.navigate("Question");
  }

  const arrangementButton = () => {
    navigation.navigate("Arrangement");
  }

  useEffect(() => {
    if (isFocused) {
      fetchCurrentUserInfoFromLocalStorage();
    }
    
  }, [isFocused, navigation])

    return (
        <View style={styles.body}>
          <View>
            <View style={styles.logout}>
              <Pressable
              onPress={logOutButton}
              >
                <MaterialIcons
                  name={'logout'}
                  color={'black'}
                  size={24}
                />
              </Pressable>
            </View>

            <View style={styles.topComponents}>
              <Image
              style={styles.image}
                source={{uri: 'http://cdn.onlinewebfonts.com/svg/img_238906.png'}}
              />

              <View style={styles.username_score}>
                <View>
                  <Text style={styles.usernameTitle}>Username</Text>
                  <Text style={styles.username}>{username}</Text>
                </View>
                <View>
                  <Text style={styles.usernameTitle}>Total Score</Text>
                  <Text style={styles.username}>{total_score}</Text>
                </View>
              </View>
            </View>
          </View>


          <View style={styles.allButtons}>
            <Pressable
            onPress={arrangementButton}
            style={styles.arrangementTableButton}>
              <Text style={styles.arrangementText}>Arrangement</Text>
            </Pressable>

            <Pressable
            onPress={quizButton}
            style={styles.quizButton}
            >
              <Text style={styles.arrangementText}>Take Quiz</Text>
            </Pressable>
          </View>
        </View>
      );
}

const styles = StyleSheet.create({
    body: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
    },
    logout: {
      alignSelf: 'flex-end',
    },
    image: {
      width: 120,
      height: 100,
    },
    topComponents: {
      width: '100%',
      flexDirection: 'row',
      paddingTop: 16,
      paddingBottom: 16,
      justifyContent: 'space-evenly',
    },
    usernameTitle: {
      size: 28,
      color: '#000',
      fontWeight: 'bold',
      paddingLeft: 4,
    },
    username: {
      paddingLeft: 9,
    },
    username_score: {
    justifyContent: 'space-evenly',
    },
    arrangementTableButton:{
      width: '100%',
      height: '30%',
      backgroundColor: '#00000080',
      borderRadius: 16,
      marginTop: 16,
      marginBottom: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    arrangementText: {
      color: '#fff',
      fontSize: 24,
    },
    allButtons: {
      width:'100%',
    },
    quizButton: {
      width: '100%',
      height: '25%',
      backgroundColor: '#00000090',
      borderRadius: 16,
      marginTop: 16,
      marginBottom: 8,
      alignItems: 'center',
      justifyContent: 'center',
    }
  });