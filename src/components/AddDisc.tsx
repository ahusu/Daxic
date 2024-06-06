import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { closeModal } from '../redux/reducers/openModalSlice';
import { CirclePicker } from 'react-color';
import { fetchMenu, logBag, editBag, closeOutBag } from '../redux/reducers/menuSlice';

export default function AddDisc() {

  const openModal = useSelector((state: RootState) => state.openModal);
  const portal = document.getElementById('portal');
  if (!portal) return null;
  if (!openModal) return null;

  let dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    setSub(openModal.edit ? { ...openModal.edit } : {});
  }, [openModal.edit]);

  type ValidatedKeys = 'Name' | 'Weight' | 'Price' | 'Strain' | 'Notes' | 'Picture' | 'Tag' | 'Maker';
  type FillState = { [K in ValidatedKeys]: boolean };

  const [status, setStatus] = useState('init');
  const [sub, setSub] = useState<any>({});
  const [fill, setFill] = useState<FillState>({
    Name: false,
    Weight: false,
    Price: false,
    Strain: false,
    Notes: false,
    Picture: false,
    Tag: false,
    Maker: false
  });

  const validateForm = () => {
    let checkFill = { ...fill }
    if (sub.name) checkFill.Name = true;
    if (sub.weight) checkFill.Weight = true;
    if (sub.price) checkFill.Price = true;
    if (sub.strain) checkFill.Strain = true;
    if (sub.notes) checkFill.Notes = true;
    if (sub.hmid) checkFill.Maker = true;
    if (sub.pic) checkFill.Picture = true;
    if (sub.tag) checkFill.Tag = true;
    setFill(checkFill);
    let checkFalse = Object.values(checkFill).includes(false);
    if (checkFalse) setStatus('Incomplete');
    else setStatus('Complete');
    return checkFalse ? false : true;
  };

  const post = (body: any) => {
    if (openModal.type === 'add') dispatch(logBag(sub));
    if (openModal.type == 'edit') {
      dispatch(editBag(sub))
    };
    setTimeout(() => { dispatch(fetchMenu()) }, 200)
  }
  const remove = () => {
    dispatch(closeOutBag(sub.id));
    setTimeout(() => { dispatch(fetchMenu()) }, 200)
  }

  const handleColor = (color: any) => {
    setSub({ ...sub, color: color.hex })
  }
  let StatusMessage;
  switch (status) {
    case 'init':
      StatusMessage = <></>;
      break;
    case 'Incomplete':
      StatusMessage = <h4 className='text-red-500'>Please fill the required fields: {Object.keys(fill).filter((key) => !fill[key as ValidatedKeys]).join(' ')}</h4>;
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
          <h3 className="text-3xl font-semibold">{openModal.type === 'add' ? 'Add a Disc:' : 'Edit Disc:'}</h3>
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
            <label className="block mb-1">Name</label>
            <input
              type="text"
              value={sub.name}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              onChange={(e: any) => setSub({ ...sub, name: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1">Strain</label>
                <input
                  type="text"
                  value={sub.strain}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                  onChange={(e: any) => setSub({ ...sub, strain: e.target.value })}
                />
                <label className="block mb-1">Weight (kg)</label>
                <input
                  type="number"
                  value={sub.weight}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                  onChange={(e: any) => setSub({ ...sub, weight: e.target.value })}
                />
              </div>

              <div>
                <label className="block mb-1">Price</label>
                <input
                  type="number"
                  value={sub.price}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                  onChange={(e: any) => setSub({ ...sub, price: e.target.value })}
                />
                <label className="block mb-1">Hash Maker ID</label>
                <input
                  type="number"
                  value={sub.hmid}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                  onChange={(e: any) => setSub({ ...sub, hmid: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-1">Notes</label>
            <input
              type="text"
              value={sub.Notes}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              onChange={(e: any) => setSub({ ...sub, notes: e.target.value })}
            />
            <label className="block mb-1">Picture</label>
            <input
              type="text"
              value={sub.Pic}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              onChange={(e: any) => setSub({ ...sub, pic: e.target.value })}
            />
            {/* <label className="block mb-1">Tag</label>
            <input
              type="text"
              value={sub.plastic}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              onChange={(e: any) => setSub({ ...sub, plastic: e.target.value })}
            /> */}
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
            {openModal.type === 'add' ? 'Discard' : 'Discard Changes'}
          </button>
          {openModal.type === 'edit' ? <button className="px-4 py-2 bg-red-200 text-red-700 rounded-md border border-red-500 hover:text-red-800 hover:border-red-800 focus:outline-none ml-2"
            onClick={() => {
              remove();
              dispatch(closeModal(''));
            }}
          >Delete Disc</button> : ""}

          <button
            className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 focus:outline-none"
            onClick={() => {
              if (validateForm()) {
                post(sub);
                dispatch(closeModal(''));
              }
            }}
          >
            {openModal.type === 'add' ? 'Submit' : 'Submit Edit'}
          </button>
        </div>
      </div>
    </div>
    <div className="fixed inset-0 z-40 bg-black opacity-25" onClick={() => { dispatch(closeModal('')) }}></div>
  </>, portal)

}
