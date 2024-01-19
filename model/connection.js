var mongoose = require("mongoose");

var { URL } = require('../constants/constants');


//DATABASE CONNECTIVITY 
mongoose.connect(URL);
var db = mongoose.connection;

// USER SCHEMA
const User = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        validate: {
            validator: function (value) {
                return /^[0-9]{10}$/.test(value);
            },
            message: 'Phone number must be 10 digits long.'
        },
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

});
const users = mongoose.model('User', User);

// Club SCHEMA
const Club = mongoose.Schema({
    Owner_name: {
        type: String,
        required: true
    },
    Owner_Aadhar: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    Club_name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        validate: {
            validator: function (value) {
                return /^[0-9]{10}$/.test(value);
            },
            message: 'Phone number must be 10 digits long.'
        },
        required: true
    },
    password: {
        type: String,
        required: true
    },
    Club_banner: {
        type: String,
        required: true
    },
    Owner_dp: {
        type: String,
        required: true
    },
    Club_docs: {
        type: String,
        required: true
    }

});
const clubs = mongoose.model('Club', Club);


const userprofile = mongoose.Schema({
    ProfileImage: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    interests: {
        type: String,
        required: true
    },
    languages: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    height: {
        type: String,
        required: true
    },
    Working: {
        type: String,
        required: true
    },
    ZodiacSign: {
        type: String,
        required: true
    },
    music: {
        type: String,
        required: true
    },
    hobbies: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    bodyType: {
        type: String,
        required: true
    },
    pet: {
        type: String,
        required: true
    },
    profession: {
        type: String,
        required: true
    }
})
const userprofiles = mongoose.model('userprofile', userprofile)

//ONBOARDING SCHEMA
const OnBoarding = mongoose.Schema({
    uuid: {
        type: String,
        required: true,
    },
    questions: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    OptedOption: {
        type: [String],
        required: true
    }
});
const onboardings = mongoose.model('OnBoarding', OnBoarding);


//Event Model
const Event = mongoose.Schema({
    EventTitle: {
        type: String,
        required: true
    },
    EventPhoto: {
        type: String,
        required: true
    },
    EventDescription: {
        type: String,
    },
    EventDate: {
        type: String,
        required: true
    },
    EventTime: {
        type: String,
        required: true
    },
    EventLocation: {
        type: String,
        required: true
    }
})
const events = mongoose.model('Event', Event);



console.log("Successfully connected to mongodb database...");
module.exports = { db, users, clubs, onboardings, userprofiles, events };