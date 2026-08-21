const resumeModel = require("../model/resume");
const fs = require("fs");
const Groq = require("groq-sdk");
const pdfParse = require("pdf-parse");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

const resumecontroller=async (req, res) => {
    let filePath = null;
  
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No resume uploaded",
        });
      }
  
      filePath = req.file.buffer;
  
  
      const dataBuffer = fs.readFileSync(filePath);
  
      let pdfData;
  
      try {
        pdfData = await pdfParse(dataBuffer);
      } catch (pdfError) {
  
        return res.status(400).json({
          success: false,
          message:
            "This PDF cannot be read. Please upload a valid text-based PDF.",
        });
      }
  
      if (!pdfData.text || pdfData.text.trim().length < 20) {
        return res.status(400).json({
          success: false,
          message:
            "No readable text found in the PDF. The file may be scanned or image-based.",
        });
      }
  
      console.log("PDF Parsed Successfully");
  
      const prompt = `
  You are an ATS Resume Analyzer.
  
  Return ONLY valid JSON.
  
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
    "educationReview":[]
  }
  if it is not a resume do not return any thing marks this line as important
  Analyze the following resume:
  
  ${pdfData.text}
  `;
      let responseText;
      try {
          const completion = await groq.chat.completions.create({
          model: "openai/gpt-oss-120b",
          messages: [
            {
              role: "system",
              content:
                "You are an ATS Resume Analyzer. Always return ONLY valid JSON without markdown or explanations.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.2,
        });
  
        responseText = completion.choices[0].message.content;

      } catch (error) {
  
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }
  
      // console.log("AI Response:");
      // console.log(responseText);
  
      const cleanText = responseText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
  
      let jsonData;
  
      try {
        jsonData = JSON.parse(cleanText);
      } catch (err) {
        const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
  
        if (!jsonMatch) {
          console.log(cleanText);
  
          return res.status(400).json({
            success: false,
            message: "AI did not return valid JSON.",
          });
        }
  
        jsonData = JSON.parse(jsonMatch[0]);
      }
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
    
  
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    } finally {
      if (filePath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
}
module.exports=resumecontroller