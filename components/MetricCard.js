import React from 'react'
import {View, StyleSheet, Text} from 'react-native'

import DateHeader from './DateHeader'
import {getMetricMetaInfo} from '../utils/helpers'
import {gray} from '../utils/colors'


export default function MetricCard({date,metrics}){
	return(
		<View>
			{date && <DateHeader date={date}/>}
		</View>
	)
}