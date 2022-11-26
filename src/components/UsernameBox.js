import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
    responsiveWidth as rw,
    responsiveHeight as rh,
} from '@/utils/responsive';
import { ChevronLeft, ChevronRight } from './icons';
import { useTheme } from '@react-navigation/native';
import typography from '../constants/typography';

const UsernameBox = (props) => {
    const { colors } = useTheme();

    return (
        <View
            style={[
                styles.dateBoxContainer,
                { width: rw(266), height: rh(64), marginTop: -rh(28), backgroundColor: colors.boxBg },
            ]}>
            <Text style={[styles.dateText, { color: colors.usernameText, }, typography.H4Regular]}>
                {props.username}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    dateBoxContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
        borderRadius: 32,
        marginLeft: 'auto',
        marginRight: 'auto',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        zIndex: 3,
        elevation: 3,
    },
    dateText: {
        fontSize: 16,

        fontWeight: '400',
    },
});

export default UsernameBox;