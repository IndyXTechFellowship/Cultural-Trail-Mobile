import * as types from '../actions/actionTypes'
import { Actions } from 'react-native-router-flux'
import _ from 'lodash'
import storage from 'react-native-simple-store';

export function goToRegister() {
  return {
    type: types.GO_TO_REGISTER_BUTTON_CLICKED
  }
}

export const receiveLoginResponse = (loginResponse) => {
  console.log(loginResponse)
  return {
    type: types.RECEIVE_REGISTER_RESPONSE,
    payload: loginResponse
  }
}

export const submitLogin = (LoginFormData) => {
  const postBody = {
    user: {
      name: LoginFormData.name,
      email: LoginFormData.email,
      password: LoginFormData.password
    }
  }

  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  return (dispatch) => {

    return fetch(`http://ec2-52-206-122-212.compute-1.amazonaws.com/auth/login`,
      {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(postBody),
        headers: myHeaders
      })
     .then(response => response.json())
     .then(json => {
       const hasToken = _.has(json, 'data.token')
       if(hasToken) {
         storage.save('token', json.data.token)
         Actions.issues()
       }
       dispatch(receiveLoginResponse(json))
    })
  }
}
