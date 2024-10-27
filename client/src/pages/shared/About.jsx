import { Card } from '@material-tailwind/react'
import React from 'react'

export const About = () => {
  return (
     <div className="flex justify-center items-center pt-10  bg-gray-100">
   <Card className='w-2/4 p-6'>
        <p className='text-black font-bold flex justify-center'>
      Industry pioneer
      Being among the first few entrants,Delicacy has successfully pioneered the hyperlocal commerce industry in India, launching Food Delivery in 2018 and Quick Commerce in 2020.
       Due to the pioneering status of Delicacy, it is well-recognised as a leader in innovation in hyperlocal commerce and as a brand synonymous with the categories it is present in.
      </p>
      <img  className="mt-8 mb-2 pl-12  max-w-screen-lg sm:w-96" src="https://res.cloudinary.com/dmv3ax1yt/image/upload/v1729102867/bg1_aagyyw.avif" alt='app image'/>
      </Card>
    </div>
  )
}
