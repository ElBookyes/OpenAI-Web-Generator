import { useState } from "react";
import useTypingText from "./customHooks/useTypingText";

export default function Form({ setGenerated, setRaw, setIsLoading }) {
  const { word } = useTypingText(
    ["anything", "music", "movies", "anime", "fashion"],
    130,
    20
  );
  const [prompt, setPrompt] = useState({
    title: "",
    description: "",
    pages: "",
    targetAudience: "",
    font: "",
    colors: "",
    techStack: "",
  });

  const handleOnchange = (text, input) => {
    setPrompt((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleClick = async () => {
    try {
      const body = {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content:
              "Create a single-page website using the latest HTML, CSS, and JavaScript features. The website should feature a navigation bar styled using CSS flexbox properties, displaying links to Home, About, Services, and Contact sections. Include a dropdown menu within the navigation bar offering options for Products, Pricing, and FAQ. Implement an image gallery in the main section showcasing our latest products, with smooth scroll animations and hover effects applied throughout the website. Integrate an interactive contact form in the Contact section, ensuring form validation and error handling. Use lazy loading for images and content sections, customizable themes for user preference, and ensure a fully responsive layout adaptable to various screen sizes using CSS Grid and Flexbox. Additionally, integrate external APIs to fetch and display dynamic content such as weather forecasts or real-time data updates, enhancing the website's functionality and user engagement. Include the following content: " + JSON.stringify(prompt),
          },
        ],
      };
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: import.meta.env.VITE_AUTH_KEY,
          },
          body: JSON.stringify(body),
        }
      );
      const data = await response.json();
      setRaw(data.choices[0].message.content);
      setGenerated();
      setIsLoading(false);
    } catch (error) {
      console.error("Error generating webapp:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <main>
        <h1 className="title container">
          Create a website about
          <br /> {word} <br />
          in the split of a second
        </h1>
        <section className="form container">
          <input
            type="text"
            onChange={(e) => handleOnchange(e.target.value, "title")}
            placeholder="Title of website"
          />
          <input
            type="text"
            onChange={(e) => handleOnchange(e.target.value, "description")}
            placeholder="Description"
          />
          <input
            type="text"
            onChange={(e) => handleOnchange(e.target.value, "pages")}
            placeholder="What pages do you need"
          />
          <input
            type="text"
            onChange={(e) => handleOnchange(e.target.value, "targetAudience")}
            placeholder="Target audience"
          />
          <input
            type="text"
            onChange={(e) => handleOnchange(e.target.value, "font")}
            placeholder="Font"
          />
          <input
            type="text"
            onChange={(e) => handleOnchange(e.target.value, "colors")}
            placeholder="Colors"
          />
          <input
            type="text"
            onChange={(e) => handleOnchange(e.target.value, "techStacks")}
            placeholder="Tech stack"
          />
        </section>
        <button
          className="submit-button"
          onClick={() => {
            setIsLoading(true);
            handleClick();
          }}
        >
          Create
        </button>
      </main>
      <footer className="spacer layer1"></footer>
    </>
  );
}
