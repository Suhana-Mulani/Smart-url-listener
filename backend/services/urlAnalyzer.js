const analyzeUrl = (url) => {

    let parsedURL;

    try {
        parsedURL = new URL(url);
    } catch (error) {
        return {
            valid: false,
            message: "Invalid URL"
        };
    }

    let riskScore = 0;
    let reasons = [];

    const domain = parsedURL.hostname;
    const isHttps = parsedURL.protocol === "https:";

    // Check HTTPS
    if (!isHttps) {
        riskScore += 20;
        reasons.push("URL does not use HTTPS");
    }

    // Check suspicious words
    const suspiciousWords = [
        "login",
        "verify",
        "account",
        "password",
        "update",
        "secure",
        "bank"
    ];

    for (let i = 0; i < suspiciousWords.length; i++) {

        if (url.toLowerCase().includes(suspiciousWords[i])) {
            riskScore += 10;

            reasons.push(
                `Contains suspicious keyword: ${suspiciousWords[i]}`
            );
        }
    }

    // Check if URL is very long
    if (url.length > 100) {
        riskScore += 10;
        reasons.push("URL is unusually long");
    }

    // Check @ symbol
    if (url.includes("@")) {
        riskScore += 20;
        reasons.push("URL contains @ symbol");
    }

    // Check IP address instead of domain
    const ipPattern =
        /^https?:\/\/(\d{1,3}\.){3}\d{1,3}/;

    if (ipPattern.test(url)) {
        riskScore += 25;
        reasons.push("URL uses an IP address instead of a domain");
    }

    // Maximum score
    if (riskScore > 100) {
        riskScore = 100;
    }

    let status;

    if (riskScore >= 60) {
        status = "High Risk";
    } else if (riskScore >= 30) {
        status = "Suspicious";
    } else {
        status = "Low Risk";
    }

    return {
        valid: true,
        domain: domain,
        isHttps: isHttps,
        riskScore: riskScore,
        status: status,
        reasons: reasons
    };
};

module.exports = analyzeUrl;