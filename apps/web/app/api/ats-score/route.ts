import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

/* ================= ATS ANALYSIS ================= */

async function analyzeResume(resumeText: string, role: string) {
    const breakdown = {
        formatting: { score: 25, feedback: [] as string[] },
        keywords: { score: 0, feedback: [] as string[], matchedKeywords: [] as string[] },
        structure: { score: 20, feedback: [] as string[] },
        content: { score: 20, feedback: [] as string[] },
    }

    const roleKeywords = await getRoleKeywords(role)
    const matched = roleKeywords.filter(k =>
        new RegExp(`\\b${k}\\b`, "i").test(resumeText)
    )

    breakdown.keywords.score = Math.round((matched.length / roleKeywords.length) * 35)
    breakdown.keywords.matchedKeywords = matched

    if (matched.length < roleKeywords.length / 2) {
        breakdown.keywords.feedback.push("Missing many role keywords")
    }

    if (!/\d+%|\d+ users|\$\d+/i.test(resumeText)) {
        breakdown.content.score -= 5
    }

    const score =
        breakdown.formatting.score +
        breakdown.keywords.score +
        breakdown.structure.score +
        breakdown.content.score

    return {
        score: Math.min(100, score),
        breakdown,
        suggestions: generateSuggestions(roleKeywords, matched, resumeText, score),
    }
}

/* ================= SUGGESTIONS ================= */

function generateSuggestions(
    keywords: string[],
    matched: string[],
    resume: string,
    score: number
) {
    const suggestions = []

    const missing = keywords.filter(k => !matched.includes(k))

    if (missing.length) {
        suggestions.push({
            category: "Keywords",
            priority: "high",
            issue: "Missing role-specific keywords",
            suggestion: `Add these skills: ${missing.slice(0, 6).join(", ")}`,
            example: `Skills:\n• ${missing.slice(0, 5).join("\n• ")}`,
            impact: "+10–20 points",
        })
    }

    if (!/\d+%|\d+ users/i.test(resume)) {
        suggestions.push({
            category: "Achievements",
            priority: "high",
            issue: "No quantified impact",
            suggestion: "Add numbers & metrics",
            example: "Improved performance by 35%",
            impact: "+5–10 points",
        })
    }

    if (score < 65) {
        suggestions.unshift({
            category: "Priority",
            priority: "high",
            issue: `Low ATS score (${score})`,
            suggestion: "Fix keywords + quantify experience first",
            impact: "+20–30 points possible",
        })
    }

    return suggestions
}

/* ================= KEYWORDS ================= */

const cache = new Map<string, string[]>()

async function getRoleKeywords(role: string) {
    if (cache.has(role)) return cache.get(role)!

    const basic = ["communication", "teamwork", "problem solving"]
    cache.set(role, basic)
    return basic
}

/* ================= PDF ================= */

async function extractTextFromPDF(file: File) {
    const pdfParse = require("pdf-parse")
    const buffer = Buffer.from(await file.arrayBuffer())
    const data = await pdfParse(buffer)
    return data.text.toLowerCase()
}

/* ================= API ================= */

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        const file = formData.get("resume") as File
        const role = formData.get("targetRole") as string

        const text = await extractTextFromPDF(file)
        const analysis = await analyzeResume(text, role)
        const session = await getServerSession()

        return NextResponse.json({
            success: true,
            analysis,
            authenticated: !!session,
        })
    } catch {
        return NextResponse.json({ error: "ATS failed" }, { status: 500 })
    }
}
