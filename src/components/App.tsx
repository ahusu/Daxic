import React from "react";
import Landing from './pages/Landing'
import Inventory from './pages/Inventory'
import Recs from './pages/Recs'
import Learn from './pages/Learn'
import AddDisc from './AddDisc'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store';
import { changePage } from '../redux/reducers/pageSlice';
import { openModal } from '../redux/reducers/openModalSlice';

export default function App() {
  let page = useSelector((state: RootState) => state.page).page
  let pages = ['Learn', 'Inventory', 'Recommendations']
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
    case 'Inventory':
      display = <Inventory key='Inventory' />;
      break;
    case 'Recommendations':
      display = <Recs key='recs' />;
      break;
    case 'Learn':
      display = <Learn key='learn' />;
      break;
  }

  return (
    <div>
      <div id='navbar' className="flex justify-between w-10/12 h 2/12 m-4 p-4 m-auto bg-yellow-800">
      <div className="w-1/8 text-lg" onClick={() => { navClick('add') }}><h3>Add a disc</h3></div>
        {pages.map((title) => {
          return (<div className="w-1/8 text-lg" onClick={() => { navClick(title) }}><h3>{title}</h3></div>)
        })}
      </div>
      {display}
      {useSelector((state:RootState)=>state.openModal.open)?<AddDisc />:null}

    </div>
  )
}

