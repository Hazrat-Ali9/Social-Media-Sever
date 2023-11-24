
const User = require('../Model/User')

const addPin = async (email, data) => {
    const tergetUser = await User.findOne(email)
    console.log(tergetUser)
    // const update = await User.updateOne({ _id: id }, { pins: [...tergetUser.pins, data] })
}

const removePin = () => {

}


module.exports = { addPin, removePin }