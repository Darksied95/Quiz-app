import Question from "./Question"
import axios from "axios"
import { useState, useEffect } from "react";

const Questions = () => {
    const [questions, setQuestions] = useState([]);
    const [questionLength, setQuestionLength] = useState(0)
    const [checkAnswer, setCheckAnswer] = useState(false);
    const [totalCountArray, setTotalCount] = useState([]);
    const [playAgain, setPlayAgain] = useState(true)
    let totalCount = 0
    const getQuestions = async () => {
        const { data } = await axios.get("https://opentdb.com/api.php?amount=5&type=multiple");
        setQuestions(data.results)
        setQuestionLength(data.results.length)
        setPlayAgain(false)
    }
    const handlePlayAgain = () => {
        setQuestionLength(0)
        setCheckAnswer(false)
        setTotalCount([])
        setPlayAgain(true)
        getQuestions()
    }

    const handleCheckAnswer = () => {
        setCheckAnswer(true)
    }

    useEffect(() => {
        getQuestions();
        console.log("done");
    }, [])


    useEffect(() => {
        let emptyArray = Array(questionLength).fill(0);
        setTotalCount(emptyArray)
    }, [questionLength]);


    if (checkAnswer) {
        totalCount = totalCountArray.reduce((acc, cv) => acc + cv, 0)
    }
    if (!questionLength) {
        return <div className="loading">Loading...</div>
    }
    return (
        <>
            <div className="lemon"></div>
            {questions.map((question, index) => <Question key={index}
                question={question}
                checkAnswer={checkAnswer}
                questionIndex={index}
                playAgain={playAgain}
                totalCountArray={totalCountArray}
                setTotalCount={setTotalCount} />)}

            {!checkAnswer
                ? <button className='check-answer-button' onClick={handleCheckAnswer}>Check answers</button>
                : <div className="game-over">
                    <p>You scored {totalCount}/{questionLength} correct answers</p>
                    <button onClick={handlePlayAgain}>Play again</button>
                </div>
            }
            <div className="blue"></div>

        </>
    )
}

export default Questions