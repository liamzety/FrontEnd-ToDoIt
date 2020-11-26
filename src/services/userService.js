import httpService from './httpService';

export const userService = {
    loadUsers,
    login,
    signup,
    query,
    logout
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
        notes: [],
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

function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}
