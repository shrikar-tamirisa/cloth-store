import './App.css';
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInSignUp from './components/signin-signup/signin-signup.component';
import { auth, createUserProfileDoc } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { connect } from 'react-redux';
import { selectCurrentUser } from './redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import CheckoutPage from './pages/checkout/checkout.component';


class App extends React.Component {

  unsubscribeFromAuth = null;
  componentDidMount(){
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDoc(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser ({
              id : snapShot.id,
              ...snapShot.data()
            }
          );
        })
      }
      else{
        setCurrentUser(userAuth);
      }
    })
  }
  
  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  
  render(){
    return <div>
    <Header/>
    <Routes>
      <Route exact path='/' Component={Homepage}/>
      <Route path='/shop' Component={ShopPage}/>
      <Route exact path='/checkout' Component={CheckoutPage}/>
      <Route exact path='/signin' element={this.props.currentUser ? 
      <Navigate to="/"/> : <SignInSignUp/>}/>
    </Routes>
  </div>
  }
  
}

const mapStateToProps = createStructuredSelector({
  currentUser : selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser : user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
