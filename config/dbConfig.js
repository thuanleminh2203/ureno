const mongoose = require('mongoose')

const connectionOptions = { useNewUrlParser: true } 
mongoose.connect('mongodb://vnvc_load_dev:cn8mLu8uXrjHVzgy@207.46.234.134:27717/vnvc_load_dev', connectionOptions , (err) =>{
    if(!err)
        console.log('MongoDB Connection Success')
    else
        console.log('Err in Db Connection ' + err)
})

require('../entity/user')

// module.exports = {
//     User: require('../entity/user')
// };