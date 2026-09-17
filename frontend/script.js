async function analyzeURL() {

    const urlInput = document.getElementById("urlInput");

    const url = urlInput.value;

    if (url === "") {
        alert("Please enter a URL");
        return;
    }

    document.getElementById("loading").style.display = "block";
    document.getElementById("result").style.display = "none";

    try {

        const response = await fetch(
            "http://localhost:5000/api/url/analyze",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    url: url
                })
            }
        );

        const data = await response.json();

        const result = data.result;


        document.getElementById("domain").textContent =
            result.domain;

        document.getElementById("https").textContent =
            result.isHttps ? "Yes" : "No";

        document.getElementById("riskScore").textContent =
            result.riskScore + "/100";

        document.getElementById("status").textContent =
            result.status;


        const reasonsList =
            document.getElementById("reasons");

        reasonsList.innerHTML = "";


        result.reasons.forEach(function(reason) {

            const li = document.createElement("li");

            li.textContent = reason;

            reasonsList.appendChild(li);

        });


        document.getElementById("result").style.display = "block";

    } catch (error) {

        console.log(error);

        alert("Could not connect to backend");

    } finally {

        document.getElementById("loading").style.display = "none";

    }
}