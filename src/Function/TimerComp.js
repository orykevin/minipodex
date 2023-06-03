import React,{useState,useEffect} from 'react'

function TimerComp({random,correct,setCorrect,setSubmited,setRandom,setRandoms,setPicked,setHistory,history,setTry,tried}) {
  // initialize timeLeft with the seconds prop
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(()=>{
    setTimeLeft(60)
  },[random])

  useEffect(() => {
    if (!timeLeft || correct === true) {
      if(!correct){
        setRandom(setRandoms())
        setSubmited(0)
        setTry(tried+1)
        setHistory([...history,random])
        setPicked(null) 
      }
      return
    }

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const printTime =() =>{
    if(timeLeft > 59){
      return "01:00"
    }else if(timeLeft > 9){
      return "00:"+timeLeft
    }else{
      return "00:0"+timeLeft
    }
  }
  return (
    <div>
      <h1>{printTime()}</h1>
    </div>
  )
}

export default TimerComp