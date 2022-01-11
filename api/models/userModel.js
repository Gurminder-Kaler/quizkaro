const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = Schema({
    _id: Schema.Types.ObjectId,
    role: { type: String, required: true },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        default: null,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    accountType: {
        type: String,
        enum: ['business', 'general'],
        required: true,
    },
    userName: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    dob: {
        type: Date,
        default: null
    },
    mobileNo: {
        type: String,
        trim: true,
        unique: true
    },
    uniqueId: {
        type: Number,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: 0
    },
    otp: {
        type: Number,
        default: null
    },
    provider: {
        type: String,
        enum: ['googleSignIn', 'mobileSignUp'],
        required: true,
    },
    about: {
        type: String,
    },
    profession: {
        type: Schema.Types.ObjectId,
        ref: 'Profession'
    },
    location: {
        type: String,
    },
    gender: {
        type: String,
        trim: true,
        enum : ['male','female','other'],
    },
    maritalStatus: {
        type: String,
        trim: true,
        enum : ['single','window','married'],
        default: 'single'
    },
    visibleTo: {
        type: String,
        trim: true,
        enum : ['public','friends_only', 'only_me'],
        default: 'public'
    },
    hideFriendList: {
        type: Boolean,
        default: false
    },
    lockChatBox: {
        type: Boolean,
        default: false
    },
    requestsFromPublic: {
        type: Boolean,
        default: true
    },
    requestsFromMutuals: {
        type: Boolean,
        default: true
    },
    blockAllFriendRequests: {
        type: Boolean,
        default: false
    },
    blockedUserIds: {
        type: Array,
        default: null
    },
    showFriendsOnTimeline : {
        type: Boolean,
        default: true
    },
    showProfessionOnTimeline : {
        type: Boolean,
        default: true
    },
    showCityNameOnTimeline : {
        type: Boolean,
        default: true
    },
    organisation: {
        type: String,
    },
    memberOf: {
        type: String,
    },
    visited: {
        type: String,
    },
    workedAt: {
        type: String,
    },
    workingFor: {
        type: String,
    },
    campaign: {
        type: String,
    },
    visited: {
        type: String,
    },
    from: {
        type: String,
    },
    alternateContactNo: {
        type: String,
    },
    link: {
        type: String,
    },
    alternateEmail: {
        type: String,
    },
    site: {
        type: String,
    },
    coverPic: {
        type: String,
    },
    profilePic: {
        type: String,
    },
    countryCode: {
        type: String,
        default: '+91'
    },
    company: {
        type: String,
        trim: true,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    reasonForDeleting: {
        type: String,
        default: null
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: null
    },
    deletedAt: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model('User', userSchema);