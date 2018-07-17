# react-native-slot-creator
Creates time slots for iOS and Android React-Native apps , this package is in heavy development phase.

## PLANNED FEATURES

- [x] Get time slots between given start time and end time
- [x] Get slots in required format (12hrs and 24hrs both)
- [x] Remove the inbetween breaktime slots if required.
- [ ] DateObject manupulation
- [ ] Dynamic UI for slots


### Installation

1. ```npm install react-native-slot-creator --save```



### Example


```jsx
import React from 'react';
import { View, Image } from 'react-native';
import { slotCreator } from "react-native-slot-creator";


export default class App extends Component {
  componentWillMount(){
    // Default format
    slotCreator.createSlot(startTime, endTime, slotDuration, breakStartTime, breakEndTime, is12HoursFormat)

    // To get the Array of slots between given time interval with breakTime and 12 Hrs format
    let requiredArray = slotCreator.createSlot("08:00","10:00","20","09:00","09:30",true)
    console.warn("requiredArray",requiredArray)


    // To get the Array of slots between given time interval without breakTime 
    let requiredArray = slotCreator.createSlot("08:00","10:00","20")
    console.warn("requiredArray",requiredArray)
    
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
      </View>
    );
  }
}

```
### Parameters

| Parameter  | Default  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| startTime | null | `24 Hrs` | Start time of your time interval  | `Yes` |
| endTime | null | `24 Hrs` | End time of your time interval   | `Yes` |
| slotDuration | null | `Mins` | Duration of slot you require | `Yes` |
| breakStartTime | null | `24 Hrs` | Break start time | `optional` |
| breakEndTime | null | `24 Hrs` |  Break start time | `optional` |
| is12HoursFormat | false | `bool` | If you require the result in 12 Hrs format set this as true | `optional` |
