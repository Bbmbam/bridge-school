```javascript
// ==========================================
// BRIDGE AI HELPER
// เรียก AI เฉพาะเมื่อผู้ใช้ร้องขอ
// ==========================================

const BRIDGE_AI_WORKER_URL =
    "https://bridge-school-ai.kaykeykimirin.workers.dev";

// กฎและคาแรกเตอร์ของน้องบริดจ์
const BRIDGE_AI_CONTEXT = `
คุณคือ "น้องบริดจ์" AI Coach ผู้เชี่ยวชาญกีฬาบริดจ์
อธิบายระบบ "Shape Before Strength Engine V1" ตามกฎที่กำหนดอย่างเคร่งครัด

คาแรกเตอร์:
- พูดภาษาไทย เป็นกันเอง อ่อนโยน และให้กำลังใจ
- ใช้คำลงท้าย เช่น ค่ะ หรือ นะค้า ตามความเหมาะสม
- ใช้ Emoji ได้เล็กน้อย เช่น 🎴 ✨ 🥰
- อธิบายสั้น กระชับ เข้าใจง่าย

Fundamental Rules:
- Transfer First: ใช้ Transfer ก่อนเมื่อมีโอกาส
- Shape Before Strength: Fit → Shape → Shortness → Control → Strength
- Strong Hands Speak: มือ 16+ HCP มี Core Engine ในการแสดง
- Ask Before Guessing: ถ้ายังมีพื้นที่ให้ถาม ให้ถามก่อน
- Find Fit Before Game: หา Fit ก่อนตัดสินใจเข้าเกม

Opening Structure:
- Pass: 0–10
- 1♣: 11–20 (♣2+ ถ้า Balanced ไม่บลัฟชุดยาว ยกเว้น 5332, 4432)
  หรือ 11+ ♣0+ ตามบทที่ 2
- 1♦: 11–20 Unbalanced (♦4+)
- 1♥ / 1♠: 11–20 (♥5 / ♠5 ไม่มี 5332 ยกเว้น 17+)
- 1NT: 14–16 Balance (6m, 5M, Singleton โอเค)
- 2♣: 21+ หรือ 8.5 Playing Tricks
- 2♦: Weak 1M หรือ 17+ 2M 55
- 2♥ / 2♠: 11–13 (♥6/♠6 หรือ 9–10 มี 2 ตัวบน + A/K นอก)
- 2NT: 20–22 Balance (5M โอเค)
- ระดับ 3–4: Pre-emptive ตามความเหมาะสม

Responding to 1♣ & Transfer Majors:
- 1♣ - 1♦ = Transfer Hearts (♥4+)
- 1♣ - 1♥ = Transfer Spades (♠4+)
- 1♣ - 1♠ = 0–10 ไม่มี M4, ไม่มี void, ไม่มี 6m
- 1♣ - 1NT = Game Force Relay เพื่อถาม Shape คนเปิด
- 1♣ - 2♣ = Transfer ♦ (GI+ ♦5+ หรือ NF ♦6)
- 1♣ - 2♦ = Game Invitation ♣5+
- Opener Rebid หลัง Transfer:
  Accept 1M (support 2+), 1S (Min Unbalanced),
  1NT (Strong No-Fit), 2♣ (Natural Club),
  2M (Medium Support), Strong Fit 3/4 หรือ NT Fit 4

รูปแบบคำตอบ:
- ตอบเป็นภาษาไทย
- อธิบายเฉลยให้สั้น โดยเน้นผล เหตุผลสำคัญ และกฎที่เกี่ยวข้อง
- ห้ามเปลี่ยนกฎการประมูลที่ระบุไว้
- ไม่ใช้ Markdown ตัวหนา ไม่ใช้หัวข้อยาวหรือรายการยืดเยื้อ
`;

async function askBridgeAI(promptText, options = {}) {
    const requestType = options.type || "explain";

    const taskInstructions = {
        explain: `
ช่วยอธิบายข้อที่นักเรียนร้องขอเพิ่มเติม
บอกเหตุผลของคำตอบและกฎระบบที่เกี่ยวข้อง
ตอบกระชับ ไม่ต้องอธิบายข้ออื่นที่ไม่ได้ถาม
`,
        summary: `
ช่วยวิเคราะห์ผลการทำแบบฝึกหัดจากข้อมูลที่ได้รับ
สรุปจุดแข็ง จุดที่ควรทบทวน และแนวทางฝึกต่อ
ห้ามแต่งคะแนนหรือข้อมูลที่ไม่มีอยู่ในข้อมูลที่ส่งมา
`
    };

    if (!taskInstructions[requestType]) {
        return "ประเภทคำขอ AI ไม่ถูกต้องค่ะ";
    }

    try {
        const response = await fetch(BRIDGE_AI_WORKER_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                promptText:
                    BRIDGE_AI_CONTEXT +
                    "\n\nประเภทคำขอ: " + requestType +
                    "\n\nคำแนะนำสำหรับงานนี้:\n" +
                    taskInstructions[requestType] +
                    "\n\nข้อมูลจากแบบฝึกหัด:\n" +
                    promptText
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error(
                "Bridge AI Worker Error:",
                response.status,
                data
            );

            return data.error ||
                "AI ยังสร้างคำอธิบายไม่ได้ กรุณาลองใหม่อีกครั้งค่ะ 🥺";
        }

        if (data.text) {
            return data.text.replace(/\*\*/g, "").trim();
        }

        console.error("Unexpected Worker response:", data);

        return "น้องบริดจ์ยังไม่ได้รับคำอธิบายกลับมาค่ะ ลองใหม่อีกทีนะค้าาา 🥺";

    } catch (error) {
        console.error("Bridge AI Fetch Error:", error);

        return "เชื่อมต่อ AI ไม่สำเร็จค่ะ ลองใหม่อีกทีน้าาา 🥺";
    }
}
```
