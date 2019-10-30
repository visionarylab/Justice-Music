var mongoose = require('mongoose');
var validator = require('validator');

var userSchema = mongoose.Schema({
    email: {
        type: String,
        trim: true,
        index: {
            unique: true,
            partialFilterExpression: { email: {$type: 'string'}}
        },
        validate:{
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email',
            isAsync: false
          }
    },
    name: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
        index: {
            unique: true,
            partialFilterExpression: {phone: {$type: 'string'}}
        },
        validate:{
            validator: validator.isMobilePhone,
            message: '{VALUE} is not a valid mobile phone',
            isAsync: false
          }
    },
    is_confirm_email: {
        type: Boolean,
        default: false,
    },
    password_hash: {
        type: String,
        trim: true,
        require: true,
    },
    status_id: {
        type: Number,
        default: 1,
    },
    avatar: {
        type: String,
        trim: true,
        default: "QmXwrePcDqV2YR1xyJU4mpxadaQgHHMLsitBgWtZS2c9Zn"
    },
    birthday: {
        type: Date,
    },
    genre: {
        type: Number,
        default: 1,
    },
    date_created: {
        type: Date,
        default: Date(Date.now()),
    },
    date_updated: {
        type: Date,
        default : Date(Date.now()),
    },
    socketID: {
        type: String,
        trim: true,
    },
    refreshToken: {
        type: String,
        trim: true,
    },
    personInbox: [String],
    privateKey: {
        type: String,
        trim: true,
    },
    addressEthereum: {
        type: String,
        trim: true,
    },
    folow: {
        type: Number,
        default: 0,
    },
    otherInfomaion: {
        type: Object
    }
});

userSchema.pre('save', next => {
    if(this.isNew || this.isModified) {
        this.date_updated = Date(Date.now());
    }
    return next();
});

module.exports = mongoose.model('User', userSchema);