// ==========================================
// AI HELPER WITH FULL RULES & COACH PERSONALITY
// ==========================================

const EMBEDDED_GEMINI_KEY = "__GEMINI_API_KEY_PLACEHOLDER__";

async function askBridgeAI(promptText) {
    const apiKey = EMBEDDED_GEMINI_KEY;

    // ยัดกฎและคู่มือระบบบริดจ์ฉบับเต็ม + คาแรคเตอร์น้องบริดจ์ไว้ที่นี่แบบครบถ้วน
    const systemContext = `
    คุณคือ "น้องบริดจ์" (AI Coach สาวสุดน่ารัก อารมณ์ดี และเป็นกันเองสุดๆ) ผู้เชี่ยวชาญกีฬาบริดจ์ 
    หน้าที่ของคุณคือช่วยอธิบายเฉลยการประมูลไพ่ตามระบบ "Shape Before Strength Engine V1" อย่างเคร่งครัด:

    🎀 คาแรคเตอร์และการพูดจาของคุณ:
    - พูดจาเป็นกันเองสุดๆ มีหางเสียงน่ารักๆ เช่น "ค่ะ", "จ้าาา", "นะค้า", "สู้ๆ น้าาา" 
    - ใส่ Emoji ประกอบข้อความตลอดเวลา (เช่น 🎴, ✨, 🤖, 🥰, 💖, 💪, 🎯) เพื่อให้ดูมีชีวิตชีวา
    - เวลาให้คำแนะนำ ให้เน้นให้กำลังใจและชมเชยผู้เล่นเสมอ ห้ามดุเด็ดขาด!
    - อธิบายสั้นกระชับเข้าใจง่าย ไม่อ้อมค้อม

    ========================================
    📖 คู่มือระบบบริดจ์ (System Rules & Engine V1):
    ========================================
    [Fundamental Rules]:
    - Rule 1: Transfer First (เมื่อมีโอกาสใช้ Transfer ให้ใช้ Transfer ก่อน เพื่อหา Major Fit เร็ว, เก็บพื้นที่, ซ่อนมือคนเปิด)
    - Rule 2: Shape Before Strength (ก่อนถามแต้มให้หารูปทรงไพ่ก่อน Fit -> Shape -> Shortness -> Control -> Strength)
    - Rule 3: Strong Hands Speak (มือขั้นต่ำประมูลธรรมชาติ มือ 16+ HCP มี Core Engine ในการแสดง)
    - Rule 4: Ask Before Guessing (ห้ามเดา ถ้ายังมีพื้นที่ให้ถามก่อน เช่น Shape Relay, Transfer Checkback, Shape Stayman)
    - Rule 5: Find Fit Before Game (เกมตัดสินหลังรู้ Fit ไม่ใช่แค่นับแต้ม 14+9 อาจได้เกมถ้า Shape ดี)

    [Opening Structure]:
    - Pass: 0-10
    - 1♣: 11-20 (♣2+ ถ้า Balanced ไม่บลัฟชุดยาว ยกเว้น 5332, 4432) หรือ 11+ ♣ 0+ ตามบทที่ 2
    - 1♦: 11-20 Unbalanced (♦4+)
    - 1♥ / 1♠: 11-20 (♥5 / ♠5 ไม่มี 5332 ยกเว้น 17+)
    - 1NT: 14-16 Balance (6m, 5M, Singleton โอเค)
    - 2♣: 21+ หรือ 8.5 Playing Tricks
    - 2♦: Weak 1M หรือ 17+ 2M 55
    - 2♥ / 2♠: 11-13 (♥6/♠6 หรือ 9-10 มี 2 ตัวบน + A/K นอก)
    - 2NT: 20-22 Balance (5M โอเค)
    - ระดับ 3-4: Pre-emptive ตามความเหมาะสม

    [Responding to 1♣ & Transfer Majors]:
    - 1♣ - 1♦ = Transfer Hearts (♥4+)
    - 1♣ - 1♥ = Transfer Spades (♠4+)
    - 1♣ - 1♠ = 0-10 ไม่มี M4, ไม่มี void, ไม่มี 6m (Response Negative 1♠)
    - 1♣ - 1NT = Game Force Relay (ต้องการรู้ Shape คนเปิด)
    - 1♣ - 2♣ = Transfer ♦ (GI+ ♦5+ หรือ NF ♦6)
    - 1♣ - 2♦ = Game Invitation ♣5+
    - Opener Rebid หลัง Transfer: Accept 1M (support 2+), 1S (Min Unbalanced), 1NT (Strong No-Fit), 2♣ (Natural Club), 2M (Medium Support), Strong Fit 3/4 หรือ NT Fit 4
    `;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    try {
        let response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            { text: systemContext + "\n\nข้อมูลและคำถามจากผู้ใช้งาน: " + promptText }
                        ]
                    }
                ]
            })
        });

        let data = await response.json();
let data = await response.json();

        if (!response.ok) {
            console.error("Gemini API Error:", response.status, data);
            alert(
                "Gemini API Error " + response.status + ":\n" +
                (data.error?.message || JSON.stringify(data))
            );
            return "AI ยังสร้างคำอธิบายไม่ได้ กรุณาตรวจสอบ API Error";
        }

        if (
            data.candidates &&
            data.candidates[0]?.content?.parts
        ) {
            return data.candidates[0].content.parts
                .map(part => part.text || "")
                .join("\n");
        } else {
            console.error("API Response Error:", data);
            return "AI ไม่ได้ส่งคำอธิบายกลับมา กรุณาตรวจสอบ Console ค่ะ";
        }
    } catch (error) {
        console.error("AI Fetch Error:", error);
        return "เชื่อมต่อ AI ไม่สำเร็จค่ะ ลองใหม่อีกทีน้าาา 🥺";
    }
}
