import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import cors from "cors";

// Load environment variables from a .env file into process.env
dotenv.config();

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
// Middleware to enable CORS
app.use(cors());

// In-memory storage for the generated blog post
let generatedBlogPost = "";
let generatedProcess = "";

/**
 * Initialize OpenAI with the API key from environment variables
 * @type {OpenAI}
 */
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * POST /generate
 * Generates a completion for the given prompt using OpenAI's GPT-3.5-turbo-instruct model.
 *
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 *
 * @typedef {Object} RequestBody
 * @property {string} prompt - The prompt to generate a completion for.
 *
 * @returns {void}
 */
app.post("/generate", async (req, res) => {
  const { topic, processID } = req.body;
  const prompt = `
    Write a detailed and engaging blog post on the topic: "${topic}".
    The blog should include an introduction, several informative and well-structured sections, and a conclusion.
    Make sure the content is written in a friendly and conversational tone, providing useful insights and tips.
    Use subheadings, bullet points, and examples where appropriate.
    The blog should be around 800-1000 words long.
  `;

  try {
    /**
     * Request a completion from the OpenAI API.
     */
    const completion = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt,
      max_tokens: 150,
      temperature: 0.7,
      top_p: 0.9,
      presence_penalty: 0.6,
      frequency_penalty: 0.5,
    });

    // Extract the text from the API response
    let output = completion.choices[0].text;

    // Replace escaped newline characters with actual newlines
    output = output.replace(/\\n/g, "\n");
    output = output.replace(/\n/g, "");

    // Store the generated blog post in memory
    generatedBlogPost = output;
    generatedProcess = processID;

    let j = {
      process: generatedProcess,
      output: generatedBlogPost,
    };
    console.log("Generated blog is: ", output);
    console.log("JSON", JSON.stringify(j));

    res
      .status(200)
      .json({ process: generatedProcess, output: generatedBlogPost });
  } catch (error) {
    // Log any errors to the console
    console.error(error);

    // Send an error response with status 500
    res.status(500).json({ error: "An error occurred during Blog Generation" });
  }
});

/**
 * GET /blog
 * Retrieves the generated blog post.
 *
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 *
 * @returns {void}
 */
app.get("/blog", (req, res) => {
  if (generatedBlogPost) {
    res
      .status(200)
      .json({ process: generatedProcess, output: generatedBlogPost });
  } else {
    res.status(404).json({ error: "No blog post generated yet" });
  }
});

// Define the port to listen on, using the PORT environment variable or defaulting to 3000
const port = process.env.PORT || 3000;

/**
 * Start the server and log the port it's running on.
 * @returns {void}
 */
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
