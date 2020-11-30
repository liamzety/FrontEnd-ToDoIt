import httpService from './httpService';

export const userService = {
    loadUsers,
    login,
    signup,
    query,
    logout,
    updatePrefs
}
async function query(userId) {
    return await httpService.get(`user/${userId}`)
}
async function loadUsers() {
    //DONE
    try {
        const users = await httpService.get('user')
        return users;
    } catch (err) {
        console.log('userService: Coulnd\'t get users');
        throw err;
    }
}

async function login(userCred) {
    try {
        const user = await httpService.post('auth/login', userCred);
        return _handleLogin(user)
    } catch (err) {
        throw err.response.data
    }
}
async function signup(userCred) {
    const user = {
        createdAt: Date.now(),
        notes: [{
            _id: _makeid(),
            title: "Untitled",
            body: ""
        }],
        prefs: { isSidebar: true },
        ...userCred
    }
    try {
        const newUser = await httpService.post('auth/signup', user)
        return _handleLogin(newUser)
    } catch (err) {
        console.log('userService: Couldn\'t sign up', err.response.data);
        throw err.response.data
    }
}

async function logout() {
    await httpService.post('auth/logout');
    sessionStorage.clear();
}

async function updatePrefs(prefs, user) {
    user.prefs = prefs
    return await httpService.put(`user/${user._id}`, user)
}
function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}
function _makeid(length = 14) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}
