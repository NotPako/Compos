import React, { useState, useContext } from 'react';

const userContext = React.createContext({ user: null, profilePicture: '' });

const changeUserContext = React.createContext();

export const useUserContext = () => {
	return useContext(userContext);
};

export const useChangeUserContext = () => {
	return useContext(changeUserContext);
};

export const LoggedUserProvider = (props) => {
	const [user, setUser] = useState(null);
	const [profilePicture, setProfilePicture] = useState('');
	const userChange = (logged) => {
		console.log('el logged', logged);

		setUser(logged);
	};

	return (
		<userContext.Provider value={{ user, profilePicture }}>
			<changeUserContext.Provider value={{ userChange, setProfilePicture }}>
				{props.children}
			</changeUserContext.Provider>
		</userContext.Provider>
	);
};
