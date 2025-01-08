document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const json = Object.fromEntries(formData.entries());

    const proxyURL = "https://us-central1-weddingtemplatetl.cloudfunctions.net/proxyToGoogleScript"; // 替換為 Firebase Functions URL

    try {
        const response = await fetch(proxyURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(json),
        });

        const result = await response.json();
        if (result.status === "success") {
            alert(result.message);
            form.reset();
        } else {
            alert(`提交失敗: ${result.message}`);
        }
    } catch (error) {
        console.error("提交錯誤：", error);
        alert("提交時發生錯誤，請稍後再試！");
    }
});
