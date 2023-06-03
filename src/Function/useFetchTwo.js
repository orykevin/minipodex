import React,{useState,useEffect} from 'react'
import axios from 'axios'

function useFetch(url) {

  const [data2,setData] = useState(null)
  const [error2,setError] = useState(null)
  const [loading2,setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        axios.get(url).then((response)=>{
            setData(response)
        }).catch((err) =>{
            setError(err)
        })

    },[url])

    return {data2,error2,loading2}
}

export default useFetch