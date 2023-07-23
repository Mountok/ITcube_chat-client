import React, { useEffect, useState } from 'react'
import './HeadPage.css'
import { useLocation } from 'react-router-dom'
const HeadPage = () => {
  const [isRegist,setIsReg] = useState(false)
  const {state} = useLocation();

  if(state != null){
    useEffect(()=>{
    const {isreg} = state;
    setIsReg(isreg)  
    },[])
    
  }else{
    console.log('state is null')
  }


  return (
    <>
    {
      (isRegist)?(
        <div className='head_page'>
          <p>Home pages</p>
        </div>


      ):(
        <div className='error'>
          <p>Пацан шел к успеху не фортануло не получилось</p> 
          </div>

      )
    }

      
    </>

  )
}

export default HeadPage