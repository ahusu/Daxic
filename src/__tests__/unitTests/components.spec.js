import { render, screen, cleanup } from '@testing-library/react';
import AddDisc from '../../components/AddDisc.tsx';

test ('should render AddDisc Button', ()=>{
  render(<AddDisc/>);
  const AddDiscModal = screen.getByTestId('AddDiscModal')
  expect (AddDiscButton).toBeInTheDocument();
})