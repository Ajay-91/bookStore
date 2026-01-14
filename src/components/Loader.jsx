import React from 'react'
import loadingImage from '../assets/original-eafb1f025003330fb3d1593f66991853.gif'

const Loader = () => {

  return (
    <div className='flex justify-center items-center h-full'>
        <img className='w-100 mt-50' src={loadingImage} alt="" />
    </div>
  )
}

export default Loader