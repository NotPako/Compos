import React from 'react';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { Input, Button, Popover } from 'antd';
import { useState } from 'react';
import {errorCheck} from '../../Services/Validate';
import './RegisterCard.css';
import { AddUser } from '../../Services/UserManagement';
import { useChangeUserContext } from '../../Providers/LoggedUserProvider';

const RegisterCard = () => {

    const userChange = useChangeUserContext();

    const [user, setUser] = useState({
        username : '',
        email : '',
        password: '',
        password2: ''
    });

    const [userError, setUserError] = useState({
        usernameError : '',
        emailError : '',
        passwordError : '',
        password2Error : ''
    })

    const [userErrorShake, setUserErrorShake] = useState({
        usernameError : '',
        emailError : '',
        passwordError : '',
        password2Error : ''
    })

    const [regError, setRegError] = useState('');
    

    const inputHandler = (e) => {

        setUser((prevState)=>({...prevState, 
            [e.target.name] : e.target.value
        }));

    }
    
    const contentPswErr = (
        <div>
            Password may contain numbers and letters
        </div>
    );

    const errorHandler = (e) => {

        let error = "";
        
     

        error = errorCheck(e.target.name,e.target.value);


        if(e.target.name === "password2"){
            if(user.password !== user.password2){
                error = "Write the same password twice"
            }
        }
       

        setUserError((prevState)=>({...prevState, 
            [e.target.name + 'Error'] : error
        }));

      

    }

    const registerMe = () => {
        if(JSON.stringify(userError) === JSON.stringify({
            usernameError : "",
            emailError : "",
            passwordError : "",
            password2Error : ""
        })){
            ///No hi han errors, registrem l'usuari, buidem camps i mostrem missatge de confirmació
            setRegError('');
            console.log(user);
            AddUser(user);
            console.log('registrado');
            userChange(user);
            

            
        } else {
            ///Si hi han, mostrem missatge de que revise els errors
            setRegError('Please, fix the errors above first');
            console.log(userError);

            


            
        }
    }

    return(
        <div className="registerCardDesign">
            <div className="cardHeaderDesign">
                <h1>Sign up</h1>
            </div>
            <div className="cardBodyDesign">
                <Input className="fieldDesign"  name="username" size="large" placeholder="Username" prefix={<UserOutlined/>} status={userError.usernameError === "" ? "" : "error"} onChange={(e)=>inputHandler(e)} onBlur={(e)=>errorHandler(e)}></Input>
                <div className='errorMsg'>{userError.usernameError}</div>
                <br />
                <Input className={(regError === '' ? "fieldDesign" : "fieldDesignShake")} name="email" size="large" status={userError.emailError === "" ? "" : "error"} onChange={(e)=>inputHandler(e)} onBlur={(e)=>errorHandler(e)} placeholder="E-mail" prefix={<MailOutlined/>}></Input>
                <div className='errorMsg'>{userError.emailError}</div>
                <br />
                <Input className={(regError === '' ? "fieldDesign" : "fieldDesignShake")} name="password" type="password" size="large" status={userError.passwordError === "" ? "" : "error"} placeholder="Password" prefix={<LockOutlined/>} onChange={(e)=>inputHandler(e)} onBlur={(e)=>errorHandler(e)}></Input>
                <Popover content={contentPswErr} placement="right">
                <div className='errorMsg'>{userError.passwordError}</div>
                </Popover>
                <br />
                <Input className={(regError === '' ? "fieldDesign" : "fieldDesignShake")}  name="password2" type="password" size="large" status={userError.password2Error === "" ? "" : "error"} placeholder="Confirm password" prefix={<LockOutlined/>} onChange={(e)=>inputHandler(e)} onBlur={(e)=>errorHandler(e)}></Input>
                <div className='errorMsg'>{userError.password2Error}</div>   
                </div>
            <br/>
            <br/>
            <div className="cardFooterDesign">
                <Button onClick={()=>registerMe()}>Register</Button>
                <div className='errorMsg'>{regError}</div>
                
            </div>
        </div>
    )
}

export default RegisterCard;