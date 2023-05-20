import React from 'react'
import { FaBug,FaSuitcaseRolling,FaCalendar } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/StatsContainer'
import { useAppContext } from '../context/appContext'
import StatsItem from './StatsItem'


function StatsContainer() {
  const {stats} = useAppContext()
  const defaultStats = [
    {
        title: 'pending Application',
        count: stats.pending || 0,
        icon: <FaSuitcaseRolling/>,
        color: '#e9b949',
        bcg: '#fcefc7',
    },
    {
        title: 'interviews scheduled',
        count: stats.interview || 0,
        icon: <FaCalendar/>,
        color: '#647acb',
        bcg: '#e0e89f',
    },
    {
        title: 'job declined',
        count: stats.declined || 0,
        icon: <FaBug/>,
        color: '#d66a6a',
        bcg: '#ffeeee',
    }
  ]
  return (
    <Wrapper>
        {defaultStats.map((item, index)=> {
            return <StatsItem key={index} title = {item.title} color={item.color} bcg={item.bcg} count={item.count} icon={item.icon}/>
        })}
    </Wrapper>
  )
}

export default StatsContainer