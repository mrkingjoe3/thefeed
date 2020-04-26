import React, { Component } from 'react';
import { ScrollView, Button,TextInput,Text,View,StyleSheet,FlatList,ActivityIndicator,Platform,Number} from 'react-native';
import { SearchBar } from 'react-native-elements';
import Dialog, { DialogContent,DialogTitle } from 'react-native-popup-dialog';
import { sqrt, pow } from 'mathjs';



class Main extends Component {
	
	constructor(props) {
	    super(props);
	    this.state = { 
	    		isLoading: true, 
	    		dataSource: [],
	    		searchTag: '',
	    		searchTitle: '',
	    		filterDistance: 5,
	    		visible: false, 
	    		location: '',
	    		description: '',
	    		category: '',
	    		};
	    this.arrayholder = [];
	  }
	
	
	componentDidMount() {
		  
		//Sample data for several post to test the filter
		  const sampleData = [
	    	  {
	  		    "title": "Pizza",
	  		    "tags": "pizza, coke, chips",
	  		    "description": "yes",
	  		    "category": "yes",
	  		    "location": "Ceer",
	  		    "distance": "1",
	  		  },
	  		  {
	  		    "title": "Leftover chicken",
	  		    "tags": "chicken, sandwhich",
	  		    "description": "yes",
	  		    "category": "yes",
	  		    "location": "Ceer",
	  		    "distance": "4",
	  		  },
	  		  {
	    		"title": "Leftover soda",
	    		"tags": "soda, chips",
	    		"description": "yes",
	  		    "category": "yes",
	  		    "location": "Falvey",
	  		    "distance": "3",
	    	  }]
		  
		  this.setState(
		          {
		            isLoading: false,
		            dataSource: sampleData
		          },
		          function() {
		            this.arrayholder = sampleData;
		          }
		        );
	  }
	  
	  
	  //Filters the data by tags
	  SearchFilterTags(searchTag) {
	    const newData = this.arrayholder.filter(function(oldData) {
	      //extract all tags from the oldData and force them to upper case
	      const oldDataUpper = oldData.tags ? oldData.tags.toUpperCase() : ''.toUpperCase();
	      //searchTagUpperCase is the search tag but forced to all upper case
	      const searchTagUpper = searchTag.toUpperCase();
	      //Find all occurences of searchTag in the oldData's tags
	      return oldDataUpper.indexOf(searchTagUpper) > -1;
	    });	    
	    this.setState({
	      dataSource: newData,
	      searchTag: searchTag,
	    });
	  }

	  
	  //Filters the data by titles
	  SearchFilterTitles(searchTitle) {		  
	    const newData = this.arrayholder.filter(function(oldData) {
	      //extract all titles from the oldData and force them to upper case
	      const oldDataUpper = oldData.title ? oldData.title.toUpperCase() : ''.toUpperCase();
	      //searchTagUpperCase is the search title but forced to all upper case
	      const searchTitleUpper = searchTitle.toUpperCase();
	      //Find all occurences of searchTitle in the oldData's titles
	      return oldDataUpper.indexOf(searchTitleUpper) > -1;
	    });	    
	    this.setState({
	      dataSource: newData,
	      searchTitle: searchTitle,
	    });
	  }
	  
	  
	  //Removes any items that are further away than a desired max distance
	  FilterDistance = (maxDistance) => {		  
		var newData = this.arrayholder.filter(function(oldData) {
		      console.log(maxDistance);
			  if(oldData.distance <= maxDistance) {
				  console.log(oldData.distance + "\n\n");
				  return oldData.distance;
			  }
		});	   
	    this.setState({
	      dataSource: newData,
	      filterDistance: maxDistance,
	    });
	  }
	  
	  
	  ListViewItemSeparator = () => {
	    return (
	      <View
	        style={{
	          height: 0.3,
	          width: '100%',
	          backgroundColor: '#080808',
	        }}
	      />
	    );
	  };
	  
	   
  render() {
	 
	// Loading View while data is loading
	if (this.state.isLoading) {
	      return (
	        <View style={{ flex: 1, paddingTop: 20 }}>
	          <ActivityIndicator />
	        </View>
	      );
	    }
	  
	  
    return (

    	<View>
    	
    		<Button
      			title="Filter Posts"
      			onPress={() => {this.setState({ visible: true });}}/>
    		
    		<Button
  				title="Create Post"
  				onPress={() => this.props.navigation.navigate('Create')}/>
          	
    		<Dialog
          	 	style={{justifyContent: 'center',alignContent: 'center',flex: 1,backgroundColor: 'black'}}
          		visible={this.state.visible}
          		onTouchOutside={() => {this.setState({ visible: false });}}
          		dialogTitle={<DialogTitle title="Search for a post" />}>
          	
          		<DialogContent>

          				<SearchBar	//Searchbar for titles
          					round
          					searchIcon={{ size: 24 }}
          					lightTheme
          					onChangeText={text => this.SearchFilterTitles(text)}
          					onClear={text => this.SearchFilterTitles('')}
          					placeholder="Titles..."
          					value={this.state.searchTitle}
          					containerStyle={{backgroundColor: 'white', borderWidth: 0, borderRadius: 5}}
          					inputStyle={{color:'#000'}}/>
                
          				<SearchBar //Searchbar for tags
          					round
          					searchIcon={{ size: 24 }}
          					lightTheme
          					onChangeText={text => this.SearchFilterTags(text)}
          					onClear={text => this.SearchFilterTags('')}
          					placeholder="Tags..."
          					value={this.state.searchTag}
      						containerStyle={{backgroundColor: 'white', borderWidth: 0, borderRadius: 5}}
          					inputStyle={{color:'#000'}}/>
          				
          				<TextInput 
          					style = {styles.inputText}
          					underlineColorAndroid = "transparent"
          					placeholder = "Max Distance"
          					placeholderTextColor = "gray"
          					autoCapitalize = "none"
          					keyboardType = {'numeric'}
          					onChangeText = {this.FilterDistance}
          					value = {this.state.filterDistance.toString()}/>
          			
          		</DialogContent>
          	</Dialog>
          
            
            
            <ScrollView >
            	
            	<FlatList
              		data={this.state.dataSource}
            		ItemSeparatorComponent={this.ListViewItemSeparator}
            		renderItem={({ item }) => (
            		// What is displayed for each item in the list
            				<Text style={styles.textStyle}>{item.title} {"\n"}Tags: {item.tags} {"\n"}Categories: {item.category} {"\n"}Description: {item.description} {"\n"}Location: {item.location}{"\n"}Distance: {item.distance}</Text>
            		)}
                	enableEmptySections={true}
              		style={{ marginTop: 10}}
              		keyExtractor={(item, index) => index.toString()}/>
              
            	</ScrollView>
          </View>
          

    );
  }
}
  
  
  const styles = StyleSheet.create({
	  viewStyle: {
	    justifyContent: 'center',
	    alignItems: 'center',
	    flex: 1,
	    backgroundColor: 'white',
	    marginTop: Platform.OS == 'ios' ? 30 : 0,
	  },
	  textStyle: {
	    padding: 10,
	  },
	  inputText: {
	      marginTop: 10,
	      marginLeft: 10,
	      justifyContent: 'center',
	      height: 40,
	      width: 200,
	      borderColor: '#000',
	      borderWidth: 1
	   },
	});

export default Main;