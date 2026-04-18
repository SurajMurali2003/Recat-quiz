function Options({ questions, dispatch, answer }) {
  console.log(answer);

  return (
    <div className="options">
      {questions?.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""}
          ${
            answer !== null
              ? questions?.correctOption === index
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
