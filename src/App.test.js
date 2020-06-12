import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';


test('renders text TODO List', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/TODO List/i);
  expect(linkElement).toBeInTheDocument();
});

test('Update Todos', () => {
  const { getByPlaceholderText, getByText, getByDisplayValue } = render(<App />);

  /* Find input element with given placeholder */
  const inputElement = getByPlaceholderText(/add todo/i);

  /* Enter text in input */
  fireEvent.change(inputElement, {
    target: { value: "Eat breakfast" }
  });

  /* Click on Add button */
  fireEvent.click(getByText(/Add/i))
  
  /* Once added check text todos remaining to 1 */
  expect(getByText(/Total todos/i).textContent).toEqual('Total Todos remaining: 1 out of 1');

  /* Click on list item to complete an item */
  fireEvent.click(getByText(/Eat breakfast/i))

  /* Once completed now check text todos remaining to 0 */
  expect(getByText(/Total todos/i).textContent).toEqual('Total Todos remaining: 0 out of 1');
});


