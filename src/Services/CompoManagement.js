var apiRoot = 'http://localhost:8000/compos/';

export const autoSave =  async (title, author, date, list, blackList, existId) => {

    let id = existId;
    if(id === ""){
    fetch(`${apiRoot}`, {
        method: 'POST',
        body: JSON.stringify({
        title: title,
        author: author,
        date: date,
        list: list,
        blackList: blackList

        }),
       headers: {
        'Content-Type': 'application/json'
       }
    }).then(res => res.json())
    .then(response => {console.log('Success:', response.id); id = response.id})
    .catch (error => console.error('Error:', error));
} else {
    fetch(`${apiRoot}${id}`, {
        method: 'PUT',
        body: JSON.stringify({
        title: title,
        author: author,
        date: date,
        list: list,
        blackList: blackList

        }),
       headers: {
        'Content-Type': 'application/json'
       }
    }).then(res => res.json())
    .then(response => {console.log('Success:', response.id); id = response.id})
    .catch (error => console.error('Error:', error));
}

    
    return(id);

}