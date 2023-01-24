import { checkUser } from "./UserManagement";

export const errorCheck = (name,value) => {
    
    switch(name){
        
        case "username":
        
             if(value === ""){
                return("This field cannot be empty")
             } else {
               return checkUser(value).then(
                res => {
                    if(res === true){
                        return "Username already exists"
                    } else {
                        return "";
                    }
                }
               )
             
            }
        

        case "email":

            if (! /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ) {
                return "Invalid e-mail format";
            } else {
                if(value === ""){
                    return "This field cannot be empty";
                } else {
                return "";
                }
            }

        case "password":
        case "password2":

            if(value.length < 8){
                return "Write 8 characters at least"
            } else {

                //Checking the password format....

                if (! /[a-zA-Z]/.test(value) && /\d/.test(value)) {
                    return "Invalid password format";
                } else {
                    return "";
                }
            }

        default: 
            
    }
};

