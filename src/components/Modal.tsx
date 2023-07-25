import React from 'react';
import ReactDom from 'react-dom';
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from '../redux/store';
import {closeModal} from '../redux/reducers/openModalSlice'

export default function Modal() {
  const openModal = useSelector((state: RootState) => state.openModal);
  const portal = document.getElementById('portal');
  if (!portal) return null;
  if (!openModal) return null;

  let dispatch = useDispatch();

  return ReactDom.createPortal(<>
    <div className="relative w-auto my-6 mx-auto max-w-3xl justify-center">
      {/*content*/}
      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
        {/*header*/}
        <div className=" justify-between p-5 border-b border-solid border-slate-200 rounded-t">
          <h3 className="text-3xl font-semibold">
            Add a Disc:
          </h3>
        </div>
        {/*body*/}
        <div className="relative w-full flex flex-col shadow-large">

        </div>
        {/*footer*/}
        <div className="flex items-center justify-end p-6">
          <button
            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button" data-testid='closeButton'
            onClick={() => dispatch(closeModal(''))}>
            Close
          </button>
        </div>
      </div>
  </div>
  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </>, portal)


}
