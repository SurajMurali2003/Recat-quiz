import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questionss from "./Questionss";
import NextBtn from "./NextBtn";
import Progress from "./Progress";

const initialState = {
  questions: [],
  //"loading", "error", "reday", "active", "finished",
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "errorReceived":
      return { ...state, questions: action.payload, status: "error" };
    case "start":
      return { ...state, status: "active" };

    case "newAnswer":
      const curentQuestion = state?.questions[state?.index];

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === curentQuestion.correctOption
            ? state.points + curentQuestion.points
            : state.points,
      };

    case "NextQuestion":
      console.log(state.index);

      return { ...state, index: state.index + 1, answer: null };

    default:
      throw new Error("Action Unknown");
  }
}

export default function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState
  );
  console.log("points", points);

  const numOfQuestions = questions?.length;
  const maxpoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(function () {
    async function getQuestions() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        // console.log("data", data);
        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        console.log(error);
        dispatch({ type: "errorReceived", payload: error.message });
      }
    }
    getQuestions();
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}

        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numOfQuestions={numOfQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              questions={questions}
              numOfQuestions={numOfQuestions}
              index={index}
              maxpoints={maxpoints}
              points={points}
              answer={answer}
            />
            <Questionss
              questions={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextBtn dispatch={dispatch} answer={answer} />
          </>
        )}
      </Main>
    </div>
  );
}
