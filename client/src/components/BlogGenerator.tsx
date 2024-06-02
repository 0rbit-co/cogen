import React, { useState } from "react";
import { createMessage, executeDryrun } from "../utils/getBlog";

const BlogGenerator = () => {
  const [topic, setTopic] = useState("");
  const [heading, setHeading] = useState("");
  const [msg, setMsg] = useState("");

  const handleSendTopic = async () => {
    try {
      const generatedMsg = await createMessage(topic);
      setMsg(generatedMsg);
      console.log("Generated Message: ", generatedMsg);
    } catch (error) {
      console.error("Error sending topic:", error);
    }
  };

  const handleGetBlog = async () => {
    try {
      if (msg) {
        const generatedHeading = await executeDryrun(msg);
        console.log("Generated Heading: ", generatedHeading);
        setHeading(generatedHeading);
      } else {
        console.error("Message is not set. Please send the topic first.");
        setHeading("Error generating blog");
      }
    } catch (error) {
      console.error("Error getting blog:", error);
      setHeading("Error generating blog");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        onClick={handleSendTopic}
        className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-4"
      >
        Send Topic
      </button>
      <button
        onClick={handleGetBlog}
        className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Get Blog
      </button>
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
      {heading && (
        <div className="mt-6 p-4 bg-gray-200 rounded">
          <div className="text-xl font-bold">{heading}</div>
        </div>
      )}
    </div>
  );
};

export default BlogGenerator;
