import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Мокаем MUI
vi.mock('@mui/material/styles', () => ({
  createTheme: () => ({}),
  ThemeProvider: ({ children }: any) => children,
}));

// Мокаем DataGrid
vi.mock('@mui/x-data-grid', () => ({
  DataGrid: () => null,
}));

describe("App component", () => {
  test("renders header text", () => {
    render(<App />);
    expect(screen.getByText(/car/i)).toBeInTheDocument();
  });
});
