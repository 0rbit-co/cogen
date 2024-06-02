import { useState } from "react";
import { createMessage, executeDryrun } from "../utils/getBlog";
import Warning from "./Warning";

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
    <div className="flex flex-col items-center justify-center pt-10">
      <div className="text-center text-stone-800 text-[35px] font-medium font-raleway leading-[44.93px]">
        Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet
        consectetur
      </div>
      <div className="flex items-center gap-8 mt-8">
        <div className="">
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-[705px] h-[52px] bg-transparent rounded-[7px] border-2 border-black px-6"
            placeholder="Add Your Topic Here"
          />
        </div>
        <button
          onClick={handleGenerateBlog}
          className="w-40 py-2 text-white bg-[#25291C] border-2 border-transparent rounded-md hover:bg-transparent hover:border-2 hover:border-[#25291C] hover:text-[#25291C] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Generate Blog!
        </button>
      </div>
      <div className="w-full flex justify-center">
        {loading && (
          <div className="border-2 border-[#25291C] w-3/4 rounded-lg mt-10 h-80 flex justify-center items-center">
            <div className="text-xl font-bold flex">
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
          </div>
        )}
      </div>
      <div className="w-full flex justify-center">
        {!loading && heading && (
        <div className="border-2 border-[#25291C] w-3/4 p-4 justify-evenly rounded-lg mt-10 min-h-80 flex items-center">
            <div className="text-[#25291C] flex justify-center items-center text-xl font-semibold font-['Raleway'] leading-[25px] tracking-wide">{heading}</div>
          </div>
        )}
      </div>
      <div className="py-8">
      <Warning />
      </div>
    </div>
  );
};

export default BlogGenerator;
