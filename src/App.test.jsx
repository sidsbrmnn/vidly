import { render, screen } from '@testing-library/react';
import App from './App';

test('renders vidly in navbar', () => {
  render(<App />);
  const brandElement = screen.getByText(/vidly/i);
  expect(brandElement).toBeInTheDocument();
});
