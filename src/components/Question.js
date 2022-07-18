import { useState, useEffect } from "react";
const Question = ({ question, checkAnswer, questionIndex, totalCountArray, setTotalCount, playAgain }) => {
  const { question: Question, correct_answer, incorrect_answers } = question;
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const cleanUp = (item) => {
    if (typeof item === "object") {
      item = item.join("!*!");
      item = item.replaceAll("&quot;", '"');
      item = item.replaceAll("&#039;", "'");
      item = item.replaceAll("&eacute;", "é");
      item = item.replaceAll("&aacute;", "á");
      item = item.replaceAll("&ntilde;", "ñ");
      item = item.replaceAll("&oacute;", "ó");
      item = item.replaceAll("&deg;", "°");

      return item.split("!*!");
    }
    item = item.replaceAll("&quot;", '"');
    item = item.replaceAll("&#039;", "'");
    item = item.replaceAll("&deg;", "°");
    item = item.replaceAll("&eacute;", "é");
    item = item.replaceAll("&aacute;", "á");
    item = item.replaceAll("&oacute;", "ó");
    item = item.replaceAll("&ntilde;", "ñ");

    return item;
  };
  let combinedAnswers = [correct_answer, ...incorrect_answers].sort(
    (a, b) => a.localeCompare(b)
  );
  const cleanedUpQuestion = cleanUp(Question);
  const cleanedUpAnswers = cleanUp(combinedAnswers);
  const cleanedUpCorrectAnswer = cleanUp(correct_answer)
  const indexOfCorrectAnswer = cleanedUpAnswers.indexOf(cleanedUpCorrectAnswer)

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


  const obj = (index) => {
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


  return (
    <div className="question-container">
      <h1 className="question-title">{cleanedUpQuestion}</h1>

      {cleanedUpAnswers.map((answer, index) => (
        <button
          key={index}
          onClick={() => handleClick(index)}
          style={obj(index)}
        >
          {answer}
        </button>
      ))}

    </div>
  );
};

export default Question;
