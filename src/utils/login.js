export const loginMock = ({username, password}) => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (username !== 'test') {
            reject({username: ['User is not found']});
        } else if (username === 'test' && password !== 'test') {
            reject({password: ['Incorrect password']});
        } else {
            resolve({
                username,
                token: Date.now(),
                theme: 'light'
            });
        }
    }, 500);
});