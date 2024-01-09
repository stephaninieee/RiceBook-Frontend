export const fetchUserInfo = ( userInfo, setUserInfo) => {
    const currentUserName = localStorage.getItem('userName');
    Promise.all([
        fetch(`https://mysocialserver-626bbb68c54b.herokuapp.com/zipcode/${currentUserName}`, {
            method: 'GET',
            credentials: 'include'
        }),
        fetch(`https://mysocialserver-626bbb68c54b.herokuapp.com/email/${currentUserName}`, {
            method: 'GET',
            credentials: 'include'
        }),
        fetch(`https://mysocialserver-626bbb68c54b.herokuapp.com/dob/${currentUserName}`, {
            method: 'GET',
            credentials: 'include'
        }),
        fetch(`https://mysocialserver-626bbb68c54b.herokuapp.com/phone/${currentUserName}`, {
            method: 'GET',
            credentials: 'include'
        })
    ])
        .then(responses => Promise.all(responses.map(res => res.json())))
        .then(([zipcodeData, emailData, dobData, phoneData]) =>{
            //console.log({ zipcodeData, emailData, dobData, phoneData });

            setUserInfo(prevState => ({
                ...prevState,
                email: emailData.email,
                phone: phoneData.phone, 
                zipcode: zipcodeData.zipcode , 
                dob: dobData.dob
            }));
        })
        .catch(error => {
            console.error('Error fetching user info:', error);
        });
};

export const handleProfileSubmit = (userInfo, event) => {
    event.preventDefault();
    Promise.all([
        fetch(`https://mysocialserver-626bbb68c54b.herokuapp.com/zipcode`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ zipcode: userInfo.zipcode }),
            credentials: 'include'
        }),
        fetch(`https://mysocialserver-626bbb68c54b.herokuapp.com/email`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: userInfo.email }),
            credentials: 'include'
        }),
      
        fetch(`https://mysocialserver-626bbb68c54b.herokuapp.com/phone`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone: userInfo.phone }),
            credentials: 'include'
        }),

    ]) .then(responses => {
        // Handle responses here
        console.log('Profile updated successfully');
    })
    .catch(error => {
        console.error('Error updating profile:', error);
    });


    console.log(userInfo);
};
export const fetchAvatar = (avatar, setAvatar) => {
    const currentUserName = localStorage.getItem('userName');

    fetch(`https://mysocialserver-626bbb68c54b.herokuapp.com/avatar/${currentUserName}`, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(imageData => {
        console.log(imageData.avatar)
        setAvatar(imageData.avatar); 
    })
    .catch(error => {
        console.error('Error fetching profile image:', error);
    });
};

export const updateAvatar = (file, setAvatar) => {
    const formData = new FormData();
    formData.append('image', file); 

    fetch(`https://mysocialserver-626bbb68c54b.herokuapp.com/avatar`, {
        method: 'PUT',
        body: formData,
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        if (data.avatar) {
            setAvatar(data.avatar);
        }
    })
    .catch(error => {
        console.error('Error updating avatar:', error);
    });
};


export const updatePassword = (newPassword) => {
    fetch(`https://mysocialserver-626bbb68c54b.herokuapp.com/password`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', 
        body: JSON.stringify({ newPassword })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Password updated:', data);
    })
    .catch(error => {
        console.error('Error updating password:', error);
    });
};