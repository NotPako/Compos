import React, {useState, useContext} from 'react';

const userContext = React.createContext();

const changeUserContext = React.createContext();

export const useUserContext = () => {
    return useContext(userContext);
};

export const useChangeUserContext = () => {
    return useContext(changeUserContext);
};


export const LoggedUserProvider = (props) => {
    const [user, setUser] = useState(null);

    const userChange = (logged) => {
        console.log("el logged",logged);
        debugger;
        setUser(logged);
    }

    return (
        <userContext.Provider value={user}>
            <changeUserContext.Provider value={userChange}>
                {props.children}
            </changeUserContext.Provider>
        </userContext.Provider>
    )
}