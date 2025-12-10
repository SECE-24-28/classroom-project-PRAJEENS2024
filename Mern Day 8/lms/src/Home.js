import React, { useEffect } from 'react'

function Home() {
  useEffect(() => {
    console.log("from useeffect in Home")

    return () => console.log("removed Home")
  }, [])

  return (
    <div>Home</div>
  )
}

export default Home