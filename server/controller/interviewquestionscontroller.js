const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const interviewquestionscontroller = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({
                success: false,
                message: "You haven't typed anything yet"
            });    
        }

        const prompt = `You are an expert technical interviewer.
Based on the following interview description provided by the user:
"""
Description : ${message}
"""
Generate exactly 10 relevant interview questions. Start with easier questions and gradually increase difficulty.
Return ONLY a valid JSON object in the exact format specified below. Do not include markdown code blocks or extra text.

{
  "questions": [
    {
      "id": 1,
      "question": "Question text",
      "difficulty": "Easy"
    }
  ]
}`;

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
        
        const cleanContent = content.replace(/```json/g, "").replace(/```/g, "").trim();
        const result = JSON.parse(cleanContent);
        
        return res.status(200).json({
            success: true,
            questions: result.questions,
        });

    } catch (error) {
        console.error("Interview Controller Error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
};

module.exports = interviewquestionscontroller;