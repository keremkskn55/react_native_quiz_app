import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Pressable,
  } from 'react-native';
  import {useSelector, useDispatch} from 'react-redux';
  import {
    increaseCorrectCounter,
  } from '../redux/actions/actions';
  

export default function Question({navigation}) {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(-1);
    const [answerList, setAnswerList] = useState([]);

    const {questions} = useSelector(state => state.questionReducer);
    const {correctAmount} = useSelector(state => state.correctAnswerCounterReducer);
    const dispatch = useDispatch();

    const selectAnswerButton = async (currentAnswerIndex, item) => {
        setSelectedAnswerIndex(currentAnswerIndex);
        if (item === questions.results[questionIndex].correct_answer) {
            dispatch(increaseCorrectCounter(correctAmount + 1));
        }
        await delay(1000);
        if (questionIndex == 9) {
            navigation.navigate("Result");
        }
        else {
            setQuestionIndex(questionIndex + 1);
            setSelectedAnswerIndex(-1);
            setAnswerList([...questions.results[questionIndex + 1].incorrect_answers, questions.results[questionIndex + 1].correct_answer].sort(() => Math.random() - 0.5))
        }
    }

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
      );

      useEffect(() => {
        setAnswerList([...questions.results[questionIndex].incorrect_answers, questions.results[questionIndex].correct_answer].sort(() => Math.random() - 0.5));
      }, [])

    return (
        <View style={styles.body}>
            <View>
                <Text style={styles.questionNumber}>{questionIndex + 1} / 10</Text>
                <View style={styles.questionDetailBackground}>
                    <Text style={styles.questionDetail}>{questions.results[questionIndex].question}</Text>
                </View>
            </View>
            <View style={styles.allList}>
                <FlatList
                    data={answerList}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    renderItem={({item, index}) => {
                        if (selectedAnswerIndex === index) {
                            return <Pressable
                            style={(item === questions.results[questionIndex].correct_answer) ? styles.correctAnswerBackground : styles.wrongAnswerBackground}
                            onPress={()=>{selectAnswerButton(index, item)}}
                            >
                                <Text style={styles.answer}>{item}</Text>
                            </Pressable>
                        }
                        return <Pressable
                        style={styles.answerBackground}
                        onPress={()=>{selectAnswerButton(index, item)}}
                        >
                            <Text style={styles.answer}>{item}</Text>
                        </Pressable>
                    }}
                />
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
    questionNumber: {
        fontSize: 24,
    },
    questionDetailBackground: {
        backgroundColor: '#00000060',
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 32,
        paddingBottom: 32,
        borderRadius: 8,
        marginBottom: 8,
        marginTop: 16,
    },
    questionDetail: {
        color: 'white',
    },
    answerBackground: {
        backgroundColor: '#00000040',
        width: '48%',
        marginRight: '1%',
        marginLeft: '1%',
        marginTop: 8, 
        marginBottom: 8,
        height: 80,
        padding: 8,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    correctAnswerBackground: {
        backgroundColor: 'green',
        width: '48%',
        marginRight: '1%',
        marginLeft: '1%',
        marginTop: 8, 
        marginBottom: 8,
        height: 80,
        padding: 8,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrongAnswerBackground: {
        backgroundColor: 'red',
        width: '48%',
        marginRight: '1%',
        marginLeft: '1%',
        marginTop: 8, 
        marginBottom: 8,
        height: 80,
        padding: 8,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    answer: {
        color: '#fff',
    },
    allList: {
        height: 200,
    }
  });