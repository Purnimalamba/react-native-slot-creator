/**
 *
 * slotCreator Module
 * @author Purnima Lamba
 *
 */

import { Platform } from 'react-native';

function createSlot(startTime, endTime, slotDuration, breakStartTime, breakEndTime, is12HoursFormat) {
    var startTimeInminutes = null;
    var endTimeInminutes = null;
    var breakStartTimeInminutes = null;
    var breakEndTimeInminutes = null;
    let slotArray = []
    let initialSlotArray = []
    let initialBreaktimeArray = []
    try {

        let [startTimeHour, startTimeMinute] = startTime.split(":")
        let [endTimeHour, endTimeMinute] = endTime.split(":")
        startTimeInminutes = (parseInt(startTimeHour) * 60) + parseInt(startTimeMinute);
        endTimeInminutes = (parseInt(endTimeHour) * 60) + parseInt(endTimeMinute);
       
        if (breakStartTime && breakEndTime){
            let [breakStartTimeHour, breakStartTimeMinute] = breakStartTime.split(":")
            let [breakEndTimeHour, breakEndTimeMinute] = breakEndTime.split(":")
            breakStartTimeInminutes = (parseInt(breakStartTimeHour) * 60) + parseInt(breakStartTimeMinute);
            breakEndTimeInminutes = (parseInt(breakEndTimeHour) * 60) + parseInt(breakEndTimeMinute);
        }
        
    } catch (error) {
    }
  
    if (slotDuration > 0) {
        if (startTimeInminutes != 0 && endTimeInminutes != 0) {
            let diffOfTime = null
            if (endTimeInminutes > startTimeInminutes) {
                diffOfTime = endTimeInminutes - startTimeInminutes
            } else {
                diffOfTime = startTimeInminutes - endTimeInminutes
            }
            if (diffOfTime > 0) {
                let numberOfSlots = diffOfTime / slotDuration
                for (var slots = 0; slots < numberOfSlots; slots++) {
                    let timeSlot = convertMinsToHrsMins(startTimeInminutes + (slots * slotDuration))
                    initialSlotArray.push(timeSlot)
                }
            }
        }
        if (breakStartTime && breakEndTime) {
        if (breakStartTimeInminutes != 0 && breakEndTimeInminutes != 0) {
            let diffOfBreakTime = null
            if (breakEndTimeInminutes > breakStartTimeInminutes) {
                diffOfBreakTime = breakEndTimeInminutes - breakStartTimeInminutes
            } else {
                diffOfBreakTime = breakStartTimeInminutes - breakEndTimeInminutes
            }
            
            if (diffOfBreakTime > 0) {
                let numberOfSlots = diffOfBreakTime / slotDuration
                for (let slots = 0; slots < numberOfSlots ; slots++) {
                    let timeSlot = convertMinsToHrsMins(breakStartTimeInminutes + (slots * slotDuration))
                    initialBreaktimeArray.push(timeSlot)
                }
            }
        }
    }
        if (initialBreaktimeArray.length > 0 && initialSlotArray.length > 0) {
            let lengthCount = initialBreaktimeArray.length - 1
            for (let count = 0; count < initialSlotArray.length; count++) {
                for (let counter = 0; counter < initialBreaktimeArray.length; counter++) {
                    if (initialSlotArray[count] >= initialBreaktimeArray[0] && initialSlotArray[count] <= initialBreaktimeArray[lengthCount]) {
                        initialSlotArray.splice(count,1)
                    }
                }
            }
            slotArray = initialSlotArray

        } else {
            slotArray = initialSlotArray
        }
        if (is12HoursFormat && slotArray.length>0){
            let finalArray =  to12HrsFormat(slotArray)
            return finalArray
        }else{
            return slotArray;
        }
    } else {
        console.warn("Slot duration not defined")
    }
}
var slotCreator = {
    createSlot: createSlot,
}
function convertMinsToHrsMins(mins) {
    let h = Math.floor(mins / 60);
    let m = mins % 60;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    return `${h}:${m}`;
}
function to12HrsFormat(slotArray) {
    let slotArrayFormatted=[]
    let timeSlot =null
    for(let count = 0 ; count < slotArray.length ; count++){
       let[h,m] = slotArray[count].split(":")
       if(h >= 12){
           timeSlot = h % 12 + ":" + m + " P.M"
       }else{
           timeSlot = h + ":" + m + " A.M"
       }
        slotArrayFormatted.push(timeSlot)
    }
    return slotArrayFormatted
}
module.exports = {
    slotCreator
};
