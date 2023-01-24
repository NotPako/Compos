var apiRoot = 'http://localhost:8000/compos';

export const autoSave =  async (title, author, date, list, blackList, instrument, existId) => {

   
    if(existId === ""){
        
    return fetch(`${apiRoot}`, {
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
    .then(response => {return response.id})
    .catch (error => console.error('Error:', error));
} else {
    
    fetch(`${apiRoot}/${existId}`, {
  method: 'PATCH',
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
})

}
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

export const getCompoById = async (id) => {
    return fetch(`${apiRoot}/${id}`)
    .then(response => response.json())
    .then(data => {  
        return data
       
    })
    .catch(error => console.error(error));
}



    
   

