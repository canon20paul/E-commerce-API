
const register = async (req, res) => {
    res.send('register User')
};
const login = async (req, res) => {
    res.send('login User')
};
const logout = async (req, res) => {
    res.send('logout User')
};


module.exports = {register, login, logout};