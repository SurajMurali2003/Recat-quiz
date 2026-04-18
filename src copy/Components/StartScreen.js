function StartScreen({ numOfQuestions, dispatch }) {
  return (
    <div className="start">
      <h2> Welcome to the React Quiz</h2>
      <h3>{numOfQuestions} qurestions to Test your React Mastry </h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Lets Start{" "}
      </button>
    </div>
  );
}

export default StartScreen;
