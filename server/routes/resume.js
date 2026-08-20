const express = require("express");
const router = express.Router();
const upload = require("../config/upload");
const pdfParse = require("pdf-parse");
const resumeModel=require("../model/resume")
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
router.post("/resumeUpload", upload.single("resume"), async (req, res) => {
let filePath = null;
try {
if (!req.file) {
return res.status(400).json({
success: false,
message: "No resume uploaded",
});
}
filePath = req.file.path;
console.log("Uploaded File:", req.file.originalname);
const dataBuffer = fs.readFileSync(filePath);
let pdfData;
try {
  pdfData = await pdfParse(dataBuffer);
} catch (pdfError) {
  console.error("PDF Parse Error:", pdfError);
  return res.status(400).json({
    success: false,
    message:
      "This PDF cannot be read. Please upload a valid text-based PDF exported from Word, Google Docs, Canva, etc.",
  });
}
if (!pdfData.text || pdfData.text.trim().length < 20) {
  return res.status(400).json({
    success: false,
    message:
      "No readable text found in the PDF. The file may be scanned or image-based.",
  });
}
const uploadResumeData=new resumeModel({resume:pdfData.text})
const dbResumeData=await uploadResumeData.save();
const resumeId=dbResumeData._id.toString()
console.log("PDF Parsed Successfully");
try{
const prompt = `
You are an ATS Resume Analyzer.

Return ONLY valid JSON.
{
"atsScore": 0,
"strengths": [],
"weaknesses": [],
"missingSkills": [],
"Grammar&FormattingIssues":[],
"ProjectEvaluation":[],
"ImprovementSuggestions":[],
"RecommendedRoles":[],
"OverallVerdict":[]
}
Resume:
${pdfData.text}
`;
console.log("working 1")
const result = await model.generateContent(prompt);
const response = await result.response;
const responseText = response.text();
console.log("working 2")
}catch(error){
  console.log("working 3")
  console.error(error);          
  console.error(error.message);
 return res.status(400).json({message:error.message,success:false})
}
const jsonMatch = responseText.match(/\{[\s\S]*\}/);
console.log("working 4")
if (!jsonMatch) {
  console.log("working 5")
    console.error("No JSON found in AI response:", responseText);
    return res.status(500).json({ message: "AI response format error", success: false });

}
const cleanText = responseText
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();
  console.log("working 6")
const jsonData = JSON.parse(cleanText);
return res.status(200).json({message:jsonData,resumeId,success:true})
}catch(error){
  console.log("working 7")
 return res.status(400).json({message:error.message,success:false})
}
})
module.exports = router;
