import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { closeModal } from '../redux/reducers/openModalSlice';
import { CirclePicker } from 'react-color';
import {addDisc, updateDiscs} from '../redux/reducers/discsSlice';


export default function AddDisc() {
  const openModal = useSelector((state: RootState) => state.openModal);
  const portal = document.getElementById('portal');
  if (!portal) return null;
  if (!openModal) return null;
  let dispatch = useDispatch();

  const [status, setStatus] = useState('init')
  //combine into one state obj with properties
  const [sub, setSub] = useState<any>({})

  const validateForm = () => {
    setStatus('Incomplete')
    if (!sub.name) return false
    if (!sub.speed) return false
    if (!sub.glide) return false
    if (!sub.turn) return false
    if (!sub.fade) return false
    if (!sub.manufacturer) return false
    if (!sub.color) return false
    setStatus('Compelete')
    return true;
  };

  const post =  (body: any) => {
    dispatch(addDisc(sub))
  }

  const handleColor = (color: any) => {
    setSub({ ...sub, color: color.hex })
    console.log(color.hex)
  }
  let StatusMessage;
  switch (status) {
    case 'init':
      StatusMessage = <></>;
      break;
    case 'Incomplete':
      StatusMessage = <h4 className='text-red-500'>Please fill the required fields</h4>;
      break;
    case 'Complete':
      StatusMessage = <h4 className='text-green-400'>Submitted!</h4>;
      break;
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
              onChange={(e: any) => setSub({ ...sub, name: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1">Speed</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                  onChange={(e: any) => setSub({ ...sub, speed: e.target.value })}
                />
                <label className="block mb-1">Glide</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                  onChange={(e: any) => setSub({ ...sub, glide: e.target.value })}
                />
              </div>

              <div>
                <label className="block mb-1">Turn</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                  onChange={(e: any) => setSub({ ...sub, turn: e.target.value })}
                />
                <label className="block mb-1">Fade</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                  onChange={(e: any) => setSub({ ...sub, fade: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-1">Manufacturer</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              onChange={(e: any) => setSub({ ...sub, manufacturer: e.target.value })}
            />
            <label className="block mb-1">Weight in grams</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              onChange={(e: any) => setSub({ ...sub, weight: e.target.value })}
            />
            <label className="block mb-1">Plastic type</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              onChange={(e: any) => setSub({ ...sub, plastic: e.target.value })}
            />
          </div>
        </div>

        {/* Color Picker */}
        <CirclePicker onChange={(c) => handleColor(c)} className="mb-4" />

        {/* Footer */}
        <div className="flex justify-end">
          {StatusMessage}
          <button
            className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 focus:outline-none"
            onClick={() => {
              if (validateForm()) {
                post(sub);
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
