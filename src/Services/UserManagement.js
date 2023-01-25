

var apiRoot = 'http://localhost:8000/';

export const AddUser =  (user, instrument, avatar) => {

    fetch(`${apiRoot}profiles`, {
        method: 'POST',
        body: JSON.stringify({
        id: user.username,
        username: user.username,
        email: user.email,
        password: user.password,
        instrument: instrument,
        avatar: avatar

        }),
       headers: {
        'Content-Type': 'application/json'
       }
    }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch (error => console.error('Error:', error));

}

export const checkCredentials = async (user, pass) => {

    

    const fetchedData = fetch(`${apiRoot}profiles?username=${user}&pass=${pass}`)
    .then(response => response.json())
    .then(data => {
        
        return data.length > 0;

    })
    .catch(error => console.error(error));


    return fetchedData;
    
}

export const getUserData = async (user) => {
    const res = await fetch(`${apiRoot}profiles/${user.username}`);
    const prof = await res.json();
    return(prof);

}



export const checkUser = (name) => {

    return fetch(`${apiRoot}profiles?username=${name}`)
    .then(response => response.json())
    .then(data => {
        console.log(data.length > 0)
        return data.length > 0;

    })
    .catch(error => console.error(error));
}

export const deleteMyAccount = async (username) => {
    try {
        const response = await fetch(`http://localhost:8000/profiles/${username}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        
      } catch (error) {
        console.error(error);
      }
}

export const updateProfile = (name, value, camp) => {
    if(camp === 'email'){
    fetch(`${apiRoot}profiles/${name}`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: value
  }),
})
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });} else {
    fetch(`${apiRoot}profiles/${name}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: value
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
  }
}
