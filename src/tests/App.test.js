import { render, screen } from '@testing-library/react';
import App from '../components/app/index';

test('renders ロード中', () => {
  render(<App />);
  const linkElement = screen.getByText(/ロード中/i);
  expect(linkElement).toBeInTheDocument();
});
