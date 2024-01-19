const { db, users, userprofiles } = require('./connection');
const bcrypt = require('bcrypt');
const crypto = require('crypto');



function indexmodel() {

    //user register api
    this.registeruser = async (users, accessToken, callback) => {
        try {

            // PHONE VALIDATION
            if (!/^[0-9]{10}$/.test(users.phone)) {
                callback(false, { "msg": 'Invalid phone number' });
                return;
            }

            const result = await db.collection("users").find().toArray();

            let max_id = 1;

            if (result.length > 0) {
                max_id = Math.max(...result.map(row => row._id));
                users._id = max_id + 1;
            } else {
                users._id = 1;
            }

            let flag = 1;

            if (result.length > 0) {
                flag = result.every(row => !(users.email === row.email || users.phone === row.phone));
            }

            let uuid = crypto.randomUUID();

            if (flag) {
                users.uuid = uuid;
                users.status = 0;
                users.role = "user";
                users.dt = new Date();
                users.Isactive = false;
                users.IsGoogle = false;
                users.IsApple = false;
                users.IsEmailVerified = false;
                users.isLiked = false;
                users.isDisLiked = false;
                users.isSuperLiked = false;
                users.token = accessToken;
                users.otp = '';

                // INSERTING DATA INTO DATABASE
                const hash = await bcrypt.hash(users.password, 10);

                await db.collection("users").insertOne(users);
                await db.collection("users").updateOne(users, { $set: { password: hash } });

                callback(true);
            } else {
                callback(false, { "msg": "" });
            }
        } catch (err) {
            console.error(err);
            callback(false);
        }
    };





    //user login api
    this.userlogin = async (users, callback) => {
        try {
            const result = await db.collection('users').find({ email: users.email }).toArray();

            if (result.length > 0) {
                const user = result[0];
                const dbPassword = user.password;

                const match = await bcrypt.compare(users.password, dbPassword);

                if (!match) {
                    console.log("User credentials not matched");
                    callback(false)
                    return [];
                } else {
                    if (!user.Isactive) {
                        // Activate the user
                        await db.collection('users').updateOne({ email: users.email }, { $set: { Isactive: true } });
                        console.log('User activated.');
                        callback(result, user)
                    }
                    callback(result, user)
                    return result;
                }
            } else {
                console.log('User not found.');
                callback(false, null)
                return [];
            }
        } catch (err) {
            console.log('Error:', err);
            return [];
        }
    };






    //user Profile api
    this.userProfile = async (userprofiles,ProfileImage,accessToken, callback) => {
        try {

            const result = await db.collection("userprofiles").find().toArray();

            let max_id = 1;

            if (result.length > 0) {
                max_id = Math.max(...result.map(row => row._id));
                userprofiles._id = max_id + 1;
            } else {
                userprofiles._id = 1;
            }

            let flag = 1;

            if (result.length > 0) {
                flag = result.every(row => !(userprofiles.email === row.email))
            }

            // let uuid = crypto.randomUUID();

            if (flag) {
                userprofiles.ProfileImage= ProfileImage
                userprofiles.role = "user";
                userprofiles.dt = new Date();
                userprofiles.accessToken = accessToken

                await db.collection("userprofiles").insertOne(userprofiles);

                callback(true);
            } else {
                callback(false, { "msg": "" });
            }
        } catch (err) {
            console.error(err);
            callback(false);
        }
    }







    //user logout api
    this.logout = async (users, callback) => {
        try {
            const result = await db.collection('users').find({ email: users.email }).toArray();

            if (result.length > 0) {
                const user = result[0];
                const dbPassword = user.password;
                const match = await bcrypt.compare(users.password, dbPassword);

                if (!match) {
                    console.log("User credentials not matched");
                    return callback([]);
                }

                const updateResult = await db.collection("users").updateOne({ email: users.email }, { $set: { Isactive: false } });
                callback(updateResult);
            } else {
                console.log('User not found.');
                callback([]);
            }
        } catch (error) {
            console.log('Error while logout:', error);
            callback(false);
        }
    };






    //delete user api
    this.deleteuser = async (users, callback) => {
        try {
            const result = await db.collection('users').deleteOne({ email: users.email });

            if (result.length > 0) {
                const user = result[0];
                const dbPassword = user.password;

                const match = await bcrypt.compare(user.password, dbPassword);

                if (!match) {
                    console.log("user credentials not matched");
                    return [];
                } else {
                    callback(result);
                    return result;
                }
            } else {
                console.log('User not found.');
                return [];
            }
        } catch (err) {
            console.log(err);
            return [];
        }
    };






    this.storeLocation = async (uuid, locationData, callback) => {
        try {
            await db.collection("users").updateOne({ uuid: uuid }, { $set: { location: locationData } });
            callback(true);
        } catch (error) {
            console.error('Error storing location:', error);
            callback(false);
        }
    };



    // this.getUserPhotos = async (userphotos, image1, image2, image3, image4, accessToken, callback) => {
    //     try {
    //         const result = await db.collection("userphotos").find().toArray();

    //         let max_id = 0;
    //         if (result.length > 0) {
    //             max_id = Math.max(...result.map(row => row._id));
    //         }

    //         const flag = result.every(row => userphotos._id !== row._id);

    //         if (flag) {
    //             const uuid = crypto.randomUUID();
    //             userphotos._id = max_id + 1;
    //             userphotos.uuid = uuid;
    //             userphotos.image1 = image1;
    //             userphotos.image2 = image2;
    //             userphotos.image3 = image3;
    //             userphotos.image4 = image4;
    //             userphotos.role = "user";
    //             userphotos.dt = new Date();
    //             userphotos.token = accessToken;

    //             await db.collection("userphotos").insertOne(userphotos);
    //             callback(true);
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     } catch (err) {
    //         console.log(err);
    //         return false;
    //     }
    // };



}

module.exports = new indexmodel();