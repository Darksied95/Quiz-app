import { Link } from "react-router-dom";



const HomePage = () => {


    return (
        <>
            <div className='lemon'></div>
            <main className="main">
                <h1 className='title'>Quizzical</h1>
                <p className='description'>Think you're smart? Prove It...</p>
                <Link to='/questions'>  <button className='start-quiz-button'>Start quiz</button></Link>
            </main>
            <div className='blue'></div>
        </>
    )
}

export default HomePage