import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

// Load environment variables from a .env file into process.env
dotenv.config();

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

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
  const { prompt } = /** @type {RequestBody} */ (req.body);

  try {
    /**
     * Request a completion from the OpenAI API.
    */
    const completion = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt,
      max_tokens: 8,
      temperature: 0,
    });

    // Extract the text from the API response
    let output = completion.choices[0].text;

    // Replace escaped newline characters with actual newlines
    output = output.replace(/\\n/g, '\n');

    // Log the output to the console
    console.log(output);

    // Set the response content type to plain text
    res.setHeader('Content-Type', 'text/plain');

    // Send the formatted output as the response
    res.status(200).send(output);
  } catch (error) {
    // Log any errors to the console
    console.error(error);

    // Send an error response with status 500
    res.status(500).json({ error: "An error occurred during Blog Generation" });
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