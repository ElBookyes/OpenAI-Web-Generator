import { useState } from "react";
import useTypingText from "./customHooks/useTypingText";
import toast, { Toaster } from "react-hot-toast"

export default function Form({ setGenerated, setRaw, setIsLoading }) {
  const notify = () => toast.error('Please fill out at least one field before you create');
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

  const checkIfPromptEmpty = (obj) => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] !== "") {
          return false;
        }
      }
    }
    return true;
  }

  const handleClick = async () => {
    try {
      const body = {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content:
              "Create a single-page website with a navigation bar styled using CSS flexbox properties. Let the website title be in the header. Include a dropdown menu within the navigation bar offering options for Products, Pricing, and FAQ. Integrate an interactive contact form in the Contact section, ensuring form validation. Ensure responsive layout using CSS Grid or Flexbox. Include the following content: " + JSON.stringify(prompt),
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
      console.log(data);
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
            checkIfPromptEmpty(prompt) ? notify() : handleClick() && setIsLoading(true);
          }}
        >
          Create
        </button>
        <Toaster />
      </main>
      <footer className="spacer layer1"></footer>
    </>
  );
}
