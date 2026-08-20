const groqrequire=require("groq-sdk")
const groq=new groqrequire({
    apikey:process.env.GROQ_API_KEY
})
const roadmapcontroller=async(req,res)=>{
    try{
const {message}=req.body
if(!message){
  return res.status(400).json({
    status:false,
    message:"You haven't typed anything yet"
  })    
}

const prompt=`You are an expert career mentor and technical curriculum designer. 
Your task is to generate a structured, step-by-step learning roadmap based on the user's career goal or description.
descripion:${message}
Return ONLY a valid JSON object in the exact format specified below. Do not include any extra text, markdown wrappers, or explanations outside of the JSON structure based on the given description.

JSON Schema:
{
  "roadmap": [
    {
      "id": 1,
      "stepTitle": "Name of the milestone or step",
      "description": "Detailed explanation of what to learn, key concepts to cover, and practical applications for this step.",
      "duration": "Estimated time (e.g., 2 Weeks, 1 Month)"
    }
  ]
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
    result,
    user:req.user.id
  });
}catch(error){
    console.log(error)
    res.status(500).json({
        success:false,
        message:"Internal server error",
    })
}
}

module.exports=roadmapcontroller