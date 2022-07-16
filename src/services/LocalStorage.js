import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
    {
        name: 'MainDB',
        location: 'default',
    },
    () => {},
    error => {console.log(error)}
);

export const createUsersTable = async() => {
    return new Promise((resolve, reject) => {
        db.transaction(async(tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS "+
                "Users "+
                "(user_id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT, img_path TEXT, total_score INTEGER, amount_quiz INTEGER)"
            )
        })
    })
}

export const createCurrentUserTable = async() => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS "+
                "CurrentUser "+
                "(user_id INTEGER PRIMARY KEY)"
            )
        })
    });
}

export const dropUsersTable = async() => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "DROP TABLE Users"
            )
        })
    });
}

export const dropCurrentUserTable = async() => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "DROP TABLE CurrentUser"
            )
        })
    });
}

export const takeCurrentUser = async() => {
    return new Promise((resolve, reject) => {
        db.transaction(async (tx) => {
            tx.executeSql(
                "SELECT user_id FROM CurrentUser",
                [],
                (tx, results) => {
                    var len = results.rows.length;
                    if (len > 0) {
                        resolve(results.rows.item(0).user_id);
                    }
                    else {
                        resolve(-1);
                    }
                }
            );
        });
        
    });
}

export const addNewUser = async (username, password) => {
    console.log("in localStorage, addNewUser... username: " + username + ", password: " + password);
    db.transaction((tx) => {
        tx.executeSql(
            "INSERT INTO Users (username, password, img_path, total_score, amount_quiz) "+
            "VALUES (?, ?, ?, ?, ?)",
            [username, password, "", 0, 0],
        );
    });
    /*
    return new Promise((resolve, reject) => {
        
    });
    */
}

export const takeNewCurrentUserFromUsers = async (username, password) => {
    return new Promise((resolve, reject) => {
        db.transaction(async (tx) => {
            tx.executeSql(
                "SELECT user_id FROM Users WHERE username = ? AND password = ?",
                [username, password],
                async (tx, results) => {
                    var len = results.rows.length;
                    if (len > 0) {
                        resolve(results.rows.item(0).user_id);
                    } else {
                        resolve(-1);
                    }
                }
            );
        });
    });
}

export const fetchCurrentUserInfoFromUsers = async (user_id) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM Users WHERE user_id = ?",
                [user_id],
                (tx, results) => {
                    var len = results.rows.length;
                    if (len > 0) {
                        resolve({"username": results.rows.item(0).username, "total_score": results.rows.item(0).total_score, "amount_quiz": results.rows.item(0).amount_quiz});
                    } else {
                        resolve({"username": "", "total_score": 0, "amount_quiz": 0});
                    }
                }
            );
        });
    });
}

export const addNewCurrentUser = async (user_id) => {
    console.log("Problem is in here and I will fix it...");
    if (user_id != -1) {
        db.transaction(async (tx) => {
            await tx.executeSql(
                "INSERT INTO CurrentUser (user_id) VALUES (?)",
                [user_id],
            );
        })
    }
}

export const removeCurrentUser = async () => {
    db.transaction((tx) => {
        tx.executeSql(
            "DELETE FROM CurrentUser"
        );
    })
}

export const updateCurrentUserQuizInfo = async (user_id, total_score, amount_quiz) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "UPDATE Users SET total_score = ?, amount_quiz = ? WHERE user_id = ?",
                [total_score, amount_quiz, user_id],
                (tx, results) => {
                    resolve("Done YEAH");
                }
            );
    });
    });
}

export const fetchAllUsers = async () => {
    console.log("fetchAllUsers...");
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM Users ORDER BY total_score DESC",
                [],
                (tx, results) => {
                    var len = results.rows.length;
                    if (len > 0) {
                        var temp = [];
                        for (var i = 0; i < len; i++) {
                            temp.push({'username': results.rows.item(i).username, 'total_score': results.rows.item(i).total_score, 'amount_quiz': results.rows.item(i).amount_quiz});
                        }
                        resolve(temp);
                    } else {
                        resolve([]);
                    }
                }
            );
        });
    });
}