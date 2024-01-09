export const loginUser = (accountName, password, onSuccess, onError) => {
    fetch('https://mysocialserver-626bbb68c54b.herokuapp.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: accountName, password: password }),
        credentials : "include"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Login failed');
        }
        return response.json();
    })
    .then(data => {
        //console.log("Login response data:", data);
        onSuccess(data);
    })
    .catch(error => onError(error));
};


/*export const validateLoginLogic = (users, accountName, password) => {
    const user = users.find(user => user.username === accountName && user.address.street === password);
    if (user) {
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('userName', user.username);
        localStorage.setItem('userId', user.id.toString());
        return user;
    } else {
        return null;
    }
};*/
