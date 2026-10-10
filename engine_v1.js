// ==========================================
// ENGINE V1 - BRIDGE BIDDING RULES (JS)
// ==========================================

const BALANCED_SHAPES = [
    "4333","3433","3343","3334",
    "4432","4423","4342","4243","4324","4234","3442","2443","3424","2434","3244","2344",
    "5332","5323","5233","3532","3523","2533","3352","3253","2353","3325","3235","2335"
];
const SPECIAL_D4C5 = ["4045", "0445", "3145", "1345", "2245"];

function isBalanced(shape) {
    return BALANCED_SHAPES.includes(shape);
}

// ----------------------------
// OPENING BID
// ----------------------------
function opening_bid(hcp, shape) {
    let s = parseInt(shape[0]), h = parseInt(shape[1]), d = parseInt(shape[2]), c = parseInt(shape[3]);
    let balanced = isBalanced(shape);

    if (hcp >= 5 && hcp <= 10) {
        if (s >= 8 && h <= 4 && d <= 4 && c <= 4) return ["4S", "มีแต้ม 5-10 และมีไพ่ Spade 8 ใบขึ้นไป (4 Level Preempt)"];
        if (h >= 8 && s <= 4 && d <= 4 && c <= 4) return ["4H", "มีแต้ม 5-10 และมีไพ่ Heart 8 ใบขึ้นไป (4 Level Preempt)"];
        if (d >= 8 && s <= 4 && h <= 4 && c <= 4) return ["4D", "มีแต้ม 5-10 และมีไพ่ Diamond 8 ใบขึ้นไป (4 Level Preempt)"];
        if (c >= 8 && s <= 4 && h <= 4 && d <= 4) return ["4C", "มีแต้ม 5-10 และมีไพ่ Club 8 ใบขึ้นไป (4 Level Preempt)"];
        
        if (s === 7 && h <= 4 && d <= 4 && c <= 4) return ["3S", "มีแต้ม 5-10 และมีไพ่ Spade 7 ใบ (3 Level Preempt)"];
        if (h === 7 && s <= 4 && d <= 4 && c <= 4) return ["3H", "มีแต้ม 5-10 และมีไพ่ Heart 7 ใบ (3 Level Preempt)"];
        if (d === 7 && s <= 4 && h <= 4 && c <= 4) return ["3D", "มีแต้ม 5-10 และมีไพ่ Diamond 7 ใบ (3 Level Preempt)"];
        if (c === 7 && s <= 4 && h <= 4 && d <= 4) return ["3C", "มีแต้ม 5-10 และมีไพ่ Club 7 ใบ (3 Level Preempt)"];
    }

    if (balanced && hcp >= 20 && hcp <= 22) return ["2N", "20-22 Balanced"];
    if (hcp >= 21) return ["2C", "21+ any or 18+ playing tricks"];
    if (hcp >= 17 && hcp <= 20 && s >= 5 && h >= 5) return ["2D", "Multi 17-20 M55"];
    if (hcp >= 6 && hcp <= 10 && ((s === 6 && h <= 4 && d <= 4 && c <= 4) || (h === 6 && s <= 4 && d <= 4 && c <= 4))) return ["2D", "Multi weak 1M"];
    if (hcp >= 11 && hcp <= 13 && s === 6 && h <= 4 && d <= 4 && c <= 4) return ["2S", "11-13 S6"];
    if (hcp >= 11 && hcp <= 13 && h === 6 && s <= 4 && d <= 4 && c <= 4) return ["2H", "11-13 H6"];

    if (balanced) {
        if (hcp >= 17 && hcp <= 19) {
            if (s >= 5) return ["1S", "11+ S5"];
            if (h >= 5) return ["1H", "11+ H5"];
            return ["1C", "big NT 17-19 no M5 open 1C"];
        }
        if (hcp >= 14 && hcp <= 16) return ["1N", "strong NT 14-16 open 1N"];
        if (hcp >= 11 && hcp <= 13) return ["1C", "weak NT 11-13 open 1C"];
    }

    if (hcp >= 11 && hcp <= 20) {
        if (s >= 5 && h >= 5) return s >= h ? ["1S", "11+ S5"] : ["1H", "11+ H5"];
        if (s >= 5) return ["1S", "11+ S5"];
        if (h >= 5) return ["1H", "11+ H5"];
    }

    if (hcp >= 11 && hcp <= 20 && ["1444", "4144", "4441"].includes(shape)) return ["1D", "11+ D4+ unbalanced"];
    if (hcp >= 11 && hcp <= 20 && shape === "4414") return ["1C", "11+ C4+ unbalanced"];
    if (SPECIAL_D4C5.includes(shape)) {
        if (hcp >= 11 && hcp <= 15) return ["1D", "11+ D4+ unbalanced"];
        if (hcp >= 16) return ["1C", "11-15 D4C5 เปิด 1D เตรียมรีบิด 2C"];
    }

    if (hcp >= 11 && hcp <= 20) {
        if (c > d) return ["1C", "11+ C4+ unbalanced"];
        return ["1D", "11+ D4+ unbalanced"];
    }

    return ["PASS", "0-10 no good bid"];
}

// ----------------------------
// RESPONSE 1NT
// ----------------------------
function response_1nt(hcp, shape) {
    let s = parseInt(shape[0]), h = parseInt(shape[1]), d = parseInt(shape[2]), c = parseInt(shape[3]);

    if (hcp >= 9 && s >= 5 && h >= 5) return ["3D", "GF 9+ M55"];
    if (hcp >= 10 && ((s >= 5 && h === 4) || (h >= 5 && s === 4))) return ["2C", "GF 10+ M5+ and oM4"];
    if (8 <= hcp && hcp <= 9 && (s >= 5 && h >= 5 || (s >= 5 || h >= 5) && (d >= 5 || c >= 5))) return ["2C", "Constructive 8-9 55 atleast 1M"];
    if (hcp === 9 && (s >= 5 || h >= 5)) return ["2C", "GI 9 Hcp S5-6 ใบ"];

    if ((10 <= hcp && hcp <= 12 && s >= 6) || (6 <= hcp && hcp <= 9 && s >= 7) || (0 <= hcp && hcp <= 5 && s >= 8)) return ["4D", "Transfer Spade"];
    if ((10 <= hcp && hcp <= 12 && h >= 6) || (6 <= hcp && hcp <= 9 && h >= 7) || (0 <= hcp && hcp <= 5 && h >= 8)) return ["4C", "Transfer Heart"];

    if (hcp >= 11 && ["1345", "1354"].includes(shape)) return ["3S", "GF m54 with singleton S"];
    if (hcp >= 11 && ["3145", "3154"].includes(shape)) return ["3H", "GF m54 with singleton H"];
    if (d >= 5 && c >= 5) return ["2D", "m55"];

    if (10 <= hcp && hcp <= 12 && Math.max(s, h) < 3 && Math.max(d, c) >= 6) return ["3N", "To Play"];
    if (11 <= hcp && hcp <= 15 && ["2254", "2245"].includes(shape)) return ["3N", "To Play"];

    if ((0 <= hcp && hcp <= 8 && s >= 5 && s >= h) || (10 <= hcp && s >= 5 && h < 4)) return ["2H", "Transfer S weak or GF"];
    if ((0 <= hcp && hcp <= 8 && h >= 5 && h > s) || (10 <= hcp && h >= 5 && s < 4)) return ["2D", "Transfer H weak or GF"];

    if (13 <= hcp && hcp <= 15 && (s >= 3 || h >= 3) && Math.min(d, c) < 6) return ["3C", "Ask M with no M5"];
    else if (11 <= hcp && hcp <= 12 && (s >= 3 || h >= 3) && Math.min(d, c) < 7) return ["3C", "Ask M with no M5"];
    else if (hcp === 10 && (s >= 3 || h >= 3) && Math.min(d, c) === 6) return ["3C", "Ask M with no M5"];

    if ((0 <= hcp && hcp <= 9 && d >= 6) || (13 <= hcp && d >= 6) || (10 <= hcp && hcp <= 12 && d >= 7)) return ["2N", "Transfer D6+"];
    if ((0 <= hcp && hcp <= 9 && c >= 6) || (13 <= hcp && c >= 6) || (10 <= hcp && hcp <= 12 && c >= 7)) return ["2S", "Transfer C"];

    if (hcp >= 16 && s < 5 && h < 5 && d < 6 && c < 6 && !(d >= 5 && c >= 5)) return ["2C", "16+ M<5"];
    if (hcp === 10 && s < 5 && h < 5 && d < 6 && c < 6 && !(d >= 5 && c >= 5)) return ["2C", "Game invited"];

    return ["PASS", "no good bid"];
}

// ----------------------------
// RESPONSE 1 MAJOR (1H / 1S)
// ----------------------------
function response_1major(opening, hcp, shape, has_ace = false) {
    let s = parseInt(shape[0]), h = parseInt(shape[1]), d = parseInt(shape[2]), c = parseInt(shape[3]);
    let trump = (opening === "1H") ? h : s;
    let other_major = (opening === "1H") ? s : h;
    let has_void = (s === 0 || h === 0 || d === 0 || c === 0);
    let has_short = (s <= 1 || h <= 1 || d <= 1 || c <= 1);

    if (trump >= 4) {
        if (hcp >= 13 && has_void) return ["3D", "GF 13+ M4+ with any void"];
        if (hcp >= 13 && other_major === 1) return (opening === "1H") ? ["3S", "GF 13+ H4+ singleton S"] : ["3H", "GF 13+ S4+ singleton H"];
        if (hcp >= 13 && c === 1) return ["3N", "GF 13+ singleton C"];
        if (hcp >= 13 && d === 1) return ["4C", "GF 13+ singleton D"];
        if (hcp >= 13) return ["2C", "GF RELAY"];

        if (10 <= hcp && hcp <= 12 && has_short) return ["2N", "Game Invite M4+ with any short"];
        if (8 <= hcp && hcp <= 12 && !has_short) return ["3C", "Game Invite M4+ with no short"];
        if (6 <= hcp && hcp <= 9 && trump >= 5) return (opening === "1H") ? ["4H", "Non Force M4+"] : ["4S", "Non Force M4+"];
        if (6 <= hcp && hcp <= 9 && has_short) return (opening === "1H") ? ["4H", "Non Force M4+"] : ["4S", "Non Force M4+"];
        if (4 <= hcp && hcp <= 7 && shape !== "4333" && has_ace) return (opening === "1H") ? ["3H", "Blocking M4+"] : ["3S", "Blocking M4+"];
        if (0 <= hcp && hcp <= 5 && shape !== "4333") return ["3D", "weak raise M4+"];
        if (shape === "4333") return hcp >= 5 ? (opening === "1H") ? ["2H", "constructive raised"] : ["2S", "constructive raised"] : ["PASS", "no good bid"];
    }

    if (trump === 3) {
        if (hcp >= 13) {
            if (has_short) return (opening === "1H") ? ["2D", "GF 13+ M3 with short"] : ["2H", "GF 13+ M3 with short"];
            return ["2C", "GF RELAY"];
        }
        if (10 <= hcp && hcp <= 12) return (opening === "1H") ? ["2D", "Game invited H3"] : ["2H", "Game invited S3"];
        if (6 <= hcp && hcp <= 9) return (opening === "1H") ? ["2H", "constructive raised"] : ["2S", "constructive raised"];
        return ["PASS", "no good bid"];
    }

    if (opening === "1S") {
        if (6 <= hcp && hcp <= 10 && h >= 6 && s < 3) return ["2D", "Transfer H"];
        if (11 <= hcp && hcp <= 12 && h >= 5 && s < 4) return ["2D", "Transfer H"];
        if (hcp >= 13) return ["2C", "GF RELAY"];
        if (6 <= hcp && hcp <= 12) return ["1N", "1N Forcing"];
        return ["PASS", "no good bid"];
    } else {
        if (6 <= hcp && hcp <= 9 && s === 6 && h < 2) return ["2S", "6-9 S6"];
        if (hcp >= 13) return ["2C", "GF RELAY"];
        if (0 <= hcp && hcp <= 9 && s >= 5 && h < 3) return ["1N", "6-12 S5+"];
        if (10 <= hcp && hcp <= 11 && s >= 5 && h < 4) return ["1N", "6-12 S5+"];
        if (6 <= hcp && hcp <= 12) return ["1S", "S<5 1RF"];
        return ["PASS", "no good bid"];
    }
}

// ----------------------------
// RESPONSE 1 DIAMOND (1D)
// ----------------------------
function response_1d(hcp, shape, balanced = false, bad_suit = false) {
    let s = parseInt(shape[0]), h = parseInt(shape[1]), d = parseInt(shape[2]), c = parseInt(shape[3]);

    if (hcp >= 13 && s < 3 && h < 3) return ["1N", "GF RELAY"];
    if (hcp >= 13 && balanced && !bad_suit && (s === 4 || h === 4)) return ["1N", "GF RELAY"];
    if (10 <= hcp && hcp <= 12 && s < 4 && h < 4 && c >= 5 && c > d) return ["2S", "Game invited C5+"];
    if (10 <= hcp && hcp <= 12 && s < 4 && h < 4 && d >= 4 && d >= c) return ["3C", "Game invited D4+ unbalanced"];
    if (11 <= hcp && hcp <= 12 && balanced && s < 4 && h < 4) return ["2H", "11-12 Balanced"];
    if (6 <= hcp && hcp <= 10 && d >= 5 && s < 4 && h < 4) return ["3D", "6-9 D5+"];
    if (6 <= hcp && hcp <= 9 && d === 4 && s < 4 && h < 4 && (s <= 1 || h <= 1)) return ["3D", "6-9 D4 unbalanced"];
    if (hcp === 10 && shape === "3325") return ["2C", "NF C5+"];
    if (6 <= hcp && hcp <= 9 && c >= 6 && d < 4 && s < 4 && h < 4) return ["2C", "NF C5+"];
    if (6 <= hcp && hcp <= 10 && d === 3 && s < 4 && h < 4) return ["2D", "constructive D3-4"];
    if (0 <= hcp && hcp <= 5 && d >= 5 && s < 4 && h < 4) return ["2N", "weak raised"];
    if (hcp >= 6 && s >= 4 && s >= h && !(s === 4 && h === 4)) return ["1S", "S4+"];
    if (0 <= hcp && hcp <= 5 && s >= 4 && d >= 4 && s >= h && !(s === 4 && h === 4)) return ["1S", "S4+"];
    if (hcp >= 6 && h >= 4 && h > s) return ["1H", "H4+"];
    if (0 <= hcp && hcp <= 5 && h >= 4 && d >= 4 && h > s) return ["1H", "H4+"];
    return ["PASS", "no good bid"];
}

// ----------------------------
// RESPONSE 1 CLUB (1C)
// ----------------------------
function response_1c(hcp, shape, balanced = false, bad_suit = false) {
    let s = parseInt(shape[0]), h = parseInt(shape[1]), d = parseInt(shape[2]), c = parseInt(shape[3]);

    if (hcp >= 13 && s < 4 && h < 4) return ["1N", "GF RELAY"];
    if (hcp >= 13 && balanced && !bad_suit && (s === 4 || h === 4)) return ["1N", "GF RELAY"];
    if (h >= 4 && ((h === 4 && s === 4) || h > s)) return ["1D", "Transfer H4+"];
    if (s >= 4 && !(s === 4 && h === 4) && s >= h) return ["1H", "Transfer S4+"];
    if (11 <= hcp && hcp <= 12 && c === 5) return ["2D", "11-12 C5+"];
    if (11 <= hcp && hcp <= 12 && balanced && s < 4 && h < 4 && d < 5 && c < 5) return ["2H", "11-12 Balanced no m5"];
    if (6 <= hcp && hcp <= 10 && d >= 6 && s < 4 && h < 4) return ["2C", "Transfer D"];
    if (11 <= hcp && hcp <= 12 && d >= 5 && s < 4 && h < 4) return ["2C", "Transfer D"];
    if (0 <= hcp && hcp <= 5 && d >= 7 && s < 4 && h < 4) return ["2C", "Transfer D"];
    if (6 <= hcp && hcp <= 10 && d >= 5 && c >= 5) return ["2S", "6-10 m55"];
    if (0 <= hcp && hcp <= 5 && c >= 6) return ["2N", "weak raised"];
    if (6 <= hcp && hcp <= 10 && c >= 6) return ["3C", "blocking raised"];
    if (6 <= hcp && hcp <= 10 && s < 4 && h < 4 && d < 6 && c < 6) return ["1S", "6-10 M<4 m<5"];

    return ["PASS", "no good bid"];
}
