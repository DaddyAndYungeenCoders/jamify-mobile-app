import React, {useState} from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Image, TextInput, Button, Platform} from 'react-native';
import {ClassicButtonProps} from "@/types/classic-button.types";
import {ThemedText} from "@/components/ThemedText";
import {Input} from "postcss";
import {Is} from "@sinclair/typebox/value/is";
import Date = Is.Date;
import RNDateTimePicker, {DateTimePickerAndroid} from "@react-native-community/datetimepicker";
import {DatePicker} from "@/components/DatePicker";

export enum inputType {
    TEXT = "default",
    NUMBER = "number-pad",
    URL = "url",
    EMAIL = "email-address",

}
const InputAndLabel = ({
                           title,
                           placeHolder = "Entrez du text...",
                           type = inputType.TEXT,
                       }) => {
    return (
        <View style={styles.body}>
            <ThemedText style={styles.text}>{title}</ThemedText>
            <TextInput style={styles.input} placeholder={placeHolder} keyboardType={type} />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        backgroundColor: "#737373",
        minWidth: "90%",
        maxWidth: "90%"
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    body: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,
        minWidth: "100%",
    },
    text: {
        fontWeight: '600',
        fontFamily: "Jost",
    },
    logo: {
        marginHorizontal: 8,
        resizeMode: 'contain',
    },
});

export default InputAndLabel;
