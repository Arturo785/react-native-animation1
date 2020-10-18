import React from 'react'
import { StyleSheet, Text, View, Image, Animated, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SharedElement } from 'react-navigation-shared-element';

import { tutorial2Spec } from '../config/theme'

import * as Animatable from "react-native-animatable"
import { FlatList } from 'react-native-gesture-handler';

const {ITEM_WIDTH, ITEM_HEIGHT, RADIUS, SPACING, FULL_SIZE} = tutorial2Spec

const { width, height } = Dimensions.get('window');

//There is a bug with back arrow but i was lazy to correct it

export default function TravelDetails(props) {

    const {navigation, route} = props
    const {item} = route.params

    const zoomIn = {
        0 : {
            opacity : 0,
            scale : 0
        },
        1 : {
            opacity : 1,
            scale : 1
        }
    }


    return (
        <SafeAreaView style={{flex : 1}}>

            <SharedElement id={`item.${item.key}.photo`} style={[StyleSheet.absoluteFillObject]}>

                <View style={[StyleSheet.absoluteFillObject, {borderRadius : 0} ]}>
                    <Image  
                        source={{uri : item.image}}
                        style={ [StyleSheet.absoluteFillObject, {resizeMode: "cover"}] }
                    />
                </View>

            </SharedElement>   

            <SharedElement id={`item.${item.key}.location`}>

                <Text // the text is movible
                    style={[styles.location]}>
                        {item.location}
                </Text>

            </SharedElement>

            <View style={{position : "absolute", bottom : 120 }} >

                <Text 
                    style={[
                        {fontSize : 16,
                         width: "100%",
                         textTransform: "uppercase",
                         fontWeight : "800",
                         color : "#fff",
                         marginHorizontal : SPACING, 
                        }
                        ]}
                        >
                    Activity
                </Text>
                <FlatList 
                    data={[...Array(8).keys()]}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{padding : SPACING}}
                    keyExtractor={item => String(item)}
                    renderItem={({item, index}) => {
                        return (
                            <Animatable.View
                                duration={700}
                                animation={zoomIn}
                                delay={400 + index * 100}
                                style={{
                                width: width * 0.33,
                                height: width * 0.5,
                                backgroundColor: 'white',
                                marginRight: SPACING,
                                padding: SPACING,
                                }}
                            >
                                <Image source={{ uri : 'https://miro.medium.com/max/4064/1*qYUvh-EtES8dtgKiBRiLsA.png',}}
                                 style={{
                                    width: '100%',
                                    height: '70%',
                                    resizeMode: 'cover',
                                    marginBottom: 10,
                                  }}
                                />

                                <Text> Activity # ${item + 1} </Text>
                            </Animatable.View>
                        )
                    }}
                />

            </View>

        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    location : {
        fontSize : 30,
        color : "#fff",
        fontWeight : "800",
        width : ITEM_WIDTH * 0.8,
        position : "absolute",
        top : 50,
        left : SPACING * 2
    },
})

TravelDetails.sharedElements = (route, otherRoute, showing) => {
    const { item } = route.params;
    return [
      {
        id: `item.${item.key}.photo`,
      },
      {
        id: `item.${item.key}.location`,
      },
    ];
  };

