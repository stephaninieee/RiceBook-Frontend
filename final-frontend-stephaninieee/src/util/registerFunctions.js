export const fetchUsers = (setUsers) => {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => { setUsers(data); });
};

export const handleInputChange = (e, setFormData) => {
    const { name, value } = e.target;
   setFormData(prevState => ({ ...prevState, [name]: value }));
   
};



export const calculateAge = (birthDate) => {
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

export const validateForm = (formData, users) => {
    //console.log("formData:", formData);
  
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(formData.email)) {
        alert("Invalid email format.");
        return false;
    }
    const phonePattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    if (!phonePattern.test(formData.phone)) {
        alert("Invalid phone number format.");
        return false;
    }
    const zipcodePattern = /^[0-9]{5}$/;
    if (!zipcodePattern.test(formData.zipcode)) {
        alert("Invalid zipcode format.");
        return false;
    }
    const age = calculateAge(new Date(formData.dob));
    if (age < 18) {
        alert("You must be 18 years of age or older to register.");
        return false;
    }
    if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match.");
        return false;
    }
    /*const usernameExists = users.some(user => user.username.toLowerCase() === formData.accountName.toLowerCase());
    if (usernameExists) {
        alert("This username already exists. Please choose another one.");
        return false;
    }*/ 
    return true;
};

/*export const handleSubmit = (e, formData, users, navigate, ) => {
   
    if (validateForm(formData, users)) {
        e.preventDefault();
        const newUser = {
            ...formData,
            posts: [],
            followedUsers: []
        };
        const currentUsers = JSON.parse(localStorage.getItem('users')) || [];
        currentUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(currentUsers));
        localStorage.setItem('userName', newUser.displayName);
        navigate("/home");
        //console.log(currentUsers);
    }
};*/ 

export const handleSubmit = async (e, formData, navigate) => {
    e.preventDefault();

    if (validateForm(formData)) {
        const userData = {
            username: formData.accountName,
            phone: formData.phone,
            email: formData.email,
            dob: formData.dob,
            zipcode: formData.zipcode,
            password: formData.password
        };

        try {
            const response = await fetch('https://mysocialserver-626bbb68c54b.herokuapp.com/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData),
                credentials : "include"
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('User registered:', result);
            localStorage.setItem('userName', result.username);
            navigate("/home");
        } catch (error) {
            console.error('Error in user registration:', error);
        }
    }
};
