import React from 'react';
import ReactDom from 'react-dom';
import {useSelector} from 'react-redux';
import { RootState } from '../redux/store';

export default function Modal() {
  const openModal = useSelector((state: RootState) => state.openModal);
  const portal = document.getElementById('portal');
  if (!portal) return null;
  if (!openModal) return null;
  return ReactDom.createPortal(<><h1>Add disc page</h1>
  </>, portal)


}
