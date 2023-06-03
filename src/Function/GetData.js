import React from 'react'
import useFetch from './useFetch'

function GetData(url) {
    const {data,error,loading} = useFetch(url)
    if(data) return (data.data)
}

export default GetData