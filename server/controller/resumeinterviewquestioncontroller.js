const resumeModel = require("../model/resume");
const Groq = require("groq-sdk");
const grok = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });
const resumeinterviewquestioncontroller=async (req,res)=>{
const {id}=req.params
const result=await resumeModel.findById(id)
if(!result)
return res.status(400).json({
    success:false,
    message:"The id is not present in the database"
})
const resume=result.resume
const prompt=`Generate exactly 15 interview questions based on the candidate's resume.

* Focus on skills, projects, education, and technologies mentioned in the resume.
* Mix Easy, Medium, and Hard questions.
* Do not include answers or explanations.
* Return valid JSON only in exactly this format:

{
"questions": [
{
"id": 1,
"question": "Question text",
"difficulty": "Easy"
}
]
}

Candidate Resume:
${resume}
`
try{
const completion = await grok.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [
      {
        role: "system",
        content:
          "You are an Professional Interviewer",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.2,
  });
  const questions= completion.choices[0].message.content
  return res.status(200).json({success:true,questions})
}catch(error){
   return  res.status(400).json({
        success:false,
        message:"Ai response error"
    })
}
}
module.exports=resumeinterviewquestioncontroller