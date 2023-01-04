

var apiRoot = 'http://localhost:8000/';

export const AddUser =  (user) => {

    fetch(`${apiRoot}profiles`, {
        method: 'POST',
        body: JSON.stringify({
        id: user.username,
        username: user.username,
        email: user.email,
        password: user.password

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
        console.log(data.length);
        console.log(data.length > 0);
        return data.length > 0;

    })
    .catch(error => console.error(error));


    return fetchedData;
    
}

export const checkUser = (user) => {}