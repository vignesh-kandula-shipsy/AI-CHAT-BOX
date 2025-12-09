import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { googleSearch } from "./services/googleSearch.js";
import { askLLM } from "./services/llm.js";

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("AI Backend Running");
});

// Search & AI Answer API
app.post("/api/search", async (req, res) => {
    try {
        const { query } = req.body;

        const googleResults = await googleSearch(query);
        const llmAnswer = await askLLM(query, googleResults);

        res.json({
            answer: llmAnswer,
            sources: googleResults
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Backend running on port ${port}`));
