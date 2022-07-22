import { useState, useEffect } from "react";
const Question = ({ question, checkAnswer, questionIndex, totalCountArray, setTotalCount, playAgain }) => {
  const { question: Question, correct_answer, incorrect_answers } = question;
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const combinedAnswers = [correct_answer, ...incorrect_answers].sort((a, b) => a.localeCompare(b));
  const indexOfCorrectAnswer = combinedAnswers.indexOf(correct_answer)

  let styles = {
    backgroundColor: "#D6DBF5",
    border: 0,
    padding: "0.65em 1.1em",
  };

  useEffect(() => {
    if (playAgain) {
      setSelectedAnswer("")
    }
  }, [playAgain])
  const handleClick = (index) => {
    if (index === indexOfCorrectAnswer) {
      const newArray = [...totalCountArray]
      newArray[questionIndex] = 1;
      setTotalCount(newArray);
    } else {
      const newArray = [...totalCountArray]
      newArray[questionIndex] = 0;
      setTotalCount(newArray);
    }
    setSelectedAnswer(index);
  };


  const setCorrectAnswerStyle = (index) => {
    if (checkAnswer) {
      let successStyles = {
        backgroundColor: "#94D7A2",
        opacity: 1
      }
      let dangerStyles = {
        backgroundColor: "#F8BCBC",
        opacity: 0.5
      }
      let blandStyles = {
        opacity: 0.5
      }
      if (index === selectedAnswer && index === indexOfCorrectAnswer) {
        return successStyles
      }
      if (index === selectedAnswer && index !== indexOfCorrectAnswer) {
        return dangerStyles
      }
      if (index === indexOfCorrectAnswer) {
        return successStyles
      }
      if (index !== indexOfCorrectAnswer) {
        return blandStyles
      }
    }
    return index === selectedAnswer ? styles : null;
  }

  function correctMarkUp(text) {
    return { __html: text }
  }
  return (
    <div className="question-container">
      <h1 className="question-title" dangerouslySetInnerHTML={correctMarkUp(Question)} />
      {combinedAnswers.map((answer, index) => {
        return <button
          key={index}
          onClick={() => handleClick(index)}
          style={setCorrectAnswerStyle(index)}
          dangerouslySetInnerHTML={correctMarkUp(answer)}
        />
      })}

    </div>
  );
};

export default Question;
