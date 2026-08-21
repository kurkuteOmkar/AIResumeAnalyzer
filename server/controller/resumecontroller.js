const resumeModel = require("../model/resume");
const Groq = require("groq-sdk");
const pdfParse = require("pdf-parse");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const resumecontroller = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No resume uploaded",
            });
        }

        // 1. Parse PDF from Memory Buffer
        let pdfData;
        try {
            pdfData = await pdfParse(req.file.buffer);
        } catch (pdfError) {
            console.error("PDF Parse Error:", pdfError);
            return res.status(400).json({
                success: false,
                message: "This PDF cannot be read. Please upload a valid text-based PDF.",
            });
        }

        if (!pdfData.text || pdfData.text.trim().length < 20) {
            return res.status(400).json({
                success: false,
                message: "No readable text found in the PDF. The file may be scanned or image-based.",
            });
        }

        console.log("PDF Parsed Successfully from Memory. Length:", pdfData.text.length);

        const prompt = `You are an expert ATS Resume Analyzer. 
Analyze the following resume text and return ONLY a valid JSON object matching this exact schema, with no markdown code blocks or additional text:
{
  "atsScore": 0,
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "GrammarFormattingIssues": [],
  "ProjectEvaluation": [],
  "ImprovementSuggestions": [],
  "RecommendedRoles": [],
  "OverallVerdict": [],
  "educationReview": []
}

Resume Text:
${pdfData.text}`;

        // 2. Groq API Call
        let completion;
        try {
            completion = await groq.chat.completions.create({
                model: "openai/gpt-oss-120b",
                messages: [
                    {
                        role: "system",
                        content: "You are an ATS Resume Analyzer. Always return ONLY raw valid JSON.",
                    },
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
                temperature: 0.2,
            });
        } catch (groqError) {
            console.error("Groq API Execution Error:", groqError);
            return res.status(500).json({
                success: false,
                message: `Groq API Error: ${groqError.message}`,
            });
        }

        const responseText = completion?.choices?.[0]?.message?.content;
        if (!responseText) {
            throw new Error("Empty response received from AI model.");
        }

        // 3. Robust JSON Cleaning & Parsing
        const cleanText = responseText
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        let jsonData;
        try {
            jsonData = JSON.parse(cleanText);
        } catch (parseErr) {
            console.warn("Direct JSON parse failed, trying regex match...");
            const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                console.error("Raw AI Output that failed parsing:", responseText);
                return res.status(500).json({
                    success: false,
                    message: "AI did not return valid parseable JSON.",
                });
            }
            jsonData = JSON.parse(jsonMatch[0]);
        }

        // 4. Save to Database
        const uploadResumeData = new resumeModel({
            resume: pdfData.text,
        });

        const dbResumeData = await uploadResumeData.save();
        const resumeId = dbResumeData._id.toString();

        return res.status(200).json({
            success: true,
            resumeId,
            message: jsonData,
        });

    } catch (error) {
        console.error("Critical Server Error in resumecontroller:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
};

module.exports = resumecontroller;