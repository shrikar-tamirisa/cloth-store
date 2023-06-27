import React from "react";
import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import "./sign-in.styles.scss";
import CustomButton from "../custom-button/custom-button.component";
import { signInWithGoogle, auth } from "../../firebase/firebase.utils";

function SignIn(){
    const [signState, setSignState] = useState({email : '', password: ''});
    
    async function handleSubmit(event){
        event.preventDefault();
        
        const {email, password} = signState;
        try{
            await auth.signInWithEmailAndPassword(email, password);
            setSignState({email : '', password : ''});

        }catch(error){
            alert(error);
        }
    }

    function handleChange(event){
        const {value, name} = event.target;
        setSignState(prev => ({...prev, [name] : value}));
    }

    return <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={handleSubmit}>
            <FormInput name="email" type="email" value={signState.email} required handleChange={handleChange} label="email"/>
            
            <FormInput name="password" type="password" value={signState.password} required handleChange={handleChange} label="password"/>
            
            <div className="buttons">
                <CustomButton type='submit'>Sign In!</CustomButton>
                <CustomButton onClick={signInWithGoogle} isGoogle={true}>Sign in with Google!</CustomButton>
            </div>
        </form>
    </div>
}

export default SignIn;