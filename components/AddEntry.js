import React,{Component} from 'react'
import {View, TouchableOpacity, Text} from 'react-native'
import {getMetricMetaInfo, timeToString} from '../utils/helpers'

import UdaciSlider from './UdaciSlider'
import UdaciStepper from './UdaciStepper'
import DateHeader from './DateHeader'


function SubmitBtn({onPress}){
	return(
		<TouchableOpacity onPress={onPress}>
			<Text>Submit</Text>
		</TouchableOpacity>
	)
}

export default class AddEntry extends Component{

	state={
		run:0,
		bike:0,
		swim:0,
		sleep:0,
		eat:0,  
	}

	increment = (metric) =>{
		const {max, step} = getMetricMetaInfo(metric) // grab the props from the metric we are tracking
		// aka if we track run, get the steps run uses. as well as max.

		this.setState((state)=>{
			const count = state[metric] + step

			return{
				...state,
				[metric]: count > max ? max : count
			}
		})
	}

	decrement = (metric) =>{
		

		this.setState((state)=>{
			const count = state[metric] - getMetricMetaInfo(metric).step //get the step for specific metric and sub

			return{
				...state,
				[metric]: count <=0 ? 0 : count
			}
		})
	}

	slide = (metric, value) =>{
		this.setState(()=>({
			[metric]: value,
		}))

	}

	submit = () =>{
		const key = timeToString()
		const entry = this.state

		//Update redux

		this.setState(()=>({
		run:0,
		bike:0,
		swim:0,
		sleep:0,
		eat:0,  
		}))

		//navigate to home

		//save to db

		//clear local notification
	}

	render(){
		const metaInfo = getMetricMetaInfo()
		return(
			<View>
				<DateHeader date={(new Date()).toLocaleDateString()}/>
				{Object.keys(metaInfo).map((key)=>{
					const {getIcon,type,...rest} = metaInfo[key]
					const value = this.state[key] // makes the value = to the state[metric]

					return(
						<View key={key}>
							{getIcon()}
							{
								type === 'slider' ?
								<UdaciSlider
									value={value}
									onChange={(value)=>this.slide(key,value)}
									{...rest}
								/>  :

								<UdaciStepper 
									value={value}
									onIncrement={()=>this.increment(key)}
									onDecrement={()=>this.decrement(key)}
									{...rest}
								/>
							}
						</View>
					)
				})}
				<SubmitBtn onPress={this.submit}/>
			</View>

			
		)
	}
}