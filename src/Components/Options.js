import { useQuiz } from "../Contexts/QuizContext.Provider";

function Options() {
  const { questions, dispatch, answer, index } = useQuiz();

  const question = questions[index];

  return (
    <div className="options">
      {question?.options?.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""}
          ${
            answer !== null
              ? question?.correctOption === index
                ? "correct"
                : "wrong"
              : ""
          } 
          `}
          key={option}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
