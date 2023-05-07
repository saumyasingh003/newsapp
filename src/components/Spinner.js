import React, {} from 'react'
import loading from  '../loading2.gif'
const Spinner =()=> {
  return (
      <div className="text-center " >
       <img className='my-2' src={loading} style={{height:30}} alt="loading"/>
        </div>
    )
  }


export default Spinner