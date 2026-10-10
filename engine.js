// ==========================================
// SHAPE BEFORE STRENGTH
// ENGINE V1
// OPENING ONLY + 1NT
// ==========================================

const BALANCED_SHAPES = [
    "4333","3433","3343","3334",
    "4432","4423","4342","4243",
    "4324","4234","3442","2443",
    "3424","2434","3244","2344",
    "5332","5323","5233",
    "3532","3523","2533",
    "3352","3253","2353",
    "3325","3235","2335"
];

const SPECIAL_D4C5 = [
    "4045",
    "0445",
    "3145",
    "1345",
    "2245"
];


// ==========================================
// HELPERS
// ==========================================

function shape_lengths(shape) {
    return [
        parseInt(shape[0]),
        parseInt(shape[1]),
        parseInt(shape[2]),
        parseInt(shape[3])
    ];
}

function is_balanced(shape) {
    return BALANCED_SHAPES.includes(shape);
}

function has_short(shape) {
    let [s, h, d, c] = shape_lengths(shape);
    return (
        s <= 1 ||
        h <= 1 ||
        d <= 1 ||
        c <= 1
    );
}


// ==========================================
// OPENING
// ==========================================

function opening_bid(hcp, shape) {
    let [s, h, d, c] = shape_lengths(shape);
    let balanced = is_balanced(shape);

    // ----------------------------
    // 4 LEVEL PREEMPT
    // ----------------------------
    if (5 <= hcp && hcp <= 10) {
        if (s >= 8 && h <= 4 && d <= 4 && c <= 4)
            return ["4S", "มีแต้ม 5-10 และมีไพ่ Spade 8 ใบขึ้นไป (4 Level Preempt)"];
        if (h >= 8 && s <= 4 && d <= 4 && c <= 4)
            return ["4H", "มีแต้ม 5-10 และมีไพ่ Heart 8 ใบขึ้นไป (4 Level Preempt)"];
        if (d >= 8 && s <= 4 && h <= 4 && c <= 4)
            return ["4D", "มีแต้ม 5-10 และมีไพ่ Diamond 8 ใบขึ้นไป (4 Level Preempt)"];
        if (c >= 8 && s <= 4 && h <= 4 && d <= 4)
            return ["4C", "มีแต้ม 5-10 และมีไพ่ Club 8 ใบขึ้นไป (4 Level Preempt)"];
    }

    // ----------------------------
    // 3 LEVEL PREEMPT
    // ----------------------------
    if (5 <= hcp && hcp <= 10) {
        if (s === 7 && h <= 4 && d <= 4 && c <= 4)
            return ["3S", "มีแต้ม 5-10 และมีไพ่ Spade 7 ใบ (3 Level Preempt)"];
        if (h === 7 && s <= 4 && d <= 4 && c <= 4)
            return ["3H", "มีแต้ม 5-10 และมีไพ่ Heart 7 ใบ (3 Level Preempt)"];
        if (d === 7 && s <= 4 && h <= 4 && c <= 4)
            return ["3D", "มีแต้ม 5-10 และมีไพ่ Diamond 7 ใบ (3 Level Preempt)"];
        if (c === 7 && s <= 4 && h <= 4 && d <= 4)
            return ["3C", "มีแต้ม 5-10 และมีไพ่ Club 7 ใบ (3 Level Preempt)"];
    }

    // ----------------------------
    // 2NT
    // ----------------------------
    if (balanced && 20 <= hcp && hcp <= 22) {
        return ["2N", "20-22 Balanced"];
    }

    // ----------------------------
    // 2C
    // ----------------------------
    if (hcp >= 21) {
        return ["2C", "21+ any or 18+ playing tricks"];
    }

    // ----------------------------
    // STRONG M55
    // ----------------------------
    if (17 <= hcp && hcp <= 20) {
        if (s >= 5 && h >= 5) {
            return ["2D", "Multi 17-20 M55"];
        }
    }

    // ----------------------------
    // WEAK MAJOR
    // ----------------------------
    if (6 <= hcp && hcp <= 10) {
        if (s === 6 && h <= 4 && d <= 4 && c <= 4) {
            return ["2D", "Multi weak 1M"];
        }
        if (h === 6 && s <= 4 && d <= 4 && c <= 4) {
            return ["2D", "Multi weak 1M"];
        }
    }

    // ----------------------------
    // 2S
    // ----------------------------
    if (11 <= hcp && hcp <= 13 && s === 6 && h <= 4 && d <= 4 && c <= 4) {
        return ["2S", "11-13 S6"];
    }

    // ----------------------------
    // 2H
    // ----------------------------
    if (11 <= hcp && hcp <= 13 && h === 6 && s <= 4 && d <= 4 && c <= 4) {
        return ["2H", "11-13 H6"];
    }

    // ----------------------------
    // BALANCED
    // ----------------------------
    if (balanced) {
        if (17 <= hcp && hcp <= 19) {
            if (s >= 5) return ["1S", "11+ S5"];
            if (h >= 5) return ["1H", "11+ H5"];
            return ["1C", "big NT 17-19 no M5 open 1C"];
        }
        if (14 <= hcp && hcp <= 16) {
            return ["1N", "strong NT 14-16 open 1N"];
        }
        if (11 <= hcp && hcp <= 13) {
            return ["1C", "weak NT 11-13 open 1C"];
        }
    }

    // ----------------------------
    // MAJORS
    // ----------------------------
    if (11 <= hcp && hcp <= 20) {
        if (s >= 5 && h >= 5) {
            if (s >= h) return ["1S", "11+ S5"];
            return ["1H", "11+ H5"];
        }
        if (s >= 5) return ["1S", "11+ S5"];
        if (h >= 5) return ["1H", "11+ H5"];
    }

    // ----------------------------
    // 4441 FAMILY
    // ----------------------------
    if (11 <= hcp && hcp <= 20 && ["1444", "4144", "4441"].includes(shape)) {
        return ["1D", "11+ D4+ unbalanced"];
    }
    if (11 <= hcp && hcp <= 20 && shape === "4414") {
        return ["1C", "11+ C4+ unbalanced"];
    }

    // ----------------------------
    // SPECIAL D4C5
    // ----------------------------
    if (SPECIAL_D4C5.includes(shape)) {
        if (11 <= hcp && hcp <= 15) {
            return ["1D", "11+ D4+ unbalanced"];
        }
        if (hcp >= 16) {
            return ["1C", "11-15 D4C5 เปิด 1D เตรียมรีบิด 2C"];
        }
    }

    // ----------------------------
    // LONGER MINOR
    // ----------------------------
    if (11 <= hcp && hcp <= 20) {
        if (c > d) return ["1C", "11+ C4+ unbalanced"];
        return ["1D", "11+ D4+ unbalanced"];
    }

    return ["PASS", "0-10 no good bid"];
}


// ==========================================
// RESPONSE 1NT
// ==========================================

function response_1nt(hcp, shape) {
    let [s, h, d, c] = shape_lengths(shape);

    // 3D
    if (hcp >= 9 && s >= 5 && h >= 5) {
        return ["3D", "GF 9+ M55"];
    }

    // 10+ M5 oM=4
    if (hcp >= 10) {
        if (s >= 5 && h === 4) return ["2C", "GF 10+ M5+ and oM4"];
        if (h >= 5 && s === 4) return ["2C", "GF 10+ M5+ and oM4"];
    }

    // 8-9 M55 / M5m5
    if (8 <= hcp && hcp <= 9) {
        if (s >= 5 && h >= 5) return ["2C", "Constructive 8-9 55 atleast 1M"];
        if ((s >= 5 || h >= 5) && (d >= 5 || c >= 5)) {
            return ["2C", "Constructive 8-9 55 atleast 1M"];
        }
    }

    // 9 M5-6
    if (hcp === 9) {
        if (s >= 5) return ["2C", "GI 9 Hcp S5-6 ใบ"];
        if (h >= 5) return ["2C", "GI 9 Hcp S5-6 ใบ"];
    }

    // Texas S
    if ((10 <= hcp && hcp <= 12 && s >= 6) || (6 <= hcp && hcp <= 9 && s >= 7) || (0 <= hcp && hcp <= 5 && s >= 8)) {
        return ["4D", "Transfer Spade"];
    }

    // Texas H
    if ((10 <= hcp && hcp <= 12 && h >= 6) || (6 <= hcp && hcp <= 9 && h >= 7) || (0 <= hcp && hcp <= 5 && h >= 8)) {
        return ["4C", "Transfer Heart"];
    }

    // 3S
    if (hcp >= 11 && ["1345", "1354"].includes(shape)) {
        return ["3S", "GF m54 with singleton S"];
    }

    // 3H
    if (hcp >= 11 && ["3145", "3154"].includes(shape)) {
        return ["3H", "GF m54 with singleton H"];
    }

    // m55
    if (d >= 5 && c >= 5) {
        return ["2D", "m55"];
    }

    // 3NT
    if (10 <= hcp && hcp <= 12 && Math.max(s, h) < 3 && Math.max(d, c) >= 6) {
        return ["3N", "To Play"];
    }
    if (11 <= hcp && hcp <= 15 && ["2254", "2245"].includes(shape)) {
        return ["3N", "To Play"];
    }

    // Transfer S
    if ((0 <= hcp && hcp <= 8 && s >= 5 && s >= h) || (hcp >= 10 && s >= 5 && h < 4)) {
        return ["2H", "Transfer S weak or GF"];
    }

    // Transfer H
    if ((0 <= hcp && hcp <= 8 && h >= 5 && h > s) || (hcp >= 10 && h >= 5 && s < 4)) {
        return ["2D", "Transfer H weak or GF"];
    }
    
    // 3C
    if (13 <= hcp && hcp <= 15 && (s >= 3 || h >= 3) && Math.min(d, c) < 6) {
        return ["3C", "ASk M with no M5 not interest slam"];
    } else if (11 <= hcp && hcp <= 12 && (s >= 3 || h >= 3) && Math.min(d, c) < 7) {
        return ["3C", "ASk M with no M5 not interest slam"];
    } else if (hcp === 10 && (s >= 3 || h >= 3) && Math.min(d, c) === 6) {
        return ["3C", "ASk M with no M5 not interest slam"];
    }

    // D route
    if ((0 <= hcp && hcp <= 9 && d >= 6) || (13 <= hcp && d >= 6) || (10 <= hcp && hcp <= 12 && d >= 7)) {
        return ["2N", "Transfer D6+"];
    }

    // C route
    if ((0 <= hcp && hcp <= 9 && c >= 6) || (13 <= hcp && c >= 6) || (10 <= hcp && hcp <= 12 && c >= 7)) {
        return ["2S", "Transfer C"];
    }
    
    // 16+
    if (hcp >= 16 && s < 5 && h < 5 && d < 6 && c < 6 && !(d >= 5 && c >= 5)) {
        return ["2C", "16+ M<5"];
    }

    // 10
    if (hcp === 10 && s < 5 && h < 5 && d < 6 && c < 6 && !(d >= 5 && c >= 5)) {
        return ["2C", "Game invited"];
    }

    return ["PASS", "no good bid"];
}


// ==========================================
// RESPONSE 1 MAJOR
// ==========================================

function response_1major(opening, hcp, shape, has_ace = false) {
    let [s, h, d, c] = shape_lengths(shape);
    let trump = (opening === "1H") ? h : s;
    let other_major = (opening === "1H") ? s : h;

    let has_void = (s === 0 || h === 0 || d === 0 || c === 0);
    let short_chk = has_short(shape);

    // =====================================
    // SUPPORT 4+
    // =====================================
    if (trump >= 4) {
        // Rule 1: 13+ M4+ with any void
        if (hcp >= 13 && has_void) return ["3D", "GF 13+ M4+ with any void"];

        // Rule 2: 13+ M4+ with other major singleton
        if (hcp >= 13 && other_major === 1) {
            if (opening === "1H") return ["3S", "GF 13+ H4+ singletom S"];
            return ["3H", "GF 13+ S4+ singletom H"];
        }

        // Rule 3: 13+ M4+ C=1
        if (hcp >= 13 && c === 1) return ["3N", "GF 13+ singleton C"];

        // Rule 4: 13+ M4+ D=1
        if (hcp >= 13 && d === 1) return ["4C", "GF 13+ singleton D"];

        // Rule 6: 13+ catch-all GF
        if (hcp >= 13) return ["2C", "GF RELAY"];

        // Rule 7: 10-12 M4+ any short
        if (10 <= hcp && hcp <= 12 && short_chk) return ["2N", "Game Invite M4+ with any short"];

        // Rule 8: 8-12 M4+ no short
        if (8 <= hcp && hcp <= 12 && !short_chk) return ["3C", "Game Invite M4+ with no short"];

        // Rule 9: 6-9 M5+
        if (6 <= hcp && hcp <= 9 && trump >= 5) {
            return opening === "1H" ? ["4H", "Non Force M4+"] : ["4S", "Non Force M4+"];
        }

        // Rule 10: 6-9 M4+ with short
        if (6 <= hcp && hcp <= 9 && short_chk) {
            return opening === "1H" ? ["4H", "Non Force M4+ "] : ["4S", "Non Force M4+ "];
        }

        // Rule 11: 4-7 M4 not 4333 and has Ace
        if (4 <= hcp && hcp <= 7 && shape !== "4333" && has_ace) {
            return opening === "1H" ? ["3H", "Blocking M4+ 4-7 hcp ถ้ามี4-5แต้มต้องมีเอ"] : ["3S", "Blocking M4+ 4-7 hcp ถ้ามี4-5แต้มต้องมีเอ"];
        }

        // Rule 12: 0-5 M4 not 4333
        if (0 <= hcp && hcp <= 5 && shape !== "4333") return ["3D", "weak raise M4+"];

        // Special 4333 case
        if (shape === "4333") {
            if (hcp >= 5) return opening === "1H" ? ["2H", "constructive raised"] : ["2S", "constructive raised"];
            return ["PASS", "no good bid"];
        }
    }

    // =====================================
    // SUPPORT EXACTLY 3
    // =====================================
    if (trump === 3) {
        // Rule 5: 13+ M3 with any short
        if (hcp >= 13) {
            if (short_chk) {
                return opening === "1H" ? ["2D", "GF 13+ M3 with any short"] : ["2H", "GF 13+ M3 with any short"];
            }
            return ["2C", "GF RELAY"];
        }
        // GI
        if (10 <= hcp && hcp <= 12) {
            return opening === "1H" ? ["2D", "Game invited H3"] : ["2H", "Game invited S3"];
        }
        // Constructive
        if (6 <= hcp && hcp <= 9) {
            return opening === "1H" ? ["2H", "constructive raised"] : ["2S", "constructive raised"];
        }
        return ["PASS", "no good bid"];
    }

    // =====================================
    // OPEN 1S
    // =====================================
    if (opening === "1S") {
        if (6 <= hcp && hcp <= 10 && h >= 6 && s < 3) return ["2D", "Transfer H"];
        if (11 <= hcp && hcp <= 12 && h >= 5 && s < 4) return ["2D", "Transfer H"];
        if (hcp >= 13) return ["2C", "GF RELAY"];
        if (6 <= hcp && hcp <= 12) return ["1N", "1N Forcing"];
        return ["PASS", "no good bid"];
    }
    // =====================================
    // OPEN 1H
    // =====================================
    else {
        if (6 <= hcp && hcp <= 9 && s === 6 && h < 2) return ["2S", "6-9 S6"];
        if (hcp >= 13) return ["2C", "GF RELAY"];
        if (0 <= hcp && hcp <= 9 && s >= 5 && h < 3) return ["1N", "6-12 S5+"];
        if (10 <= hcp && hcp <= 11 && s >= 5 && h < 4) return ["1N", "6-12 S5+"];
        if (6 <= hcp && hcp <= 12) return ["1S", "S<5 1RF"];
        return ["PASS", "no good bid"];
    }
}


// ==========================================
// RESPONSE 1 DIAMOND
// ==========================================

function response_1d(hcp, shape, balanced = false, bad_suit = false) {
    let [s, h, d, c] = shape_lengths(shape);

    if (hcp >= 13 && s < 3 && h < 3) return ["1N", "GF RELAY"];

    if (hcp >= 13 && balanced && !bad_suit && (s === 4 || h === 4)) {
        return ["1N", "GF RELAY"];
    }

    if (10 <= hcp && hcp <= 12 && s < 4 && h < 4 && c >= 5 && c > d) {
        return ["2S", "Game invited C5+ C>D"];
    }

    if (10 <= hcp && hcp <= 12 && s < 4 && h < 4 && d >= 4 && d >= c) {
        return ["3C", "Game invited D4+ unbalanced"];
    }

    if (11 <= hcp && hcp <= 12 && balanced && s < 4 && h < 4) {
        return ["2H", "11-12 Balanced"];
    }

    if (6 <= hcp && hcp <= 10 && d >= 5 && s < 4 && h < 4) {
        return ["3D", "6-9 D5+ or D4 unbalanced"];
    }

    if (6 <= hcp && hcp <= 9 && d === 4 && s < 4 && h < 4 && (s <= 1 || h <= 1)) {
        return ["3D", "6-9 D5+ or D4 unbalanced"];
    }

    if (hcp === 10 && shape === "3325") {
        return ["2C", "NF C5+"];
    }

    if (6 <= hcp && hcp <= 9 && c >= 6 && d < 4 && s < 4 && h < 4) {
        return ["2C", "NF C5+"];
    }

    if (6 <= hcp && hcp <= 10 && d === 3 && s < 4 && h < 4) {
        return ["2D", "constructive D3-4"];
    }

    if (0 <= hcp && hcp <= 5 && d >= 5 && s < 4 && h < 4) {
        return ["2N", "weak raised"];
    }

    if (hcp >= 6 && s >= 4 && s >= h && !(s === 4 && h === 4)) {
        return ["1S", "S4+"];
    }

    if (0 <= hcp && hcp <= 5 && s >= 4 && d >= 4 && s >= h && !(s === 4 && h === 4)) {
        return ["1S", "S4+"];
    }

    if (hcp >= 6 && h >= 4 && h > s) {
        return ["1H", "H4+"];
    }

    if (0 <= hcp && hcp <= 5 && h >= 4 && d >= 4 && h > s) {
        return ["1H", "H4+"];
    }

    return ["PASS", "no good bid"];
}


// ==========================================
// RESPONSE 1 CLUB
// ==========================================

function response_1c(hcp, shape, balanced = false, bad_suit = false) {
    let [s, h, d, c] = shape_lengths(shape);

    // Rule 1: 13+ M<4
    if (hcp >= 13 && s < 4 && h < 4) {
        return ["1N", "GF RELAY"];
    }

    // Rule 2: 13+ M=4 Balanced No Bad Suit
    if (hcp >= 13 && balanced && !bad_suit && (s === 4 || h === 4)) {
        return ["1N", "GF RELAY"];
    }

    // Rule 3: H4+ 44 หรือ H>S
    if (h >= 4 && ((h === 4 && s === 4) || h > s)) {
        return ["1D", "Transfer H4+"];
    }

    // Rule 4: S4+ S>=H ยกเว้น 44
    if (s >= 4 && !(s === 4 && h === 4) && s >= h) {
        return ["1H", "Transfer S4+"];
    }

    // Rule 5: 11-12 C=5
    if (11 <= hcp && hcp <= 12 && c === 5) {
        return ["2D", "11-12 C5+"];
    }

    // Rule 6: 11-12 Balanced M<4 m<5
    if (11 <= hcp && hcp <= 12 && balanced && s < 4 && h < 4 && d < 5 && c < 5) {
        return ["2H", "11-12 Balanced no m5"];
    }

    // Rule 7: Transfer Diamond
    if (6 <= hcp && hcp <= 10 && d >= 6 && s < 4 && h < 4) return ["2C", "Transfer D"];
    if (11 <= hcp && hcp <= 12 && d >= 5 && s < 4 && h < 4) return ["2C", "Transfer D"];
    if (0 <= hcp && hcp <= 5 && d >= 7 && s < 4 && h < 4) return ["2C", "Transfer D"];

    // Rule 8: 6-10 m55
    if (6 <= hcp && hcp <= 10 && d >= 5 && c >= 5) {
        return ["2S", "6-10 m55"];
    }

    // Rule 9: 0-5 C6+
    if (0 <= hcp && hcp <= 5 && c >= 6) {
        return ["2N", "weak raised"];
    }

    // Rule 10: 6-10 C6+
    if (6 <= hcp && hcp <= 10 && c >= 6) {
        return ["3C", "blocking raised"];
    }

    // Rule 11: 6-10 M<4 m<6
    if (6 <= hcp && hcp <= 10 && s < 4 && h < 4 && d < 6 && c < 6) {
        return ["1S", "6-10 M<4 m<5"];
    }

    // Rule 12
    return ["PASS", "no good bid"];
}


// ==========================================
// QUIZ GENERATOR HELPER
// ==========================================

function generateQuizQuestion(mode) {
    let hcp = Math.floor(Math.random() * 26);
    let s = Math.floor(Math.random() * 10);
    let h = Math.floor(Math.random() * (13 - s + 1));
    let d = Math.floor(Math.random() * (13 - s - h + 1));
    let c = 13 - s - h - d;
    let shape = `${s}${h}${d}${c}`;

    let ansArr = ["PASS", "no good bid"];
    if (mode === 'opening') {
        ansArr = opening_bid(hcp, shape);
    } else if (mode === 'resp_1c') {
        ansArr = response_1c(hcp, shape);
    } else if (mode === 'resp_1d') {
        ansArr = response_1d(hcp, shape);
    } else if (mode === 'resp_1h') {
        ansArr = response_1major("1H", hcp, shape);
    } else if (mode === 'resp_1s') {
        ansArr = response_1major("1S", hcp, shape);
    } else if (mode === 'resp_1nt') {
        ansArr = response_1nt(hcp, shape);
    }

    return { hcp, shape, s, h, d, c, ans: ansArr[0], exp: ansArr[1] };
}
