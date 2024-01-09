import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Share from '../Share.js';

describe('<Share />', () => {
    test('clearText function should clear the input fields', async () => {  
        render(<Share addPost={jest.fn()} currentUserName="Test User" />)

        const titleInput = await screen.findByPlaceholderText("whats ur title");  
        fireEvent.change(titleInput, { target: { value: 'Test title' } });

        const articleInput = await screen.findByPlaceholderText("Write sth in your mind"); 
        fireEvent.change(articleInput, { target: { value: 'Test article content' } });

        const cancelButton = screen.getByText('Cancel');
        fireEvent.click(cancelButton);

        expect(titleInput.value).toBe('');
        expect(articleInput.value).toBe('');
    });

    
});
