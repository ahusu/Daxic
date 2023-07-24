import React from 'react'
import {useSelector} from 'react-redux'
import { RootState } from '../redux/store';

export default function Modal() {
  const openModal = useSelector((state: RootState) => state.openModal);

  if (!openModal) return null;
  return <><h1>Modal</h1></>


}
