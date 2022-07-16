import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
  } from 'react-native';
  import {useSelector, useDispatch} from 'react-redux';
import {
    fetchCurrentUserInfoFromUsers,
    updateCurrentUserQuizInfo,
} from '../services/LocalStorage';
import {increaseCorrectCounter} from '../redux/actions/actions';

export default function Result({navigation}) {

    const {correctAmount} = useSelector(state => state.correctAnswerCounterReducer);
    const {user_id} = useSelector(state => state.currentUserIdReducer);
    const dispatch = useDispatch();

    const goHomeButton = async() => {
        var userInfoMap = await fetchCurrentUserInfoFromUsers(user_id);
        var tempResult = await updateCurrentUserQuizInfo(user_id, (userInfoMap.total_score + correctAmount), (userInfoMap.amount_quiz + 1));
        var userInfoMap = await fetchCurrentUserInfoFromUsers(user_id);
        dispatch(increaseCorrectCounter(0));
        navigation.navigate("Home");
    }

    return (
        <View style={styles.body}>
          <Text style={styles.resultPage}>Result Page</Text>
          <Text style={styles.correctAmount}>Number Of Correct Answer: {correctAmount} !</Text>
          <Button
          onPress={() => {goHomeButton()}}
          title={'Go Home Page'}
          color={'#000000'}
          />
        </View>
      );
}

const styles = StyleSheet.create({
    body: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    resultPage: {
        fontSize: 32,
        color: '#000',
        margin: 24,
    },
    correctAmount: {
        fontSize: 16,
        margin: 16,
    },
  });