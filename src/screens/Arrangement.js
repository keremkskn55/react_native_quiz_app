import React, {useEffect, useState} from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
  import {fetchAllUsers} from '../services/LocalStorage';
  import { useIsFocused } from "@react-navigation/native";
  
export default function Arrangement({navigation}) {

    const isFocused = useIsFocused();

    const [listOfAllUsers, setListOfAllUsers] = useState([]);

    const fetchAllUsersArrangement = async() => {
        var allUsers = await fetchAllUsers();
        setListOfAllUsers(allUsers);
    }

    useEffect(() => {
        if (isFocused) {
            fetchAllUsersArrangement();
        }
    }, [navigation, isFocused]);

    return <View style={styles.body}>
            <Text style={styles.arrangementTitle}>Arrangement Page</Text>
            <FlatList
            data={listOfAllUsers}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
                <View style={styles.anItemComponent}>
                    <View style={{alignItems: 'center', flexDirection: 'row'}}>
                        <View style={styles.indexBackground}>
                            <Text style={styles.index}>{index + 1}</Text>
                        </View>
                        <Text>{item.username}</Text>
                    </View>
                    <Text>{item.total_score}</Text>
                </View>
            )}
            />
        </View>
}

const styles = StyleSheet.create({
    body: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    arrangementTitle: {
        fontSize: 32,
        color: '#000',
        marginBottom: 32,
    },
    anItemComponent: {
        flexDirection: 'row',
        width: '75%',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: '#000',
        borderWidth: 1,
        marginBottom: 16,
        marginTop: 16,
        paddingRight: 8,
        borderRadius: 16,
    },
    indexBackground: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 40,
        backgroundColor: '#00000035',
        padding: 8,
        margin: 8,
        borderRadius: 32,
    },
    index: {
        color: '#fff',
    },
  });