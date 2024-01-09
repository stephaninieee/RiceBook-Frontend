/*export const handleImageChange = (e, setNewImage) => {
    if (e.target.files && e.target.files[0]) {
        const imageUrl = URL.createObjectURL(e.target.files[0]);
        console.log("Image URL:", imageUrl);
        setNewImage(imageUrl);
    }
}; 
*/ 

export const publishPost = async (newTitle, newArticle, newImage, addPost, clearText) => {
    console.log("Attempting to publish post...");

    if (newTitle.trim() !== '' && newArticle.trim() !== '') {
        let apiUrl;
        let body;

        if (newImage) {
            apiUrl = 'https://mysocialserver-626bbb68c54b.herokuapp.com/articleImg';
            const formData = new FormData();
            formData.append('title', newTitle);
            formData.append('text', newArticle);
            formData.append('image', newImage);
            body = formData;

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    credentials: 'include',
                    body: body
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                console.log('Post published:', result);

                if (result.articles) {
                    addPost(result.articles);
                    console.log("clear")
                    clearText();

                }
            } catch (error) {
                console.error('Error publishing post:', error);
            }
        } else {
            apiUrl = 'https://mysocialserver-626bbb68c54b.herokuapp.com/article';
            body = JSON.stringify({
                title: newTitle,
                text: newArticle
            });

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: body
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                console.log('Post published:', result);

                if (result.article) {
                    addPost(result.article);
                    clearText();
                }
            } catch (error) {
                console.error('Error publishing post:', error);
            }
        }
    } else {
        console.log("Title and content cannot be empty");
    }
};

export const handleImageChange = (e, setNewImage) => {
    if (e.target.files && e.target.files[0]) {
        setNewImage(e.target.files[0]); 
    }
};



export const clearText = (setNewTitle, setNewArticle, setNewImage, fileInputRef) => {
    console.log("Clearing text fields");
    setNewTitle(''); 
    setNewArticle('');
    setNewImage(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = '';  
    }
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


