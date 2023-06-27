import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInSignUp from './components/signin-signup/signin-signup.component';
import { auth, createUserProfileDoc } from './firebase/firebase.utils';
import { useState } from 'react';
import { useEffect } from 'react';

class App extends React.Component {

  constructor(){
    super();

    this.state = {
      currentUser : null
    }
  }
  
  unsubscribeFromAuth = null;
  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDoc(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser : {
              id : snapShot.id,
              ...snapShot.data()
            }
          });
        })
      }
      else{
        this.setState({currentUser : userAuth})
      }
    })
  }
  
  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  
  render(){
    return <div>
    <Header currentUser={this.state.currentUser}/>
    <Routes>
      <Route exact path='/' Component={Homepage}/>
      <Route path='/shop' Component={ShopPage}/>
      <Route path='/signin' Component={SignInSignUp}/>
    </Routes>
  </div>
  }
  
}

export default App;
