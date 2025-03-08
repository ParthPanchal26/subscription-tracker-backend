import mongoose from "mongoose";

const subscriptionSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 30,
        trim: true,
        required: [true, `Subscription's name is required!`],
    },
    price: {
        type: Number,
        trim: true,
        required: [true, `Subscription's price is required!`],
        default: 0,
    },
    currency: {
        type: String,
        enum: ['INR', 'USD', 'EUR'],
        required: [true, `Subscription's currency type is required!`],
        default: `INR`,
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
    },
    category: {
        type: String,
        enum: ['sports', 'news', 'entertainment', 'lifestyle', 'technology', 'finance', 'politics', 'other'],
        required: true,
        default: 'other',
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active',
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value <= new Date()
            },
            message: 'Start date must be in tha past!',
        }
    },
    renewalDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value > this.startDate
            },
            message: 'Renual data must be after start date!',
        }
    },
    subscriber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }
}, { Timestamp: true })

subscriptionSchema.pre('save', function (next) {
    if (!this.renewalDate) {
        const renewalPeriod = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriod[this.frequency])
    }

    if(this.renewalDate < new Date()) {
        this.status = 'expired'
    }

    next();
})

export const Subscription = mongoose.model('Subscription', subscriptionSchema);