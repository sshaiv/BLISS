const { db, clubs, events } = require('./connection');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const createTokens = require('../utils/JWT');
const { EMAIL, PASS, authOTPKEY, SSID, AUth_TOKEN, PhoneNumber } = require('../constants/constants');

function clubmodel() {

    // REGISTER CLUB API
    this.registerClub = async (clubs, Club_banner, Club_docs, Owner_dp, password, accessToken, callback) => {
        try {
            const val = await db.collection("clubs").find().toArray();
            console.log(val);
            var result = val;
            let max_id = 0;
            if (result.length > 0) {
                max_id = Math.max(...result.map((row) => row._id));
            }
            clubs._id = max_id + 1;

            let flag = 1;
            if (result.length > 0) {
                for (let row of result) {
                    if (clubs.email == row.email) {
                        flag = 0;
                        break;
                    }
                }
            }
            let uuid = crypto.randomUUID();
            if (flag == 1) {
                clubs.uuid = uuid;
                clubs.Club_Banner = Club_banner;
                clubs.Club_Docs = Club_docs;
                clubs.Owner_DP = Owner_dp;
                clubs.status = 0;
                clubs.role = "Club Owner";
                clubs.dt = new Date();
                clubs.Isactive = false;
                clubs.IsEmailVerified = false;
                clubs.token = accessToken;
                clubs.otp = '';

                const hash = await bcrypt.hash(password, 10);
                clubs.password = hash;

                await db.collection("clubs").insertOne(clubs);
                callback(true);
            } else {
                callback(false);
            }
        } catch (err) {
            console.log(err);
            callback(false);
        }
    };






    // DELETE CLUB API
    this.clubDelete = async (email, callback) => {
        try {
            const result = await db.collection('clubs').deleteOne({ email: email });
            if (result.deletedCount > 0) {
                callback(true); // Club deleted successfully
            } else {
                console.log('Club not found.');
                callback(false); // Club not found
            }
        } catch (err) {
            console.log(err);
            callback(false); // Error occurred
        }
    }






    this.addEvent = async (events, eventImage, accessToken, callback) => {
        try {
            const val = await db.collection("events").find().toArray();
            console.log(val);
            var result = val;
            let max_id = 0;
            if (result.length > 0) {
                max_id = Math.max(...result.map((row) => row._id));
            }
            events._id = max_id + 1;

            let flag = 1;
            if (result.length > 0) {
                for (let row of result) {
                    if (events.location == row.location || events.time == row.time) {
                        flag = 0;
                        break;
                    }
                }
            }
            let uuid = crypto.randomUUID();
            if (flag == 1) {
                events.uuid = uuid;
                events.eventImage = eventImage;
                events.dt = new Date();
                events.token = accessToken;

                await db.collection("events").insertOne(events);
                callback(true);
            } else {
                callback(false);
            }
        } catch (err) {
            console.log(err);
            callback(false);
        }
    }

}

module.exports = new clubmodel();