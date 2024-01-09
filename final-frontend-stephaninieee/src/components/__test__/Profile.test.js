import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Profile from '../Profile';

// Mocking the fetch function to avoid real API calls during tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{
      username: 'TestUser',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '1-123-456-7890 x123',
      address: { zipcode: '12345-6789' }
    }])
  })
);

describe('Profile Component', () => {

    beforeEach(() => {
      fetch.mockClear();
      localStorage.setItem('userName', 'TestUser');
    });
  
    it('should fetch the logged in user\'s profile username', async () => {
      render(<MemoryRouter><Profile /></MemoryRouter>);
  
      // Wait for fetch call
      await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  
      // Validate if user information is displayed correctly
      expect(screen.queryByPlaceholderText('TestUser')).not.toBeNull();
      await screen.findByDisplayValue('John Doe');  // 修改此行

    });
  
    it('should allow editing display name', async () => {
      render(<MemoryRouter><Profile /></MemoryRouter>);
  
      // Get the display name input and change its value
      const displayNameInput = await screen.findByDisplayValue('John Doe');
      fireEvent.change(displayNameInput, { target: { value: 'Jane Doe' } });
  
      // Validate if the input value has been updated
      expect(displayNameInput.value).toBe('Jane Doe');
    });
    it('should display user email', async () => {
        render(<MemoryRouter><Profile /></MemoryRouter>);
        await screen.findByDisplayValue('john.doe@example.com');
      });
  
      it('should display user phone', async () => {
        render(<MemoryRouter><Profile /></MemoryRouter>);
        await screen.findByDisplayValue('123-456-7890');
      });

      it('should show error for invalid email format', async () => {
        render(<MemoryRouter><Profile /></MemoryRouter>);
        
        const emailInput = await screen.findByDisplayValue('john.doe@example.com');
        fireEvent.change(emailInput, { target: { value: 'abc123123' } });
        const form = screen.getByTestId('profile-form');
        fireEvent.submit(form);
        expect(emailInput.checkValidity()).toBe(false);
    });
    
    it('should show error for invalid phone format', async () => {
        render(<MemoryRouter><Profile /></MemoryRouter>);
        
        const phoneInput = await screen.findByDisplayValue(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/);
        fireEvent.change(phoneInput, { target: { value: '1234567890' } });  
        const form = screen.getByTestId('profile-form');
        fireEvent.submit(form);
        expect(phoneInput.checkValidity()).toBe(false);
    });
    it('should show error for invalid zipcode format', async () => {
        render(<MemoryRouter><Profile /></MemoryRouter>);
        
        const zipcodeInput = await screen.findByDisplayValue(/^[0-9]{5}$/);
        fireEvent.change(zipcodeInput, { target: { value: '123456' } });  
        const form = screen.getByTestId('profile-form');
        fireEvent.submit(form);
        expect(zipcodeInput.checkValidity()).toBe(false);
    });
  
    it('should display the user date of birth', async () => {
        render(<MemoryRouter><Profile /></MemoryRouter>);
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
        expect(screen.getByDisplayValue('2001-01-03')).toBeTruthy();

      });
      it('should update the password field', async () => {
        render(<MemoryRouter><Profile /></MemoryRouter>);
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  
        const passwordInput = screen.getByLabelText('New Password:');
        fireEvent.change(passwordInput, { target: { value: 'NewPassword123' } });
        expect(passwordInput.value).toBe('NewPassword123');
      });
      it('should navigate back to main page when "Back to Main Page" button is clicked', async () => {
        // Here we're adding a Route to check the navigation
        render(
            <MemoryRouter initialEntries={['/profile']}>
                <Routes>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/home" element={<div>Home Page</div>} />
                </Routes>
            </MemoryRouter>
        );
    
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
        
        const backButton = screen.getByText('Back to Main Page');
        fireEvent.click(backButton);
    
        expect(screen.getByText('Home Page')).toBeTruthy()
    });
    
  
  });
  