const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            required: true
        },

        domain: {
            type: String,
            required: true
        },

        isHttps: {
            type: Boolean,
            required: true
        },

        riskScore: {
            type: Number,
            required: true
        },

        status: {
            type: String,
            required: true
        },

        reasons: {
            type: [String],
            default: []
        }
    },

    {
        timestamps: true
    }
);

const Url = mongoose.model("Url", urlSchema);

module.exports = Url;