import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
console.log("API Key from .env:", process.env.PROXY);

// const client = new OpenAI({
//   baseURL: "https://openrouter.ai/api/v1",
//   apiKey: process.env.PROXY,
// });

// app.post("/api/movies", (req, res) => {
//   console.log("Incoming POST:", req.body);
//   res.send("Got POST");
// });

// app.post("/api/movies", async (req, res) => {
//   const { query } = req.body;

//   try {
//     const response = await client.responses.create({
//       model: "gpt-3.5-turbo",
//       input: query,
//     });
//     res.json({ movieString: response.output_text });
//   } catch (err) {
//     console.error("open ai error", err);
//     res.status(500).json({ error: err.message || "OpenAi request failed" });
//   }
// });

app.post("/api/movies", async (req, res) => {
  const { query } = req.body;
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PROXY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            // {
            //   role: "system",
            //   content:
            //     "You are a movie recommendation bot. Always respond with 5 movies separated by commas, no numbers.",
            // },
            {
              role: "user",
              content: `${query}. Please respond with 5 movie names separated by commas, no numbers or bullet point.`,
            },
          ],
        }),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      console.error("Open router error: ", data);
      return res
        .status(500)
        .json({ error: "Open Ai request failed", details: data });
    }
    res.json({
      movieString: data?.choices[0]?.message?.content || "No result found",
    });
  } catch (err) {
    console.error("error:", err);
    res.status(500).json({ error: "server error", details: err.message });
  }
});

app.listen(5000, () => console.log("server running on port 5000"));
