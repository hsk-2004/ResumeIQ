import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { GoogleGenerativeAI } from "@google/generative-ai"

/* ================= GEMINI AI SETUP ================= */

// Initialize Gemini with v1 API (not v1beta)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

/* ================= CONSTANTS ================= */

const MAX_PDF_SIZE = 10 * 1024 * 1024 // 10MB limit for serverless
const ALLOWED_MIME_TYPES = ["application/pdf"]

/* ================= PDF EXTRACTION (VERCEL-COMPATIBLE) ================= */

async function extractTextFromPDF(file: File): Promise<string> {
    try {
        // Validate file size
        if (file.size > MAX_PDF_SIZE) {
            throw new Error(`PDF file too large. Maximum size is ${MAX_PDF_SIZE / 1024 / 1024}MB`)
        }

        // Dynamic import of pdf-parse-fork (pure JS, no native dependencies)
        const pdfParse = (await import('pdf-parse-fork')).default

        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        console.log("📄 Extracting text from PDF...")
        console.log("📦 File size:", (file.size / 1024).toFixed(2), "KB")

        // Parse PDF with serverless-safe options
        const data = await pdfParse(buffer, {
            max: 0, // parse all pages
            version: 'default', // use default PDF version parser
        })

        const extractedText = data.text

        if (!extractedText || extractedText.trim().length === 0) {
            throw new Error("PDF appears to be empty or contains no extractable text")
        }

        console.log("✅ PDF TEXT EXTRACTED SUCCESSFULLY")
        console.log("📄 Extracted text length:", extractedText.length, "characters")
        console.log("📄 Pages:", data.numpages)
        console.log("📝 Preview:", extractedText.substring(0, 200) + "...")

        return extractedText
    } catch (parseError) {
        console.error("❌ PDF EXTRACTION FAILED:", parseError)

        if (parseError instanceof Error) {
            console.error("Error message:", parseError.message)

            // Provide user-friendly error messages
            if (parseError.message.includes("Invalid PDF")) {
                throw new Error("Invalid PDF file. Please upload a valid PDF document.")
            }
            if (parseError.message.includes("encrypted")) {
                throw new Error("PDF is password-protected. Please upload an unencrypted PDF.")
            }
            if (parseError.message.includes("too large")) {
                throw parseError // Already has a good message
            }
        }

        throw new Error("Failed to extract text from PDF. Please ensure it's a valid, unencrypted PDF file.")
    }
}

/* ================= GEMINI AI ATS ANALYSIS ================= */

async function analyzeResumeWithGemini(resumeText: string, targetRole: string) {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-pro",
            generationConfig: {
                temperature: 0.3,
                topP: 0.8,
                topK: 40,
            }
        })

        const prompt = `You are a strict ATS (Applicant Tracking System) analyzer. You must be critical and realistic in your scoring.

CRITICAL INSTRUCTIONS:
- Most resumes score between 45-75 for ATS compatibility
- Only exceptional, perfectly optimized resumes score above 80
- Be harsh on missing keywords, weak formatting, or vague achievements
- A score of 88+ should be RARE and only for near-perfect resumes

Analyze this resume for the position of "${targetRole}".

RESUME TEXT:
${resumeText}

TARGET ROLE: ${targetRole}

SCORING CRITERIA (be strict):
1. Formatting (0-25): Is it ATS-friendly? Simple fonts? No tables/graphics? Proper sections?
2. Keywords (0-35): How many role-specific technical skills and keywords are present? Missing keywords = lost points
3. Structure (0-20): Clear sections? Reverse chronological? Proper headings?
4. Content (0-20): Quantified achievements? Action verbs? Relevant experience?

IMPORTANT: 
- If keywords are missing → Deduct heavily from keyword score
- If no metrics/numbers → Maximum 12/20 for content
- Generic descriptions → Deduct from content score
- Poor formatting → Deduct from formatting score

Provide your analysis in the following JSON format (respond ONLY with valid JSON, no markdown or extra text):

{
  "score": <number between 0-100>,
  "breakdown": {
    "formatting": {
      "score": <number 0-25>,
      "feedback": ["<specific feedback item>"]
    },
    "keywords": {
      "score": <number 0-35>,
      "matchedKeywords": ["<keyword1>", "<keyword2>"],
      "missingKeywords": ["<keyword1>", "<keyword2>"],
      "feedback": ["<specific feedback item>"]
    },
    "structure": {
      "score": <number 0-20>,
      "feedback": ["<specific feedback item>"]
    },
    "content": {
      "score": <number 0-20>,
      "feedback": ["<specific feedback item>"]
    }
  },
  "suggestions": [
    {
      "category": "<Keywords|Formatting|Content|Structure>",
      "priority": "<high|medium|low>",
      "issue": "<brief description of the issue>",
      "suggestion": "<actionable recommendation>",
      "example": "<concrete example if applicable>",
      "impact": "<expected score improvement>"
    }
  ],
  "strengths": ["<strength1>", "<strength2>"],
  "weaknesses": ["<weakness1>", "<weakness2>"]
}

Be strict but fair. Provide actionable, specific suggestions that will genuinely improve ATS compatibility.`

        console.log("🤖 Sending resume to Gemini AI for analysis...")

        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text()

        console.log("📥 Received response from Gemini AI")
        console.log("Response length:", text.length, "characters")

        // Clean up the response - remove markdown code blocks if present
        const cleanedText = text
            .replace(/```json\n?/g, "")
            .replace(/```\n?/g, "")
            .trim()

        const analysis = JSON.parse(cleanedText)

        console.log("✅ ANALYSIS COMPLETE")
        console.log("📊 Score:", analysis.score)
        console.log("🔑 Matched Keywords:", analysis.breakdown?.keywords?.matchedKeywords?.length || 0)
        console.log("❌ Missing Keywords:", analysis.breakdown?.keywords?.missingKeywords?.length || 0)

        // Validate the response has required fields
        if (typeof analysis.score !== "number" || !analysis.breakdown || !analysis.suggestions) {
            throw new Error("Invalid response format from Gemini")
        }

        // Ensure score is within valid range
        analysis.score = Math.max(0, Math.min(100, Math.round(analysis.score)))

        return analysis
    } catch (error) {
        console.error("❌ Gemini AI analysis error:", error)

        // Fallback to basic analysis if Gemini fails
        console.log("⚠️ Falling back to basic analysis...")
        return await fallbackAnalysis(resumeText, targetRole)
    }
}

/* ================= FALLBACK ANALYSIS (if Gemini fails) ================= */

async function fallbackAnalysis(resumeText: string, role: string) {
    const text = resumeText.toLowerCase()

    // Basic keyword detection
    const commonKeywords: Record<string, string[]> = {
        "software engineer": ["javascript", "react", "node", "api", "database", "git", "python", "java"],
        "frontend developer": ["html", "css", "javascript", "react", "typescript", "ui", "vue", "angular"],
        "backend developer": ["api", "database", "sql", "node", "python", "java", "rest", "microservices"],
        "data analyst": ["sql", "python", "excel", "tableau", "statistics", "power bi", "data visualization"],
        "product manager": ["roadmap", "stakeholder", "agile", "scrum", "user research", "metrics", "strategy"],
        "default": ["communication", "teamwork", "problem solving", "leadership"]
    }

    const keywords = commonKeywords[role.toLowerCase()] || commonKeywords.default
    const matchedKeywords = keywords.filter(k => text.includes(k))
    const missingKeywords = keywords.filter(k => !text.includes(k))

    // Calculate component scores
    const formattingScore = 20
    const structureScore = 15
    const keywordScore = Math.round((matchedKeywords.length / keywords.length) * 35)
    const hasMetrics = /\b\d+%|\b\d+\s+(users|customers|projects|years)|\$\d+/i.test(resumeText)
    const contentScore = hasMetrics ? 18 : 12

    const totalScore = Math.min(100, formattingScore + structureScore + keywordScore + contentScore)

    console.log("📊 Fallback Analysis Score:", totalScore)
    console.log("🔑 Keywords matched:", matchedKeywords.length, "/", keywords.length)

    return {
        score: totalScore,
        breakdown: {
            formatting: {
                score: formattingScore,
                feedback: ["Basic formatting analysis applied (AI analysis unavailable)"]
            },
            keywords: {
                score: keywordScore,
                matchedKeywords,
                missingKeywords,
                feedback: missingKeywords.length > keywords.length / 2
                    ? [`Missing ${missingKeywords.length} important keywords for this role`]
                    : ["Decent keyword coverage for the role"]
            },
            structure: {
                score: structureScore,
                feedback: ["Standard structure analysis applied"]
            },
            content: {
                score: contentScore,
                feedback: hasMetrics
                    ? ["Quantified achievements detected"]
                    : ["Add more measurable achievements with numbers and percentages"]
            }
        },
        suggestions: [
            {
                category: "Keywords",
                priority: "high",
                issue: `Missing ${missingKeywords.length} role-specific keywords`,
                suggestion: `Add these skills to your resume: ${missingKeywords.slice(0, 5).join(", ")}`,
                example: `Skills: ${missingKeywords.slice(0, 3).join(", ")}`,
                impact: "+10-20 points"
            },
            {
                category: "Content",
                priority: hasMetrics ? "low" : "high",
                issue: hasMetrics ? "Good use of metrics" : "Missing quantified achievements",
                suggestion: hasMetrics
                    ? "Continue using metrics and numbers to demonstrate impact"
                    : "Add numbers, percentages, and metrics to show your impact",
                example: "Improved system performance by 40%, reducing load time from 3s to 1.8s",
                impact: hasMetrics ? "Already implemented" : "+5-10 points"
            },
            {
                category: "Structure",
                priority: "medium",
                issue: "Ensure proper ATS-friendly structure",
                suggestion: "Use clear section headings: Experience, Education, Skills, Projects",
                example: "EXPERIENCE\nSoftware Engineer | Company Name | 2020-2024",
                impact: "+3-5 points"
            }
        ],
        strengths: [
            matchedKeywords.length > 0 ? `Found ${matchedKeywords.length} relevant keywords` : "Resume uploaded successfully",
            hasMetrics ? "Contains quantified achievements" : "Resume is readable"
        ],
        weaknesses: [
            "AI-powered analysis unavailable - using basic keyword matching",
            missingKeywords.length > keywords.length / 2 ? "Missing many role-specific keywords" : "Some keywords could be added"
        ]
    }
}

/* ================= API ROUTE ================= */

export async function POST(req: NextRequest) {
    try {
        console.log("📨 Received ATS analysis request")

        // Parse form data
        const formData = await req.formData()
        const file = formData.get("resume") as File
        const role = formData.get("targetRole") as string

        console.log("📋 File:", file?.name, "| Size:", file?.size, "bytes")
        console.log("🎯 Target Role:", role)

        // Validate inputs
        if (!file) {
            return NextResponse.json(
                { success: false, error: "Resume file is required" },
                { status: 400 }
            )
        }

        if (!role || role.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: "Target role is required" },
                { status: 400 }
            )
        }

        if (!ALLOWED_MIME_TYPES.includes(file.type)) {
            return NextResponse.json(
                { success: false, error: "Only PDF files are supported" },
                { status: 400 }
            )
        }

        // Check if Gemini API key is configured
        if (!process.env.GEMINI_API_KEY) {
            console.warn("⚠️ GEMINI_API_KEY not configured - will use fallback analysis")
        } else {
            console.log("✅ Gemini API key detected")
        }

        // Extract text from PDF
        const rawText = await extractTextFromPDF(file)

        if (!rawText || rawText.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: "Could not extract text from PDF. The file may be empty or corrupted." },
                { status: 400 }
            )
        }

        // Analyze resume with Gemini AI
        const analysis = await analyzeResumeWithGemini(rawText, role)

        // Get session (optional - for logging/tracking)
        const session = await getServerSession()

        console.log("✅ Analysis complete - returning results")

        return NextResponse.json({
            success: true,
            authenticated: !!session,
            analysis,
            aiPowered: !!process.env.GEMINI_API_KEY
        })
    } catch (err) {
        console.error("❌ ATS analysis error:", err)
        return NextResponse.json(
            {
                success: false,
                error: err instanceof Error ? err.message : "ATS analysis failed"
            },
            { status: 500 }
        )
    }
}