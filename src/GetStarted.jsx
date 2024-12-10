import { useState } from "react";
import { CaretLeft, PencilFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import Banner from "./Banner";

const buttonClasses = [
  "card-gradient-1",
  "card-gradient-2",
  "card-gradient-3",
  "card-gradient-4",
  "card-gradient-5",
  "card-gradient-6",
];
const firstQuestion = "familyType";

const questions = {
  familyType: {
    question: "What Best Describes Your Family?",
    options: [
      {
        option: "I'm Single",
      },
      {
        option: "I'm With Friends",
        nextQuestion: "friends",
      },
      {
        option: "I'm With My Significant Other",
      },
      {
        option: "I Have Young Children",
        nextQuestion: "children",
      },
      {
        option: "I Have Older Children",
        nextQuestion: "children",
      },
      {
        option: "I'm an Empty Nester",
      },
    ],
    nextQuestion: "time",
  },
  friends: {
    question: "How Many Friends Are With You?",
    options: [
      {
        option: "1-3",
        answer: "I'm With 1-3 Friends",
      },
      {
        option: "4-6",
        answer: "I'm With 4-6 Friends",
      },
      {
        option: "7-10",
        answer: "I'm With 7-10 Friends",
      },
      {
        option: "11+",
        answer: "I'm With 11+ Friends",
      },
    ],
    nextQuestion: "time",
  },
  children: {
    question: "How Many Children Do You Have?",
    options: [
      {
        option: "1-2",
        answer: "I Have 1-2 Children",
      },

      {
        option: "3-4",
        answer: "I Have 3-4 Children",
      },
      {
        option: "5-6",
        answer: "I Have 5-6 Children",
      },
      {
        option: "6+",
        answer: "I Have 6+ Children",
      },
    ],
    nextQuestion: "time",
  },
  time: {
    question: "How Much Time Do You Have?",
    options: [
      {
        option: "15-30 minutes",
        answer: "I Have 15-30 minutes",
      },
      {
        option: "30-60 minutes",
        answer: "I Have 30-60 minutes",
      },
      {
        option: "1-2 hours",
        answer: "I Have 1-2 hours",
      },
    ],
    nextQuestion: "kind",
  },
  kind: {
    question: "What Kind of Activity Do You Want to Do?",
    options: [
      {
        option: "Something Spiritual",
        answer: "I Want Something Spiritual",
        nextQuestion: "spiritual",
      },
      {
        option: "A Game",
        answer: "I Want to Play a Game",
        nextQuestion: "game",
      },
      {
        option: "Service",
        answer: "I Want to Do Service",
        nextQuestion: "service",
      },
    ],
    nextQuestion: "end",
  },
  service: {
    question: "Who Do You Want to Serve?",
    options: [
      {
        option: "Loved One",
        answer: "I Want to Serve a Loved One",
      },
      {
        option: "Community",
        answer: "I Want to Serve the Community",
      },
      {
        option: "Church",
        answer: "I Want to Serve my Church",
      },
    ],
    nextQuestion: "end",
  },
  game: {
    question: "What Kind of Game Do You Want to Play?",
    options: [
      {
        option: "Active",
        answer: "I Want an Active Game",
      },
      {
        option: "Relaxed",
        answer: "I Want a Relaxed Game",
      },
    ],
    nextQuestion: "end",
  },
  spiritual: {
    question: "What Kind of Spiritual Activity Do You Want to Do?",
    options: [
      {
        option: "Scripture Study",
        answer: "I Want to Study the Scriptures",
        nextQuestion: "study",
      },
      {
        option: "Object Lesson",
        answer: "I Want an Object Lesson",
      },
      {
        option: "Family History",
        answer: "I Want to Learn About Family History",
        nextQuestion: "familyHistory",
      },
      {
        option: "Missionary Work",
        answer: "I Want to Do Missionary Work",
        nextQuestion: "missionary",
      },
    ],
    nextQuestion: "end",
  },
  familyHistory: {
    question: "What Do You Want to Do?",
    options: [
      {
        option: "Learn About Ancestors",
        answer: "I Want to Learn About Ancestors",
      },
      {
        option: "Indexing",
        answer: "I Want to Index",
      },
      {
        option: "Temple Work",
        answer: "I Want to Do Temple Work",
      },
    ],
    nextQuestion: "end",
  },
  missionary: {
    question: "What Do You Want to Do?",
    options: [
      {
        option: "Study Preach My Gospel",
        answer: "I Want to Study Preach My Gospel",
      },
      {
        option: "Invite a Friend to Church",
        answer: "I Want to Invite a Friend to Church",
      },
    ],
    nextQuestion: "end",
  },
  study: {
    question: "What Do You Want to Study?",
    options: [
      {
        option: "The Standard Works",
        nextQuestion: "scriptures",
        answer: "I Want to Study the Standard Works",
      },
      {
        option: "General Conference",
        answer: "I Want to Study General Conference",
      },
      {
        option: "Church History",
        answer: "I Want to Study Church History",
      },
    ],
    nextQuestion: "end",
  },
  scriptures: {
    question: "Which Standard Work?",
    options: [
      {
        option: "Book of Mormon",
        answer: "I Want to Study the Book of Mormon",
      },
      {
        option: "Bible",
        answer: "I Want to Study the Bible",
      },
      {
        option: "Doctrine and Covenants",
        answer: "I Want to Study the Doctrine and Covenants",
      },
      {
        option: "Pearl of Great Price",
        answer: "I Want to Study the Pearl of Great Price",
      },
      {
        option: "Surprise Me!",
        answer: "I Want to Be Surprised!",
      },
    ],
    nextQuestion: "end",
  },
};

export default function GetStarted() {
  const [currentQuestion, setCurrentQuestion] = useState(firstQuestion);
  const [answers, setAnswers] = useState([]);
  const [reviewing, setReviewing] = useState(false);
  const navigate = useNavigate();

  const selectOption = (option) => {
    const nextQuestion = option.nextQuestion || questions[currentQuestion].nextQuestion;

    setAnswers((answers) => [
      ...answers,
      {
        questionId: currentQuestion,
        question: questions[currentQuestion].question,
        answer: option.option,
        display: option.answer || option.option,
      },
    ]);
    setCurrentQuestion(nextQuestion === "end" ? firstQuestion : nextQuestion);

    if (nextQuestion === "end") {
      setReviewing(true);
    }
  };

  const getResults = () => {
    localStorage.setItem("answers", JSON.stringify({ answers, id: Math.random() }));
    navigate("/my-plan");
  };

  buttonClasses.sort(() => Math.random() - 0.5);

  const goBack = () => {
    const lastAnswer = answers[answers.length - 1] || { questionId: firstQuestion };
    const lastQuestion = lastAnswer.questionId;
    setCurrentQuestion(lastQuestion);
    setAnswers((answers) => answers.slice(0, answers.length - 1));
  };

  const reviewOption = (option) => {
    setReviewing(false);
    setCurrentQuestion(option);
    setAnswers((answers) =>
      answers.slice(
        0,
        answers.findIndex((answer) => answer.questionId === option),
      ),
    );
  };

  return (
    <div id="get-started">
      <Banner
        title="Plan the Perfect FHE"
        description="Choose the perfect FHE for YOUR unique family."
      />
      <div className="mx-auto" style={{ maxWidth: "1200px" }}>
        {reviewing ? (
          <>
            <div className="d-flex justify-content-center align-items-center position-relative">
              <Question question="Almost Ready! Review Your Choices:" />
            </div>
            <div className="text-center lead fs-3 mb-4">You Selected:</div>
            <div className="d-flex justify-content-center flex-wrap">
              {answers.map((answer, i) => (
                <ReviewButton
                  i={i}
                  key={i}
                  text={answer.display}
                  onClickParams={answer.questionId}
                  onClick={reviewOption}
                />
              ))}
            </div>
            <div className="text-center mt-2 mb-4 lead fs-6">
              Tip: Click a box to change your response.
            </div>
            <div className="d-flex justify-content-center my-4 pb-5">
              <button onClick={getResults} className="btn btn-primary btn-lg">
                I'm Ready! Generate My Plan!
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="my-3 d-flex justify-content-center align-items-center position-relative">
              {currentQuestion !== firstQuestion && (
                <button
                  onClick={goBack}
                  className="d-none d-sm-inline btn position-absolute left-0"
                >
                  <CaretLeft className="fs-3" />
                </button>
              )}

              <Question question={questions[currentQuestion].question} />
            </div>
            <div className="d-flex justify-content-center flex-wrap mb-5 pb-5">
              {questions[currentQuestion].options.map((option, i) => (
                <ChoiceButton
                  i={i}
                  key={option.option}
                  text={option.option}
                  onClickParams={option}
                  onClick={selectOption}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Question({ question }) {
  return <h1 className="text-center display-5 my-2">{question}</h1>;
}

export function ReviewButton({ i, text, onClickParams, onClick }) {
  const [showEdit, setEdit] = useState(false);
  return (
    <button
      className={`grows review-button btn btn-primary position-relative ${buttonClasses[i]}`}
      onClick={() => onClick(onClickParams)}
      onMouseEnter={() => setEdit(true)}
      onMouseLeave={() => setEdit(false)}
    >
      {text}
      {showEdit && (
        <PencilFill className="position-absolute top-0 end-0 translate-middle mt-3 fs-5" />
      )}
    </button>
  );
}

function ChoiceButton({ i, text, onClickParams, onClick }) {
  return (
    <button
      className={`grows choice-button btn btn-primary ${buttonClasses[i]}`}
      onClick={() => onClick(onClickParams)}
    >
      {text}
    </button>
  );
}
