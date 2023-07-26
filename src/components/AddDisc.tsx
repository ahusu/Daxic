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
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 w-full sm:max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-solid border-gray-300 mb-2">
          <h3 className="text-3xl font-semibold">Add a Disc:</h3>
          <button
            className="text-gray-500 hover:text-gray-800 focus:outline-none"
            onClick={() => dispatch(closeModal(''))}
          >
            <span className="text-3xl">&times;</span>
          </button>
        </div>

        {/* Body */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1">Disc Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              onChange={(e: any) => setName(e.target.value)}
            />
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1">Speed</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                  onChange={(e: any) => setSpeed(e.target.value)}
                />
                <label className="block mb-1">Glide</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                  onChange={(e: any) => setGlide(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-1">Turn</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                  onChange={(e: any) => setTurn(e.target.value)}
                />
                <label className="block mb-1">Fade</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                  onChange={(e: any) => setFade(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-1">Manufacturer</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              onChange={(e: any) => setManu(e.target.value)}
            />
            <label className="block mb-1">Weight in grams</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              onChange={(e: any) => setWeight(e.target.value)}
            />
            <label className="block mb-1">Plastic type</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              onChange={(e: any) => setPlastic(e.target.value)}
            />
          </div>
        </div>

        {/* Color Picker */}
        <CirclePicker onChange={(c) => handleColor(c)} className="mb-4" />

        {/* Footer */}
        <div className="flex justify-end">
          <StatusMessage />
          <button
            className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 focus:outline-none"
            onClick={() => {
              if (validateForm()) {
                let body = createResponseBody();
                post(body);
                dispatch(closeModal(''));
              }
            }}
          >
            Submit
          </button>
          <button
            className="px-4 py-2 text-red-500 rounded-md border border-red-500 hover:text-red-800 hover:border-red-800 focus:outline-none ml-2"
            onClick={() => dispatch(closeModal(''))}
          >
            Discard
          </button>
        </div>
      </div>
    </div>
    <div className="fixed inset-0 z-40 bg-black opacity-25" onClick={() => { dispatch(closeModal('')) }}></div>
  </>, portal)

}
let StatusMessage = () => {
  let status = ''
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