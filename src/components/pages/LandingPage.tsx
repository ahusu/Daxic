import React from "react";
import { useState } from "react";


export default function LandingPage() {

  return (
    <div>
      <h1>Welcome to Daxis! Click add a disc to get started!</h1>
      <div className='flex'>
        <div onClick={()=>{}}>
          <h3> Click here to add a disc!</h3>
        </div>
      </div>
    </div>
  )
}

