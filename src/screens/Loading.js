import React, {useState, useEffect} from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { 
    createCurrentUserTable,
    createUsersTable,
    takeCurrentUser,
    dropCurrentUserTable,
    dropUsersTable,
} from '../services/LocalStorage';
import SQLite from 'react-native-sqlite-storage';
import {useSelector, useDispatch} from 'react-redux';
import {
  setCurrentUserId,
} from '../redux/actions/actions';



export default function Loading({navigation}) {
    const {user_id} = useSelector(state => state.currentUserIdReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        createUsersTable();
        createCurrentUserTable();
        navigateBetweenPages();
    }, []);

    const navigateBetweenPages = async() => {
        var currentId = await takeCurrentUser();
        console.log("currentId: " + currentId);
        if (currentId == -1) {
            navigation.navigate("Login");
        } else {
            dispatch(setCurrentUserId(currentId));
            navigation.navigate("Home");
        }
    }

    return(
        <View style={styles.body}>
            <ActivityIndicator size={'large'} color={'104F55'}/>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});