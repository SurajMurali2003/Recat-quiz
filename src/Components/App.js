import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questionss from "./Questionss";
import NextBtn from "./NextBtn";
import Progress from "./Progress";
import { useQuiz } from "../Contexts/QuizContext.Provider";

export default function App() {
  const { status } = useQuiz();
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}

        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Questionss />
            <NextBtn />
          </>
        )}
      </Main>
    </div>
  );
}
