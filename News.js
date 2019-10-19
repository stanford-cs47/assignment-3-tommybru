/*
*
* Assignment 3
* Starter Files
*
* CS47
* Oct, 2018
*/

import React, { Component } from 'react'
import PropTypes from 'prop-types' //consider using this!
import { StyleSheet, SafeAreaView, View, FlatList, Text, Linking, TouchableOpacity, ActivityIndicator } from 'react-native'
import { material } from 'react-native-typography' //consider using this!
import { Metrics, Colors } from '../Themes'

export default News = (props) => {

  renderArticle = (index, item) => (
    <TouchableOpacity onPress = {() => Linking.openURL(props.articles[index].url)}>
      <View style={{marginBottom: 30}}>
        <Text style={material.headline}>
            {props.articles[index].title}
        </Text>
        <Text style={material.body1}>
            {props.articles[index].snippet}
        </Text>
        <Text style={material.button}>
            {props.articles[index].byline}
        </Text>
        <Text style={material.caption}>
            {props.articles[index].date}
        </Text>
      </View>
    </TouchableOpacity>
  )

  keyExtractor = index => {
    return index.toString();
  }

  loadArticlesContent = () => {
    let contentDisplay = null;
    if(props.loading) {
      contentDisplay = <ActivityIndicator size="large" color="black"/>
    } else {
      contentDisplay = <FlatList data={props.articles} renderItem={({index, item}) => this.renderArticle(index, item)} keyExtractor={(item, index) => this.keyExtractor(index)}/>
    }

    return (
      <View style={styles.container}>
        {contentDisplay}
      </View>
    )
  }

  return (
    this.loadArticlesContent()
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20
  },
});
