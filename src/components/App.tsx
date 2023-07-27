import React, { useEffect } from "react";
import Landing from './pages/Landing';
import Inventory from './pages/Inventory';
import Recs from './pages/Recs';
import Learn from './pages/Learn';
import AddDisc from './AddDisc';
import Banner from "./Banner";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { changePage } from '../redux/reducers/pageSlice';
import { openModal } from '../redux/reducers/openModalSlice';
import { fetchDiscsData } from '../redux/reducers/discsSlice';

export default function App() {
  let page = useSelector((state: RootState) => state.page).page
  let modal = useSelector((state: RootState) => state.openModal).open
  let pages = ['Learn', 'Inventory', 'Recommendations']
  let dispatch:AppDispatch = useDispatch();

  //fetch disc data and axios  logic inside of discs slice


  useEffect(() => {
    dispatch(fetchDiscsData());
  }, []);



  const navClick = (title: string) => {
    if (title === 'add') {
      dispatch(openModal('add'))

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
    <div className="w-10/12 m-2 p-1 justify-between">
      <Banner />
      <div id='navbar' className="flex justify-between w-full h-[65px] m-auto bg-indigo-300">
        <div className="hover:bg-indigo-500 w-3/12 text-lg justify-center items-center flex" onClick={() => { navClick('add') }}>Add a disc</div>
        {pages.map((title) => {
          return (<div className="hover:bg-indigo-500 w-3/12 text-lg justify-center items-center flex" onClick={() => { navClick(title) }}>{title}</div>)
        })}
      </div>
      {display}
      {useSelector((state: RootState) => state.openModal.open) ? <AddDisc /> : null}

    </div>
  )
}
