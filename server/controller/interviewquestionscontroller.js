const groqrequire=require("groq-sdk")

const groq=new groqrequire({
    apikey:process.env.GROQ_API_KEY
})
const interviewquestionscontroller=async(req,res)=>{
    try{
const {message}=req.body
if(!message){
  return res.status(400).json({
    status:false,
    message:"You haven't typed anything yet"
  })    
}

const prompt=`You are an expert technical interviewer.

Based on the following interview description provided by the user:

"""
Description : ${message}
"""

Generate exactly 10 relevant interview questions based on the job role, skills, technologies, subjects, or topics mentioned in the description.

Rules:

Identify the job role and/or technical topics from the description.
If the description contains a specific job role, make the questions relevant to that role.
If the description contains specific technologies or topics, include questions related to them.
If both a job role and topics are mentioned, combine them.
Do not assume technologies or skills that are not reasonably implied by the description.
Generate exactly 10 unique questions.
Start with easier questions and gradually increase the difficulty.
Include a mixture of conceptual, practical, scenario-based, and problem-solving questions.
Questions should be appropriate for an interview, not an exam.
Do not provide answers.
Do not include explanations or extra text.
Return only valid JSON.

Return the response in exactly this format:
JSON Schema:
{
"questions": [
{
"id": 1,
"question": "Question text",
"difficulty": "Easy"
},
{
"id": 2,
"question": "Question text",
"difficulty": "Easy"
}
]
}
}
`
const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });
  const content = completion.choices[0].message.content;

  const result = JSON.parse(content);
  
  res.status(200).json({
    success: true,
    questions: result.questions,
  });
}catch(error){
 
    res.status(500).json({
        success:false,
        message:"Internal server error",
    })
}
}

module.exports=interviewquestionscontroller