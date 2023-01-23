var apiRoot = 'http://localhost:8000/compos';

export const autoSave =  async (title, author, date, list, blackList, instrument) => {

   
    
    fetch(`${apiRoot}`, {
        method: 'POST',
        body: JSON.stringify({
        title: title,
        author: author,
        date: date,
        instrument: instrument,
        list: list,
        blackList: blackList

        }),
       headers: {
        'Content-Type': 'application/json'
       }
    }).then(res => res.json())
    .then(response => {console.log('Success:', response.id);})
    .catch (error => console.error('Error:', error));
}

export const getCompos = async (author) => {

    if(author === undefined){
       return fetch(`${apiRoot}`)
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch(error => console.error(error));
    } else {
       return fetch(`${apiRoot}?author=${author}`)
        .then(response => response.json())
        .then(data => {  
            return data
           
        })
        .catch(error => console.error(error));
    }
}

export const deleteCompo = async (id) => {
    try {
        const response = await fetch(`http://localhost:8000/compos/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
}


    
   

