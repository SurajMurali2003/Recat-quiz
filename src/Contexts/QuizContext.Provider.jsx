import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

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

function QuizContextProvider({ children }) {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  console.log("points", points);

  const numOfQuestions = questions?.length;
  console.log("questions", questions);

  const maxpoints = questions?.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(function () {
    async function getQuestions() {
      try {
        const res = await fetch("/data/questions.json");
        console.log("res", res);

        const data = await res.json();

        dispatch({ type: "dataReceived", payload: data?.questions });
      } catch (error) {
        console.log(error);
        dispatch({ type: "errorReceived", payload: error.message });
      }
    }
    getQuestions();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        numOfQuestions,
        index,
        maxpoints,
        points,
        answer,
        status,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext was used outside of quizContextProvider");
  return context;
}

export { QuizContextProvider, useQuiz };
