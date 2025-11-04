const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    accountNumber: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10,
        trim: true,
        validate: {
            validator: function(v) {
                return /^[0-9]+$/.test(v);
            },
            message: 'Account number must be a number'
        }
    },
    cardNumber: {
        type: String,
        required: true,
        unique: true,
        minlength: 16,
        maxlength: 16,
        trim: true,
        validate: {
            validator: function(v) {
                return /^[0-9]+$/.test(v);
            },
            message: 'Card number must be a number'
        }
    },
    pin: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0,
        min: 0,
        validate: {
            validator: function(v) {
                return v >= 0;
            },
            message: 'Balance must be a positive number'
        }
    },
    role: {
    type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return validator.isEmail(v);
            },
            message: 'Invalid email address'
        }
    },
    dailyLimit: {
        type: Number,
        default: 4000,
        min: 0,
        validate: {
            validator: function(v) {
                return v >= 0;
            },
            message: 'Daily limit must be a positive number'
        }
    },
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction'
    }],
    age: {
        type: Number,
        default: 18,
        min: 18,
        max: 65,
        validate(value) {
            if (value <= 0) {
                throw new Error('Age must be a positive number');
            }
        }
    }
}, { timestamps: true });

// Hash PIN before saving
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('pin')) {
        return next();
    }
    user.pin = await bcrypt.hash(user.pin, 10);
    console.log("PIN hashed successfully ✅");
    next();
})

//hidden privete  data
userSchema.methods.toJSON = function () { 
    const user = this;
    const userObject = user.toObject();
    delete userObject.pin;
    delete userObject.cardNumber;
    return userObject;
}

//login
userSchema.statics.findByCredentials = async function (accountNumber, pin) {
    const user = await this.findOne({ accountNumber });
    if (!user) {
        throw new Error('Invalid account number');
    }
    const isMatch = await bcrypt.compare(pin, user.pin);
    if (!isMatch) {
        throw new Error('Invalid PIN');
    }
    return user;
}

//Virtual Relations
userSchema.virtual('transactions', {
    ref: 'Transaction', 
    localField: '_id', // حقل في User (ID)
    foreignField: 'userId', // حقل في Transaction
    options: { sort: { createdAt: -1 } } // الأحدث أولًا
});


/**
 * لكود ده فهرسة (indexing): هو بيبني "مؤشر" على الحقول cardNumber و email بس، علشان يسرّع البحث (queries) في قاعدة البيانات. مش بيأثر على الإدخال (input) أو الاستعلامات مباشرة – هو مجرد تحسين أداء.
 */
// Indexing 
userSchema.index({ cardNumber: 1 }); // فهرس تصاعدي لرقم البطاقة (سرعة البحث في login)
userSchema.index({ email: 1 }); // فهرس تصاعدي للـ email (سرعة الإشعارات وتجنب التكرار)

const User = mongoose.model('User', userSchema);

module.exports = User;