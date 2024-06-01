import fetch from "node-fetch";

const requestBody = {
  topic: "Submarine", // Replace 'Your topic here' with the actual topic
};

fetch("http://localhost:3000/generate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(requestBody),
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
