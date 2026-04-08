import { render, screen, waitFor } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import App from './App';

vi.mock('./services/movieService', () => ({
  getMovies: vi.fn().mockResolvedValue({ data: [] }),
  getMovie: vi.fn(),
  saveMovie: vi.fn(),
  deleteMovie: vi.fn(),
}));

vi.mock('./services/genreService', () => ({
  getGenres: vi.fn().mockResolvedValue({ data: [] }),
}));

test('renders vidly in navbar', async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getByText(/vidly/i)).toBeInTheDocument();
  });
});
