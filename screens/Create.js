import React, { useState, useEffect } from 'react';
import { Alert, AsyncStorage, Button, FlatList, Image, Text, TextInput, StyleSheet, View } from 'react-native';



export default function Create() {
	
  //define all the use states, aka the variables used in this function
  const [title, setTitle] = useState('');
  const [discriptionInput, setDescriptionInput] = useState('');
  const [description, setDiscription] = useState('');
  const [category, setcategory] = useState([]);
  const [tags, setTags] = useState([]);
  const [hasCameraPermission, setHasCameraPermissin] = useState('');
  const [location, setLocation] = useState(''); //I could never get the gps working for this.
  const [distance, setDistance] = useState('5');

  
  //function that gets called when save post button is pressed
  const savePost = async() => {
	  //add in a GPS coords here to be automatically stored in location by using setLocation(location)
	  const MyPost = {'title' : title, 'tags' : tags, 'description' : discriptionInput, 'category': category, 'location': location, 'distance': distance/*TODO: set distance */}
	  var postName = MyPost.title;
	  try{
		  await AsyncStorage.setItem('Post',JSON.stringify( MyPost ));
	  } catch (error){
		  alert('error storing data');
	  }
  }

	  
  //fucntion for retrieving a saved post
  const GetPost = async()=> {
	  try{
		var post = await AsyncStorage.getItem('Post');
		post=JSON.parse(post)
	  } catch (error){
		  alert('error retriving data');
	  }
	  alert(post.tags);	//Change title
  }
 
  
  //functions for adding different types of tags or categories to posts 
  const veganPressHandler = () => {
    setTags(['Vegan', ...tags]);
  };

  const glutenPressHandler = () => {
    setTags(['Glutten Free', ...tags]);
  };

  const pizzaPressHandler = () => {
    setcategory(['Pizza', ...category]);
  };

  const mexicanPressHandler = () => {
    setcategory(['Mexican', ...category]);
  };

  
  //delete a tag that was mistakenly added 
  const tagdeletePressHandler = () => {
    let minusOne = [...tags];
    let length =minusOne.length;
    let newarray=[];
    for(let i=1; i<length; i++)
      newarray[i-1] = minusOne[i];
    setTags(newarray);
  };
  
  
  //delete a category that was mistakinly added 
  const catdeletePressHandler = () => {
    let minusOne = [...category];
    let length =minusOne.length;
    let newarray=[];
    for(let i=1; i<length; i++)
      newarray[i-1] = minusOne[i];
    setcategory(newarray);
  };


  //functions for handleing the changing type value, these were moved into the main view inside of "onChangeText" and probably are not needed anymore
  /*const typingHandler = (value) => {
    setTextInput(value);
  };
  const titleHandler = (titlevalue) => {
    setTextInput(title);
  };*/

  return (

      //big container that holds everything
	  <View style={styles.container}> 
      
	  	<Text> Title: </Text>
      
	  	<TextInput
	  		onChangeText={title => setTitle(title)}
	  		titlevalue = {title}
	  		style={{ backgroundColor: '#eaeaea', width: 300, height: 20 }}>
	  	</TextInput>
	  	
	  	<Text> Distance: </Text>
	      
	  	<TextInput
	  		onChangeText={distance => setDistance(distance)}
	  		distancevalue = {distance}
	  		style={{ backgroundColor: '#eaeaea', width: 300, height: 20 }}>
	  	</TextInput>
     
	  	<Text>Dietary Restrictions Select: </Text>

	  	<View style={styles.Rowcontainer}>
	  	
	          <View style={styles.tagButton}>
	            <Button
	            onPress={veganPressHandler}
	            title=' Vegan' />
	          </View>
	          
	          <View style={styles.tagButton}>
	            <Button
	               onPress={glutenPressHandler}
	               title=' Glutten Free ' />
	           </View>
	 	
	           <View style={styles.tagButton}>
	             <Button
	               onPress={tagdeletePressHandler}
	               title="Delete" />
	           </View> 
	             
	    </View>
	    
	    <Text>Discription</Text>
	    
	    <TextInput
	          onChangeText={discriptionInput =>  setDescriptionInput(discriptionInput)}
	          value={discriptionInput}
	          style={{ backgroundColor: '#eaeaea', width: 300, height: 80 }}/>
	        
	  	<Text>Select Category/categories </Text>
	  	  
	  	<View style={styles.Rowcontainer}>
	  		<View style={styles.tagButton}>
	  			<Button
	  				onPress={pizzaPressHandler}
	  				title="Pizza" />
	  		</View>

	  		<View style={styles.tagButton}>
	  			<Button
	  				onPress={mexicanPressHandler}
	  				title='Mexican' />
	  		</View>

	  		<View style={styles.tagButton}>
	  			<Button
	  				onPress={catdeletePressHandler}
	  				title="Delete" />
	  		</View> 
	  	</View> 
	  	
	  	<View style={styles.tagButton}>
	  		<Button
	  			onPress={savePost}
	  			title="SavePost" />
	  	</View>

	  	<View style={styles.tagButton}>
	  		<Button
	  			onPress={GetPost}
	  			title="GetPost" />
	  	</View>
	  		
	  	<Text> Categories: </Text>
	  	
	  	<FlatList
	  	    data={category}
	  	    renderItem={category => <Category text={category.item}/>}/>


	  	<Text> tags: </Text>

	  	<FlatList
	  	    data={tags}
	  	    renderItem={tags => <Tags text={tags.item}/>}/>
    </View>

  );
}


//styles!
const styles = StyleSheet.create({

  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: '#fff', //7ed957',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tagButton: {
    padding: 5,
    height: 50,
    width: 150, 
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#00BCD4'
  },
  Rowcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'

  }
  
});

//I don't quite undersand these things down here, other than the fact that they make the lists work. 
const Tags = props => (
  <View 
    style={{ backgroundColor: "#eaeaea", width: 300, margin: 5 }}>
    <Text>{props.text}</Text>
  </View>
);

const Category = props => (
  <View 
    style={{ backgroundColor: "#eaeaea", width: 300, margin: 5 }}>
    <Text>{props.text}</Text>
  </View>
);

//export default Create;