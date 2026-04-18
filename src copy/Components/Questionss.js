import Options from "./Options";

function Questionss({ questions, dispatch, answer }) {
  console.log(questions);

  return (
    <div>
      <h4>{questions.question} </h4>

      <div className="">
        <Options questions={questions} dispatch={dispatch} answer={answer} />
      </div>
    </div>
  );
}

export default Questionss;
