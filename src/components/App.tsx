import React from "react";
import LandingPage from './pages/LandingPage'
import {useSelector} from 'react-redux'
import { RootState } from '../redux/store';


export default function App() {
  let page = useSelector((state:RootState)=>state.page)

  console.log(page)

  return (
    <div>
      <LandingPage />
      {/* <Modal id={useSelector(state => state.modalType.id)} type={useSelector(state => state.modalType.type)} onClose={() => dispatch(closeModal())} /> */}

    </div>
  )
}

