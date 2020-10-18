import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image, Animated } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view';
import { SharedElement } from 'react-navigation-shared-element';
import location from "../config/data/locations"
import { tutorial2Spec } from '../config/theme'

const {ITEM_WIDTH, ITEM_HEIGHT, RADIUS, SPACING, FULL_SIZE} = tutorial2Spec


export default function TravelList({navigation}) {

    const scrollX = React.useRef(new Animated.Value(0)).current;

    //Basically a flat list with lots of weird things for animation

    return (
        <SafeAreaView style={{flex : 1}}>
            <Animated.FlatList 
                data={location}
                horizontal
                showsVerticalScrollIndicator={false}
                snapToInterval={FULL_SIZE}
                decelerationRate="fast"
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollX}}}],
                    {useNativeDriver: true}
                )}
                keyExtractor={(item) => item.key}

                //all this shit is for moving things
                renderItem={({item, index}) => {

                    const inputRange = [(index - 1) * FULL_SIZE, index * FULL_SIZE, (index + 1) * FULL_SIZE]

                    const translateX =  scrollX.interpolate({
                        inputRange,
                        outputRange : [ITEM_WIDTH, 0, -ITEM_WIDTH]
                    })

                    const scale = scrollX.interpolate({
                        inputRange,
                        outputRange : [1, 1.1 ,1],
                    })

                    return <TouchableOpacity 
                        style={styles.itemContainer}
                        onPress={() => {
                            navigation.navigate("details", {item})
                        }}>

                        <SharedElement id={`item.${item.key}.photo`} style={[StyleSheet.absoluteFillObject]}>

                            <View style={[StyleSheet.absoluteFillObject, {overflow : "hidden", borderRadius: RADIUS}]}>
                                <Animated.Image  
                                    source={{uri : item.image}}
                                    style={[StyleSheet.absoluteFillObject, {resizeMode: "cover", transform : [{scale}]}]}
                                />
                            </View>

                        </SharedElement>

                        <SharedElement id={`item.${item.key}.location`}>

                            <Animated.Text // the text is movible
                                style={[styles.location,{transform : [{translateX}]}]}>
                                    {item.location}
                            </Animated.Text>

                        </SharedElement>

                        <View style={styles.dayContainer}>

                            <Text style={styles.daysValue}>
                                {item.numberOfDays}
                            </Text>

                            <Text style={styles.daysLabels}>
                                Days
                            </Text>

                        </View>

                    </TouchableOpacity>
                }}
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    itemContainer : {
        width : ITEM_WIDTH,
        height : ITEM_HEIGHT,
        margin : SPACING
    },
    location : {
        fontSize : 30,
        color : "#000",
        fontWeight : "800",
        width : ITEM_WIDTH * 0.8,
        position : "absolute",
        top : SPACING,
        left : SPACING
    },
    dayContainer : {
        position : "absolute",
        bottom : SPACING,
        left : SPACING,
        width : 52,
        height : 52,
        borderRadius : 26,
        backgroundColor : "tomato",
        justifyContent : "center",
        alignItems : "center"

    },
    daysValue : {
        fontWeight : "800",
        color : "#fff",
        fontSize : 18,

    },
    daysLabels : {
        fontWeight : "800",
        color : "#fff",
        fontSize : 10,
    }
})
