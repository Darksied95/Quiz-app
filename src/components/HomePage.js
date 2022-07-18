import { useRef } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import Questions from './Questions';


const HomePage = () => {
    const mainRef = useRef()
    const questionRef = useRef()
    const handleClick = () => {
        mainRef.current.style.display = "none";
        questionRef.current.style.display = "block"
    }
    return (
        <>

            <div className='lemon'>
            </div>
            <main ref={mainRef} className="main">
                <h1 className='title'>Quizzical</h1>
                <p className='description'>Some description if needed</p>
                <Link to='/'>  <button className='start-quiz-button' onClick={handleClick}>Start quiz</button></Link>
            </main>
            <Routes>
                <Route path='/' element={<div ref={questionRef} style={{ display: "none" }} ><Questions /></div>} />
            </Routes>
            <div className='blue'></div>
        </>
    )
}

export default HomePage