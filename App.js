// Assignment 3
//Tommy Bruzzese


import React from 'react';
import { StyleSheet, Text, TextInput, View, SafeAreaView, Image, Dimensions, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native'
import { Images, Colors } from './App/Themes'
import { FontAwesome } from '@expo/vector-icons'
import APIRequest from './App/Config/APIRequest'

import News from './App/Components/News';
import Search from './App/Components/Search';

var { height, width } = Dimensions.get('window');

export default class App extends React.Component {
  state = {
      loading: true,
      articles : [],
      searchText: '',
      category: ''
  }

  onChangeText = text => {
    this.setState({searchText: text});
  }

  conductSearch = () => {
    this.setState({searchText: ""});
    this.loadArticles(this.state.searchText, category = '')
  }

  componentDidMount() {
    this.loadArticles();
  }

  async loadArticles(searchTerm = '', category = '') {
    console.log("running");
    this.setState({articles:[], loading: true});
    var resultArticles = [];
    if (category === '') {
      resultArticles = await APIRequest.requestSearchPosts(searchTerm);
    } else {
      resultArticles = await APIRequest.requestCategoryPosts(category);
    }
    this.setState({loading: false, articles: resultArticles})
  }

  render() {
    const {articles, loading} = this.state;

    return (
      <TouchableWithoutFeedback onPress = {() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
          <Image
            style = {{width: width * 0.9, height: 100}}
            resizeMode = 'contain'
            source = {Images.logo}
          />
          <View style={styles.container2}>
            <View style={styles.SearchBar}>
              <TextInput
                  style={styles.textinput}
                  onChangeText={text => this.onChangeText(text)}
                  value={this.state.searchText}
                  placeholder="Search for News"
                  onSubmitEditing={() => this.conductSearch()}
              />
              <TouchableOpacity style={styles.Image}
                onPress={() => this.conductSearch()}>
                <FontAwesome name="search" size={20} color="#cc338b" />
              </TouchableOpacity>
            </View>
          </View>
          <News
            articles={this.state.articles}
            loading={this.state.loading}
          />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container2: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  SearchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    height: 40,
    margin: 5,
    borderRadius: 10
  },
  textinput: {
    flex: 1,
    marginStart: 10,
  },
  Image: {
    justifyContent: 'flex-end',
    marginEnd: 10,
  }

});
