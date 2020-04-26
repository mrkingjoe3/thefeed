import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet,Image,AsyncStorage } from 'react-native';


class Login extends Component {
	
	constructor(props) {
	    super(props);
	    this.state = {
	      username: '',
	      password: '',
	    };
	  }
	  
	  onLogin = async()=> {
	    var loginid=await AsyncStorage.getItem('Username')
	    loginid=JSON.parse(loginid)
	    var pass=await AsyncStorage.getItem('Password')
	    pass=JSON.parse(pass)
	    if(loginid==this.state.username){
	      if(pass==this.state.password){
	        alert("Logged In");
	        this.props.navigation.navigate('Main');
	      }
	      else{
	        alert("Incorrect Password");
	      }
	    }
	    else{
	      alert("Incorrect Login");
	    }
	  }
	  createAcct =async()=> {
	    AsyncStorage.setItem('Username',JSON.stringify(this.state.username))
	    AsyncStorage.setItem('Password',JSON.stringify(this.state.password))
	    alert("Account Created")
	  }

	  
	  
  render() {
    return (
    		
    		<View style={styles.container}>
    			
    			<Button
            			title="ByPass Login"
            			onPress={() => this.props.navigation.navigate('Main')}/>
           
    			<TextInput
    				value={this.state.username}
    				onChangeText={(username) => this.setState({ username })}
    				placeholder={'Username'}
    				style={styles.input}/>
            
    			<TextInput
    				value={this.state.password}
    				onChangeText={(password) => this.setState({ password })}
    				placeholder={'Password'}
    				secureTextEntry={true}
    				style={styles.input}/>
            
    			<Button
    				title={'Login'}
    				style={styles.input}
    				onPress={()=> this.onLogin()}/>
            
    			<Button
    				title={'Create Account'}
    				style={styles.inputtwo}
    				onPress={()=> this.createAcct()}/>	
          
    		</View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7ed957',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ffffff',
    marginBottom: 10,
    backgroundColor: '#ffffff',
  },
  inputtwo: {
    width: 200,
    height: 44,
    padding: 0,
    borderWidth: 1,
    borderColor: '#ffffff',
    marginBottom: 0,
    backgroundColor: '#ffffff',
  },
});



export default Login;