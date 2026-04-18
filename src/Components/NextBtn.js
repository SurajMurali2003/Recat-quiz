import { useQuiz } from "../Contexts/QuizContext.Provider";

function NextBtn() {
  const { dispatch, answer } = useQuiz();
  console.log(dispatch);

  if (answer === null) return null;

  return (
    <div>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "NextQuestion" })}
      >
        Next{" "}
      </button>
    </div>
  );
}

export default NextBtn;
