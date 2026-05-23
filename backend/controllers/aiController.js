const OpenAI = require("openai");

const client = new OpenAI({

    apiKey: process.env.GROQ_API_KEY,

    baseURL: "https://api.groq.com/openai/v1"

});

const askAI = async (req, res) => {

    try {

        const { prompt } = req.body;

        const completion =
            await client.chat.completions.create({

                model: "llama-3.1-8b-instant",

                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ]

            });

        res.json({
            response:
                completion.choices[0].message.content
        });

    } catch (err) {

        console.log(err);

        res.status(500).json(err.message);

    }

};

module.exports = { askAI };