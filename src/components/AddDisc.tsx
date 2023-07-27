import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { closeModal } from '../redux/reducers/openModalSlice';
import { CirclePicker } from 'react-color';
import {addDisc, editDisc, deleteDisc, fetchDiscsData} from '../redux/reducers/discsSlice';

export default function AddDisc() {

  const openModal = useSelector((state: RootState) => state.openModal);
  const portal = document.getElementById('portal');
  if (!portal) return null;
  if (!openModal) return null;

  let dispatch:AppDispatch = useDispatch();

  useEffect(() => {
    setSub(openModal.edit ? {...openModal.edit} : {});
  }, [openModal.edit]);


  const [status, setStatus] = useState('init');
  const [sub, setSub] = useState<any>({});
  const [fill, setFill] = useState<any[]>([])

  const validateForm = async () => {
    setFill([]);
    const valid =  () =>{
      if (!sub.name) {setFill(fill.concat('Name'));}
      if (!sub.speed) setFill(fill.concat('Speed'));
      if (!sub.glide||sub.glide===0) setFill(fill.concat('Glide'));
      if (!sub.turn||sub.turn===0) setFill(fill.concat('Turn'));
      if (!sub.fade||sub.fade===0) setFill(fill.concat('Fade'));
      if (!sub.manufacturer) setFill(fill.concat('Manufacturer'));
      if (!sub.color) setFill(fill.concat('Color'));
    }
    await valid()
    const check = async () => {
      fill.length>0?  setStatus('Incomplete'):setStatus('Complete');
      console.log('VF', fill)
    }
    await check()
    return status === 'Complete'? true:false;
  };

  useEffect(()=>{
    console.log('useeffect' + fill + typeof fill)

  },[fill])


  const post =  (body: any) => {
    if (openModal.type === 'add') dispatch(addDisc(sub));
    if (openModal.type == 'edit') {
      dispatch(editDisc(sub))};
    setTimeout(()=>{dispatch(fetchDiscsData())},100)
  }
  const remove = ()=>{
    dispatch(deleteDisc(sub.id));
    setTimeout(()=>{dispatch(fetchDiscsData())},100)
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
      StatusMessage = <h4 className='text-red-500'>Please fill the required fields: {fill}</h4>;
      break;
    case 'Complete':
      StatusMessage = <h4 className='text-green-400'>Submitted!</h4>;
      break;
  }
  return ReactDom.createPortal(<>
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 w-full sm:max-w-lg" style={{ width: '30vw' }}>
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-solid border-gray-300 mb-2">
          <h3 className="text-3xl font-semibold">{openModal.type==='add'? 'Add a Disc:': 'Edit Disc:'}</h3>
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
              value={sub.name}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              onChange={(e: any) => setSub({ ...sub, name: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1">Speed</label>
                <input
                  type="number"
                  value={sub.speed}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                  onChange={(e: any) => setSub({ ...sub, speed: e.target.value })}
                />
                <label className="block mb-1">Glide</label>
                <input
                  type="number"
                  value={sub.glide}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                  onChange={(e: any) => setSub({ ...sub, glide: e.target.value })}
                />
              </div>

              <div>
                <label className="block mb-1">Turn</label>
                <input
                  type="number"
                  value={sub.turn}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                  onChange={(e: any) => setSub({ ...sub, turn: e.target.value })}
                />
                <label className="block mb-1">Fade</label>
                <input
                  type="number"
                  value={sub.fade}
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
              value={sub.manufacturer}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              onChange={(e: any) => setSub({ ...sub, manufacturer: e.target.value })}
            />
            <label className="block mb-1">Weight in grams</label>
            <input
              type="number"
              value={sub.weight}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              onChange={(e: any) => setSub({ ...sub, weight: e.target.value })}
            />
            <label className="block mb-1">Plastic type</label>
            <input
              type="text"
              value={sub.plastic}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              onChange={(e: any) => setSub({ ...sub, plastic: e.target.value })}
            />
          </div>
        </div>

        {/* Color Picker */}
        <CirclePicker onChange={(c) => handleColor(c)} className="mb-4 p-2 m-2" />

        {/* Footer */}
        {StatusMessage}
        <div className="flex justify-between mt-2">
          <button
            className="px-4 py-2 text-red-500 rounded-md border border-red-500 hover:text-red-800 hover:border-red-800 focus:outline-none ml-2"
            onClick={() => dispatch(closeModal(''))}
          >
            {openModal.type==='add'?'Discard':'Discard Changes'}
          </button>
          {openModal.type==='edit'? <button className="px-4 py-2 bg-red-200 text-red-700 rounded-md border border-red-500 hover:text-red-800 hover:border-red-800 focus:outline-none ml-2"
          onClick={() => {
              remove();
              dispatch(closeModal(''));
          }}
          >Delete Disc</button>:""}

          <button
            className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 focus:outline-none"
            onClick={() => {
              validateForm();
              if (status === 'Complete') {
                post(sub);
                dispatch(closeModal(''));
              }
            }}
          >
            {openModal.type==='add'?'Submit':'Submit Edit'}
          </button>
        </div>
      </div>
    </div>
    <div className="fixed inset-0 z-40 bg-black opacity-25" onClick={() => { dispatch(closeModal('')) }}></div>
  </>, portal)

}
