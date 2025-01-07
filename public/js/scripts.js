// scripts.js
document.getElementById('rsvp-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // 防止默認提交行為

    // 收集表單數據
    const formData = {
        relationship: document.getElementById('relationship').value,
        name: document.getElementById('name').value,
        attendance: document.getElementById('attendance').value,
        message: document.getElementById('message').value || ''
    };

    // Google Apps Script Web 部署 URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyn59g1RWCH0StWyVmB6TcCosno9mSjHJswcl9qlwTodx2TnTrrl0pJvtWqMksf4naK/exec';

    try {
        const response = await fetch(scriptURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
    
        // 檢查 HTTP 狀態碼
        if (response.ok) {
            const result = await response.json();
            console.log('提交成功：', result);
            alert('表單提交成功，感謝您的回覆！');
            document.getElementById('rsvp-form').reset();
        } else {
            console.error('提交失敗，HTTP 狀態碼：', response.status);
            alert('提交失敗，請稍後再試！');
        }
    } catch (error) {
        console.error('提交錯誤：', error);
        alert('提交失敗，請稍後再試！');
    }    
});