import React,{useState,useEffect} from 'react'
import axios from 'axios'

function useFetch(url) {

  const [data,setData] = useState(null)
  const [error,setError] = useState(null)
  const [loading,setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        axios.get(url).then((response)=>{
            setData(response)
        }).catch((err) =>{
            setError(err)
        })

    },[url])

    return {data,error,loading}
}

export default useFetch