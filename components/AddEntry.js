import React,{Component} from 'react'
import {View} from 'react-native'
import {getMetricMetaInfo} from '../utils/helpers'

import UdaciSlider from './UdaciSlider'
import UdaciStepper from './UdaciStepper'
import DateHeader from './DateHeader'
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

	render(){
		const metaInfo = getMetricMetaInfo()
		return(
			<View>
				<DateHeader date={(new Date()).toLocaleDateString()}/>

				{Object.keys(metaInfo).map((item)=>{
					const {getIcon,type,...rest} = metaInfo[item]
					const value = this.state[item] // makes the value = to the state[metric]

					return(
						<View key={item}>
							{getIcon()}
							{
								type === 'slider' ?
								<UdaciSlider
									value={value}
									onChange={(value)=>this.slide(metric,value)}
									{...rest}
								/>  :

								<UdaciStepper 
									value={value}
									onIncrement={()=>this.increment(metric)}
									onDecrement={()=>this.decrement(metric)}
									{...rest}
								/>
							}
						</View>
					)
				})}
			</View>
		)
	}
}