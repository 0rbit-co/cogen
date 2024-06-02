import { useState } from "react";
import { createMessage, executeDryrun } from "../utils/getBlog";

const BlogGenerator = () => {
  const [topic, setTopic] = useState("");
  const [heading, setHeading] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateBlog = async () => {
    setLoading(true);
    try {
      const generatedMsg = await createMessage(topic);
      setMsg(generatedMsg);
      console.log("Generated Message: ", generatedMsg);

      const runWithRetry = async (
        msg: any,
        retryDelay = 2000,
        retryCount = 0
      ) => {
        try {
          const generatedHeading = await executeDryrun(msg);
          if (generatedHeading !== "Error") {
            console.log("Generated Heading: ", generatedHeading);
            setHeading(generatedHeading);
            setLoading(false);
          } else {
            throw new Error("Did not find the expected value, retrying...");
          }
        } catch (error) {
          console.error(
            `Error getting blog (attempt ${retryCount + 1}):`,
            error
          );
          if (retryCount < 5) {
            setTimeout(
              () => runWithRetry(msg, retryDelay, retryCount + 1),
              retryDelay
            );
          } else {
            setHeading("Error generating blog");
            setLoading(false);
          }
        }
      };

      if (generatedMsg) {
        await runWithRetry(generatedMsg);
      } else {
        console.error("Message is not set. Please send the topic first.");
        setHeading("Error generating blog");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error sending topic:", error);
      setHeading("Error generating blog");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-4">
        <label
          htmlFor="topic"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Enter Topic
        </label>
        <input
          type="text"
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter the topic for your blog"
        />
      </div>
      <button
        onClick={handleGenerateBlog}
        className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Generate Blog
      </button>
      {loading && (
        <div className="mt-6 p-4 bg-gray-200 rounded animate-pulse">
          <div className="text-xl font-bold">Loading...</div>
        </div>
      )}
      {!loading && heading && (
        <div className="mt-6 p-4 bg-gray-200 rounded">
          <div className="text-xl font-bold">{heading}</div>
        </div>
      )}
    </div>
  );
};

export default BlogGenerator;
