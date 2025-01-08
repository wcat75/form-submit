const functions = require("firebase-functions");
const fetch = require("node-fetch");

exports.proxyToGoogleScript = functions.https.onRequest(async (req, res) => {
    const scriptURL = "https://script.google.com/macros/s/AKfycbyn59g1RWCH0StWyVmB6TcCosno9mSjHJswcl9qlwTodx2TnTrrl0pJvtWqMksf4naK/exec";

    if (req.method === "OPTIONS") {
        res.set("Access-Control-Allow-Origin", "*");
        res.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        res.set("Access-Control-Allow-Headers", "Content-Type");
        res.status(204).send("");
        return;
    }

    try {
        const response = await fetch(scriptURL, {
            method: req.method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req.body),
        });

        // 嘗試解析 JSON
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            res.set("Access-Control-Allow-Origin", "*");
            res.status(200).send(data);
        } else {
            // 返回非 JSON 的內容
            const text = await response.text();
            console.error("Non-JSON response:", text);
            res.set("Access-Control-Allow-Origin", "*");
            res.status(500).send({ error: "Invalid response from Google Apps Script", details: text });
        }
    } catch (error) {
        console.error("Error while proxying request:", error);
        res.status(500).send({ error: "Internal Server Error", details: error.message });
    }
});
