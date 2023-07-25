import React from "react";
import Landing from './pages/Landing'
import Stats from './pages/Stats'
import Recs from './pages/Recs'
import Learn from './pages/Learn'
import Modal from './Modal'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store';
import { changePage } from '../redux/reducers/pageSlice';
import { openModal } from '../redux/reducers/openModalSlice';

export default function App() {
  let page = useSelector((state: RootState) => state.page).page
  let pages = ['stats', 'learn', 'recs']
  let dispatch = useDispatch();


  const navClick = (title: string) => {
    if (title==='add') {
      dispatch(openModal(1))

    } else {
      dispatch(changePage(title))
    }
  }


  let display: React.JSX.Element | null = null;

  switch (page) {
    case 'landing':
      display = <Landing key='landing' />;
      break;
    case 'stats':
      display = <Stats key='stats' />;
      break;
    case 'recs':
      display = <Recs key='recs' />;
      break;
    case 'learn':
      display = <Learn key='learn' />;
      break;
  }

  return (
    <div>
      <div id='navbar' className="flex w-2/3 w-10/12 m-4 p-4 m-auto">
      <div className="h-6 w-14" onClick={() => { navClick('add') }}><h3>Add a disc</h3></div>
        {pages.map((title) => {
          return (<div className="h-6 w-14" onClick={() => { navClick(title) }}><h3>{title}</h3></div>)
        })}
      </div>
      {display}
      {useSelector((state:RootState)=>state.openModal.open)?<Modal />:null}

    </div>
  )
}

