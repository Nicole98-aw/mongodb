require('../src/db/mongoose');
const User = require('../src/models/user');

// User.findByIdAndUpdate('5db2f3b96da2571b40a91947', { age: 19 }).then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 19 }); //countDocument counts the number of documents updated
// }).then((result) => {
//     console.log(result);
// }).catch((e) => {
//     console.log(e);
// });

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments({ age });
    return count;
};

updateAgeAndCount('5db2f3b96da2571b40a91947', 21).then((count) => {
    console.log(count);
});