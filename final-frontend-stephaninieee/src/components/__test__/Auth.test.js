import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../Login.js";
import { MemoryRouter } from 'react-router-dom';
import Nav from "../Nav.js";


// Mock fetch globally
global.fetch = jest.fn();

// Mock the navigate function from react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Auth', () => {
  beforeEach(() => {
    global.fetch.mockClear();
    localStorage.clear();
    mockNavigate.mockClear();
  });

  it('should log in a user', async () => {
    // Mock API call
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce([{
        id: 1,
        username: 'Bret',
        address: {
          street: 'Kulas Light'
        }
      }])
    });

    render(<MemoryRouter><Login /></MemoryRouter>);

    await screen.findByText('Kasukabe shi😎');

    fireEvent.change(screen.getByPlaceholderText('Account Name'), { target: { value: 'Bret' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Kulas Light' } });


    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(localStorage.getItem('userName')).toBe('Bret');
      expect(localStorage.getItem('userId')).toBe('1');
      expect(mockNavigate).toHaveBeenCalledWith('/home');
    });
  });

  it('should show an alert on invalid credentials', async () => {
    // Mock API call
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce([{
        id: 1,
        username: 'TestUser',
        address: {
          street: 'TestStreet'
        }
      }])
    });

    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(<MemoryRouter><Login /></MemoryRouter>);
    await screen.findByText('Kasukabe shi😎');

    fireEvent.change(screen.getByPlaceholderText('Account Name'), { target: { value: 'WrongUser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'WrongStreet' } });
    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('Invalid credentials!');
    });

    alertMock.mockRestore();
  });
  it('should log out a user (login state should be cleared)', () => {
    localStorage.setItem('userName', 'Bret');
    localStorage.setItem('userId', '1');

    render(
      <MemoryRouter>
        <Nav setSearchTerm={() => {}} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Logout'));

   
    expect(localStorage.getItem('userName')).toBeNull();
    expect(localStorage.getItem('userId')).toBeNull();
  });

  it('should navigate to the register page when "Create a New Account" link is clicked', async () => {
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce([])
    });

    render(<MemoryRouter><Login /></MemoryRouter>);

    // Wait for static content to ensure the component has rendered
    await screen.findByText('Kasukabe shi😎');

    // Simulate a click on the "Create a New Account" link
    fireEvent.click(screen.getByText('Create a New Account'));

    // Expect the navigate function to have been called with the '/register' route
    expect(mockNavigate).toHaveBeenCalledWith('/register');
  });

  
});


