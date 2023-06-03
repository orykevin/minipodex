import React,{useState,useEffect,useRef} from 'react'
import guessImg from "../../Images/guess-bg.png"
import VersusSearch from './VersusSearch'
import useFetch from '../../Function/useFetch'
import TimerComp from '../../Function/TimerComp'
import guessBall from '../../Images/pokeball-color.png'
import lightBulb from "../../Images/lightbulb-regular.svg"
import lightBlue from "../../Images/lightbulb-blue.svg"
import backBtn from "../../Images/arrow-btn.svg"
import GuessHint from '../../Component/minicomp/GuessHint'


function GuessLobby({datas,setGuess}) {
  const [random,setRandom] = useState(null)
  const [picked,setPicked] =useState(null)
  const [submited,setSubmited] = useState(0)
  const [correct,setCorrect] = useState(false)
  const [tried,setTry] = useState(1)
  const [history,setHistory] = useState([])
  const [loaded,setLoaded] = useState(false)
  const [score,setScore] = useState(0)
  const [hint,setHint] = useState(false)

  useEffect(()=>{
    setRandom(setRandoms())
  },[datas])

  useEffect(()=>{
    setLoaded(false)
  },[random])
  
  useEffect(()=>{
    if(submited === 3 && tried < 10){
      setTimeout(()=>{
        skipHandler()
      },2000)
    }
  },[submited])

  const setRandoms = () =>{
   let randomness = Math.floor(Math.random()*datas.length)
   if(!history.includes(randomness)){
    return randomness
  }
   while(history.includes(randomness)){
    randomness = Math.floor(Math.random()*datas.length);
    if(!history.includes(randomness)){
      return randomness
    }
   }
  }

  const fixingText = (str) =>{
    str = str.replace(/-/g, " ");
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const {data,error,loading} = useFetch(random && datas[random].url)
  //if(data) console.log(data.data)


  const skipHandler = () =>{
    setTry(tried+1)
    if(tried<=10){
    console.log("cleared")
    setHistory([...history,random])
    if(tried <= 9){
      setRandom(setRandoms())
    }
    setSubmited(0)
    setCorrect(false)
    setPicked(null)
    }
  }
  
  const submitHandler = () =>{
    if(submited<3 && picked){
    setSubmited(submited+1)
    if(picked.id === data.data.id){
      setHistory([...history,random])
      setCorrect(true)
      setTry(tried+1)
      setScore(score+1)
      if(tried<=9){
        console.log("tried "+ tried + "times")
        setTimeout(()=>{
          setCorrect(false)
          setSubmited(0)
          setRandom(setRandoms())
          setPicked(null)
          console.log("changed")
        },2000)
      }
    }
    }
  }
  const replayHandler = () =>{
    setTry(1);
    setCorrect(false)
    setScore(0)
    setRandom(setRandoms())
  }

  const correctColor = () =>{
    if(correct){
      return "green-bar"
    }else if(submited === 1 && !correct){
      return "orange-bar"
    }else if(submited === 3 &&  !correct){
      return "fail-bar"
    }else if(submited > 1 && !correct){
      return "red-bar"
    }
  }

   if(data) return (
    <div className='guess-main-cont'>
        <h1>Pokemon {tried < 10 ? tried : 10} / 10</h1>
        <img className='hint-btn' src={hint ? lightBlue : lightBulb} alt="" onClick={()=>setHint(!hint)} />
        {!hint && <img src={backBtn} className="back-btn" alt="" onClick={()=>setGuess(false)} />}
        <div className="bg-cont">
            {!loaded && <img className={`guess-ball pokeball-spin`} src={guessBall} alt="" />}
            <img className='guess-bg' src={guessImg} alt="" />
            {random &&  <img onLoad={()=>setLoaded(true)}  src={data.data.sprites.other["official-artwork"].front_default} alt="" className={`pokemon-question ${correct && "revealed"} ${!loaded ? "hide" :""}`} />}
            <div className="score-cont">
              <p>Score : {score}</p>
            </div>
        </div>
        {tried <= 10 && <div>
        <div className='time-cont'>
          {!loaded &&<h1>01:00</h1>}
          {loaded && <TimerComp  random={random} correct={correct} setCorrect={setCorrect} setSubmited={setSubmited} setRandom={setRandom} setPicked={setPicked} setRandoms={setRandoms} setTry={setTry} tried={tried} setHistory={setHistory} history={history} />}
        </div>
        <div className={`submited-cont ${correctColor()}`}>
            <p>{picked ? fixingText(picked.species.name) : "-"}</p>
            <span>({submited}/3)</span>
        </div>
        <div className='guess-search-cont'>
        {<VersusSearch datas={datas} guess={true} setPicked={setPicked} /> }
        </div>
        <div className="submit-cont">
          <div className="btn-cont">
          <button className='submit-btn' onClick={()=>submitHandler()}>SUBMIT</button>
          <button className='skip-btn' onClick={()=>skipHandler()}>SKIP</button>
          </div>
        </div>
        </div>}
        {tried > 10 &&<div>
          <h1>Your Score is : {score}</h1>
          <div className="submit-cont">
          <div className="btn-cont final-btn-cont">
          <button className='submit-btn' onClick={()=>replayHandler()} >RE PLAY</button>
          <button className='skip-btn' >EXIT</button>
          </div>
          </div>
        </div>}
        {hint && <GuessHint setHint={setHint} url={data.data.species.url} pData={data.data} submited={submited} />}
    </div>
  )
}

export default GuessLobby