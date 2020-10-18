import React from 'react'
import { View, Text } from 'react-native'
import {ArrowLeftOutlined} from "@ant-design/icons"


export default function BackIcon() {
    return(
        <ArrowLeftOutlined 
            size={24}
            style={{padding : 12}}
            color="#333"
            onClick={() => console.log("pressed")}
        />
    )
}
