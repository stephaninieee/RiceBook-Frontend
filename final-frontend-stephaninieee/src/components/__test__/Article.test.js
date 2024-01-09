import React , { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, cleanup, fireEvent, waitFor, getByTestId } from '@testing-library/react';
import Feed from '../Feed';
import Rightbar from '../Rightbar';
import Nav from "../Nav"

const mockUsersFromAPI = [
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret"
  },
  {
    "id": 2,
    "name": "Ervin Howell",
    "username": "Antonette"
  },
  {
    "id": 3,
    "name": "Clementine Bauch",
    "username": "Samantha"
  }
];

const mockPosts = [
  { userId: 1, id: 1, title: 'Title1', body: 'Body1' },
  { userId: 2, id: 2, title: 'Title2', body: 'Body2' },
  { userId: 3, id: 3, title: 'Title3', body: 'Body3' },
];

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
);

describe('Validate Article actions', () => {
  beforeEach(() => {
    localStorage.setItem('userId', '1');
    localStorage.setItem('userName', 'Bret');
    global.fetch.mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  it('should fetch all articles for current logged in user', async () => {
    global.fetch.mockResolvedValueOnce({ json: () => Promise.resolve(mockUsersFromAPI) }).mockResolvedValueOnce({ json: () => Promise.resolve(mockPosts) });

    render(<Feed searchTerm="" friends={mockUsersFromAPI} />);

    const postElement = await screen.findByText('Title1');
    expect(postElement).toBeTruthy();
  });

  it('should fetch subset of articles for current logged in user given search keyword', async () => {
    global.fetch.mockResolvedValueOnce({ json: () => Promise.resolve(mockUsersFromAPI) })
               .mockResolvedValueOnce({ json: () => Promise.resolve(mockPosts) });

    const Wrapper = () => {
        const [searchTerm, setSearchTerm] = useState('');

        return (
            <>
                <Nav setSearchTerm={setSearchTerm} />
                <Feed searchTerm={searchTerm} friends={mockUsersFromAPI} />
            </>
        );
    };


    render(
      <Router>
          <Wrapper />
      </Router>
  );


    fireEvent.change(screen.getByTestId('searchQuery'), { target: { value: 'Title1' } });
    expect(screen.getByTestId('searchQuery').value).toEqual('Title1')

    const missingElement = screen.queryByText('Title2');
    expect(missingElement). toBeFalsy()
});

it('should remove articles from Feed when removing a follower', async () => {
  global.fetch
    .mockResolvedValueOnce({ json: () => Promise.resolve(mockUsersFromAPI) }) 
    .mockResolvedValueOnce({ json: () => Promise.resolve(mockPosts) }); 

  let updatedFriends = [...mockUsersFromAPI];
  const updateFriends = (newFriends) => {
    updatedFriends = newFriends;
  };

  render(<Rightbar friends={updatedFriends} setFriends={updateFriends} />);
  mockPosts.forEach(async post => {
    const postElement = await screen.findByText(post.title);
    expect(postElement).toBeTruthy();
  });

  const userToRemove = mockUsersFromAPI[2];
  const removeButton = screen.getByText(userToRemove.name).nextSibling;
  fireEvent.click(removeButton);

  render(<Feed searchTerm="" friends={updatedFriends} />);
  const postFromRemovedUser = mockPosts.find(post => post.userId === userToRemove.id);
  const missingElement = screen.queryByText(postFromRemovedUser.title);
  expect(missingElement).toBeFalsy();
});

it('should add articles when adding a follower', async () => {
  // Step 1: Render the Feed component with only User1 and User2
  const initialFriends = mockUsersFromAPI.slice(0, 2);
  render(<Feed searchTerm="" friends={initialFriends} />);

  // Step 2: Ensure the post from User3 (Title3) is not present initially
  let postFromUser3 = screen.queryByText('Title3');
  expect(postFromUser3).toBeNull();

  // Step 3: Simulate adding User3 as a follower and re-render with the updated friends list
  const updatedFriends = [...initialFriends, mockUsersFromAPI[2]];
  const { rerender } = render(<Feed searchTerm="" friends={updatedFriends} />);
   

  await waitFor(() => {
    postFromUser3 = screen.findByText('Title3');
    expect(postFromUser3).toBeTruthy();
  });
  

});
it('should show alert if the user to add as follower does not exist', async () => {
  global.fetch.mockResolvedValueOnce({ json: () => Promise.resolve(mockUsersFromAPI) });

  render(<Rightbar friends={mockUsersFromAPI} setFriends={jest.fn()} />);

  const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

  fireEvent.change(screen.getByPlaceholderText('Enter user name'), { target: { value: 'NonExistentUser' } });
  fireEvent.click(screen.getByText('Add Follower'));

  alertMock.mockRestore();
});
it('should add a follower', async () => {
  global.fetch.mockResolvedValueOnce({ json: () => Promise.resolve(mockUsersFromAPI) });

  const mockSetFriends = jest.fn();
  render(<Rightbar friends={mockUsersFromAPI} setFriends={mockSetFriends} />);

  fireEvent.change(screen.getByPlaceholderText('Enter user name'), { target: { value: 'Leanne Graham' } });
  fireEvent.click(screen.getByText('Add Follower'));
});



});
describe('Rightbar tests', () => {
  it('renders the followers correctly', () => {
    render(<Rightbar friends={mockUsersFromAPI} setFriends={jest.fn()} />);
    
    mockUsersFromAPI.forEach(user => {
      expect(screen.getByText(user.name)).toBeTruthy
    });
  });
  it('alerts on trying to add a follower with an empty name', async () => {
    render(<Rightbar friends={mockUsersFromAPI} setFriends={jest.fn()} />);
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    fireEvent.change(screen.getByPlaceholderText('Enter user name'), { target: { value: '' } });
    fireEvent.click(screen.getByText('Add Follower'));
    alertMock.mockRestore();
  });
  it('tests getFollowedUserIds functionality', () => {
    expect(getFollowedUserIds(1)).toEqual([2, 3, 4]);
    // Add more assertions for different inputs
  });
})



