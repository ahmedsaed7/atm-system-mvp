const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
        validate: {
            validator: function(v) {
                return v >= 0;
            },
            message: 'Amount must be a positive number'
        }
    },
    type: {
        type: String,   
        enum: ['withdraw', 'deposit', 'balance_check', 'pin_change'],
        required: true
    },
    description: {
        type: String,
        default: '' 
    },
    status: {
        type: String,
        enum: ['success', 'failed', 'pending', 'rejected'],
        default: 'pending'
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });


transactionSchema.index({ userId: 1, timestamp: -1 })

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;