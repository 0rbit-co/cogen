import React, { useState } from 'react';
import axios from 'axios';

const BlogGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleGenerateAndFetch = async () => {
    try {
      // Generate the blog post
      await axios.post('http://localhost:3000/generate', { topic });
      console.log('Blog Generated Successfully');

      // Fetch the generated blog post
      const response = await axios.get('http://localhost:3000/blog');
      console.log('Blog Fetched Successfully');
      setOutput(response.data.output);
      setError('');
    } catch (err) {
      setError('An error occurred during Blog Generation or Fetching');
      setOutput('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-center">Blog Generator</h1>
        <div className="mb-4">
          <label htmlFor="topic" className="block mb-2 text-sm font-medium text-gray-700">Enter Topic</label>
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
          onClick={handleGenerateAndFetch}
          className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Generate and Fetch
        </button>
        {output && (
          <div className="mt-6">
            <h2 className="mb-2 text-xl font-semibold">Generated Blog:</h2>
            <p className="p-4 bg-gray-100 border border-gray-200 rounded">{output}</p>
          </div>
        )}
        {error && (
          <div className="mt-6 text-red-500">{error}</div>
        )}
      </div>
    </div>
  );
};

export default BlogGenerator;