import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { closeModal } from '../redux/reducers/openModalSlice';
import { CirclePicker } from 'react-color'
import axios from 'axios';


export default function AddDisc() {
  const openModal = useSelector((state: RootState) => state.openModal);
  const portal = document.getElementById('portal');
  if (!portal) return null;
  if (!openModal) return null;
  let dispatch = useDispatch();

  const [status, setStatus] = useState('init')
  const [name, setName] = useState(null);
  const [speed, setSpeed] = useState(null);
  const [glide, setGlide] = useState(null);
  const [turn, setTurn] = useState(null);
  const [fade, setFade] = useState(null);
  const [weight, setWeight] = useState(null);
  const [manufacturer, setManu] = useState(null);
  const [plastic, setPlastic] = useState(null);
  const [color, setColor] = useState(null);


  const validateForm = () => {
    setStatus('Incomplete')
    if (!name) return false
    if (!speed) return false
    if (!glide) return false
    if (!turn) return false
    if (!fade) return false
    if (!manufacturer) return false
    if (!color) return false
    setStatus('Compelete')
    return true;
  };

  const post = async (body: any) => {
    try {
      await axios.post('/discs', body);
      //display success banner
    } catch (err) {
      console.log(err)
    }
  }

  const createResponseBody = () => {
    return {
      name: name,
      speed: speed,
      glide: glide,
      turn: turn,
      fade: fade,
      manufacturer: manufacturer,
      color: color,
      weight: weight,
      plastic: plastic
    }
  }
  const handleColor = (color: any) => {
    setColor(color.hex)
    console.log(color.hex)
  }

  return ReactDom.createPortal(<>
    <div className="relative w-auto my-6 mx-auto max-w-3xl justify-center z-50">
      {/*content*/}
      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
        {/*header*/}
        <div className=" justify-between p-5 border-b border-solid border-slate-200 rounded-t">
          <h3 className="text-3xl font-semibold">
            Add a Disc:
          </h3>
          <button
            className="p-1 ml-4 bg-transparent border-0 text-black opacity-25 float-right text-3xl leading-none font-semibold outline-none focus:outline-none align-center dark:opacity-75"
            onClick={() => dispatch(closeModal(''))}>
            <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none dark:text-white">x</span>
          </button>
        </div>
        {/*body*/}
        <div className="relative w-full flex shadow-large">
          <form>
            <div>
              <label>Disc Name</label>
              <input type='text' onChange={(e: any) => setName(e.target.value)}></input>
            </div>
            <div>
              <label>Speed</label>
              <input type='number' onChange={(e: any) => setSpeed(e.target.value)}></input>
              <label>Glide</label>
              <input type='number' onChange={(e: any) => setGlide(e.target.value)}></input>
              <label>Turn</label>
              <input type='number' onChange={(e: any) => setTurn(e.target.value)}></input>
              <label>Fade</label>
              <input type='number' onChange={(e: any) => setFade(e.target.value)}></input>
            </div>
          </form>

          <form>
            <label>Manufacturer</label>
            <input type='text' onChange={(e: any) => setManu(e.target.value)}></input>
            <label>Plastic</label>
            <input type='text' onChange={(e: any) => setPlastic(e.target.value)}></input>
            <label>Weight in grams</label>
            <input type='number' onChange={(e: any) => setWeight(e.target.value)}></input>
          </form>

          <CirclePicker onChange={(c) => handleColor(c)} />

        </div>
        {/*footer*/}
        <div className="flex items-center justify-end p-6">
          <StatusMessage />
          <button
            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => {
              if (validateForm()) {
                let body = createResponseBody();
                post(body);
                dispatch(closeModal(''));
              }
            }}
          >Submit</button>
          <button
            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button" data-testid='closeButton'
            onClick={() => dispatch(closeModal(''))}>
            Discard
          </button>
        </div>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black" onClick={() => { dispatch(closeModal('')) }}></div>
  </>, portal)


}
let StatusMessage = () => {
  let status =''
  switch (status) {
    case ('init'):
      return <></>;
    case 'Incomplete':
      return <h4 className='text-red-500'>Please complete the required fields</h4>;
    case 'Complete':
      return <h4 className='text-green-400'>Submitted!</h4>
    default:
      return <></>
  }
}