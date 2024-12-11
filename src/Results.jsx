import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { getChatGPTResponse } from "./ChatGpt.js";
import Banner from "./Banner";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";

const buttonClasses = [
  "card-gradient-1",
  "card-gradient-2",
  "card-gradient-3",
  "card-gradient-4",
  "card-gradient-5",
  "card-gradient-6",
];

export default function Results() {
  const [results, setResults] = useState("");
  const answers = JSON.parse(localStorage.getItem("answers") || "{}").answers;

  const generateNewPlan = (forceRefresh = false) => {
    const answers = JSON.parse(localStorage.getItem("answers") || "{}");
    const lastResult = JSON.parse(localStorage.getItem("lastResult") || "{}");

    if (!forceRefresh && answers.id === lastResult.id) {
      setResults(lastResult.data);
      return;
    }

    setResults(null);
    const finalAnswers = {};

    answers.answers.forEach((answer) => {
      finalAnswers[answer.question] = answer.prompt ?? answer.display;
    });
    let proompt =
      "Meant to help someone plan their Family Home Evening. They are a member of The Church of Jesus Christ of Latter-day Saints. They want to have a spiritual experience, and they want to have fun.  Personalize the recommendations as much as possible to fit their requirements. Keep all activities centered on Jesus Christ. They want to have a very brief spiritual thought (no longer than 10 minutes), a main activity, and a treat (no longer than 20 minutes). Here is some info about them in question/answer format:\n\n";

    Object.entries(finalAnswers).forEach(([question, answer]) => {
      proompt += `Q: ${question}\nA: ${answer}\n\n`;
    });

    proompt +=
      "Based on this information, make a plan for their FHE. Wherever possible, include references to scriptures, conference talks, or other church materials. Make sure to include a brief spiritual thought, an activity, and a treat.";

    getChatGPTResponse(proompt).then((data) => {
      setResults(data);
      if (data) localStorage.setItem("lastResult", JSON.stringify({ id: answers.id, data }));
    });
  };

  useEffect(() => {
    generateNewPlan();
  }, []);

  return (
    <div>
      <Banner
        title="Your Plan"
        description="Here's an idea for a plan for this week's FHE!"
        gradient="2"
      />
      <div className="justify-content-center flex-wrap my-3 d-none d-sm-flex">
        {answers.map((answer, i) => (
          <ReviewButton i={i} key={i} text={answer.display} onClickParams={answer.questionId} />
        ))}
      </div>
      <div className="mx-auto pb-5 px-3" style={{ maxWidth: "1048px" }}>
        {!results ? (
          <div>
            <h1 className="display-5 my-4">Generating a Plan...</h1>
            <Skeleton count={5} />
            <div className="mx-5 py-4">
              While you're waiting for your results, send me some feedback at{" "}
              <a href="mailto:corbanpro@gmail.com">corbanpro@gmail.com</a> if you like the app or if
              you have any suggestions for improvement. Really! Send me an email!
            </div>
            <Skeleton count={5} />
          </div>
        ) : (
          <>
            <h1 className="display-5 my-4">Your Plan</h1>
            <ReactMarkdown>{results}</ReactMarkdown>
            <hr className="mt-5" />
            <div className="d-flex justify-content-between">
              <div>
                Want to start over? <Link to={"/get-started"}>Start a new plan</Link>
              </div>
              <div>
                Send feedback to <a href="mailto:corbanpro@gmail.com">corbanpro@gmail.com</a>
              </div>
              <div>
                Don't like the results?{" "}
                <a href="#" onClick={() => generateNewPlan(true)}>
                  Generate a new plan
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function ReviewButton({ i, text }) {
  return (
    <button
      className={`review-button btn btn-primary position-relative ${buttonClasses[i]} pointer-auto`}
    >
      {text}
    </button>
  );
}
