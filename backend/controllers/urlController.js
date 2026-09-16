const analyzeUrl = require("../services/urlAnalyzer");
const Url = require("../models/Url");

const analyzeURL = async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({
                message: "URL is required"
            });
        }

        const result = analyzeUrl(url);

        const savedURL = new Url({
            url: url,
            domain: result.domain,
            isHttps: result.isHttps,
            riskScore: result.riskScore,
            status: result.status,
            reasons: result.reasons
        });

        await savedURL.save();

        res.status(200).json({
            message: "URL analyzed successfully",
            result: result
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
};

module.exports = {
    analyzeURL
};