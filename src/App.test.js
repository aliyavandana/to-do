import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';


test('renders text TODO List', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/TODO List/i);
  expect(linkElement).toBeInTheDocument();
});

test('rendering the new todo', async () => {
  const { getByLabelText, getByTestId, getByText, queryByTestId, baseElement } = render(
    <App />
  )
  const newToDo = 'Add new todo'

  const input = getByLabelText(/What needs to be done?/i);

  fireEvent.change(input, newToDo)

  const button = getByText(/Add/g)
  fireEvent.click(button)

  expect(getByText(/Add new todo/i)).toBeInTheDocument();
})