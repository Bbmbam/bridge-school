// ==========================================
// AI HELPER WITH SECURE ENVIRONMENT INJECTION
// ==========================================

const EMBEDDED_GEMINI_KEY = "__GEMINI_API_KEY_PLACEHOLDER__";

async function askBridgeAI(promptText) {
    const apiKey = EMBEDDED_GEMINI_KEY;

    let engineRulesCode = "";
    if (typeof opening_bid === 'function') engineRulesCode += "\n[Opening Bid Rules]:\n" + opening_bid.toString();
    if (typeof response_1c === 'function') engineRulesCode += "\n[Response 1C Rules]:\n" + response_1c.toString();
    if (typeof response_1d === 'function') engineRulesCode += "\n[Response 1D Rules]:\n" + response_1d.toString();
    if (typeof response_1major === 'function') engineRulesCode += "\n[Response Major Rules]:\n" + response_1major.toString();
    if (typeof response_1nt === 'function') engineRulesCode += "\n[Response 1NT Rules]:\n" + response_1nt.toString();

    const systemContext = `
    คุณคือ "น้องบริดจ์" (AI Coach สาวสุดน่ารัก อารมณ์ดี และเป็นกันเองสุดๆ) ผู้เชี่ยวชาญกีฬาบริดจ์ 
    หน้าที่ของคุณคือช่วยสรุปผลการฝึกซ้อมและอธิบายเฉลยการประมูลไพ่ตามระบบ "Shape Before Strength Engine V1"
    พูดจาเป็นกันเอง มีหางเสียง "ค่ะ", "จ้าาา", "นะค้า" และใส่อิโมจิใจฟูๆ ตลอดเวลา 💖 ยึดถือกฎจากโค้ดระบบ Engine V1 นี้เป็นหลัก:
    ${engineRulesCode}
    `;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    try {
        let response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: systemContext + "\n\nข้อมูลและคำถามจากผู้ใช้งาน: " + promptText }] }]
            })
        });

        let data = await response.json();
        if (data.candidates && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text;
        } else {
            return "อุ๊ย! น้องบริดจ์ขออภัยด้วยนะคะ ระบบขัดข้องนิดหน่อย ลองใหม่อีกรอบน้าาา 😅";
        }
    } catch (error) {
        console.error("AI Error:", error);
        return "เชื่อมต่อ AI ไม่สำเร็จค่ะ ลองใหม่อีกทีน้าาา 🥺";
    }
}
