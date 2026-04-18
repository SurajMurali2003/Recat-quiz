function NextBtn({ dispatch, answer }) {
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
