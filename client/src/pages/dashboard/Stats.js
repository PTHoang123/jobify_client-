import React from 'react'
import { useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import {StatsContainer, Loading, ChartsContainer} from '../../components'

function Stats() {
  const  {showStats, isLoading, monthlyApplication} = useAppContext()
  useEffect(() => {
    showStats()
  }, [])
  if(isLoading){
    return <Loading center/>
  }
  return (
    <>  
    <StatsContainer/>
    {monthlyApplication.length > 0 && <ChartsContainer/> } 
    </>
  )
}

export default Stats