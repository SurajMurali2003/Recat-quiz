import Options from "./Options";
import { useQuiz } from "../Contexts/QuizContext.Provider";

function Questionss() {
  const { questions, dispatch, answer, index } = useQuiz();

  return (
    <div>
      <h4>{questions[index]?.question} </h4>

      <div className="">
        <Options
          questions={questions[index]}
          dispatch={dispatch}
          answer={answer}
        />
      </div>
    </div>
  );
}

export default Questionss;
