function Progress({
  questions,
  numOfQuestions,
  index,
  maxpoints,
  points,
  answer,
}) {
  return (
    <header className="progress">
      <progress max={numOfQuestions} value={index + Number(answer !== null)} />
      <p>
        Questions <strong> {index + 1} </strong> /{numOfQuestions}
      </p>
      <p>
        {points} / {maxpoints}
      </p>
    </header>
  );
}

export default Progress;
