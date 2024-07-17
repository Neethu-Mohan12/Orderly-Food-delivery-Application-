import React from 'react'

const Banner = () => {
  return (

          <div className="flex justify-between items-start p-24 gap-8">
        <div className="w-1/2">
          <h1 className="text-4xl mb-4">Your <span className='text-orange-500'>Favourite</span></h1>
          <h1 className="text-4xl mb-4">Food at your</h1>
          <h1 className="text-4xl mb-4 text-orange-500">Doorstep</h1>
          <p className="mb-4">
            Discover the best food delivery service in town. Order your favorite meals from a variety of restaurants and enjoy quick and reliable delivery.
          </p>
         
        </div>
        <div className="flex w-1/2 justify-center items-center gap-4">
          <img src="./images/img1.jpg" alt="Delicious food 1" className="w-1/3 rounded-lg" />
          <img src="./images/img2.jpg" alt="Delicious food 2" className="w-1/4 rounded-lg" />
        </div>
    </div>
  )
}

export default Banner
