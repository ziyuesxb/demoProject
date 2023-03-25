<template>
	<div class="top">
		<div class="top_header">
			<div class="iconfont top_header_back" @click="handleBackClick">
				&#xe604;
			</div>
			确认订单
		</div>
		<div v-if="address.city" class="top_receiver" @click="handleAddressClick">
			<div class="top_receiver_title">收货地址</div>
			<div class="top_receiver_address">
				{{address.city}}{{address.area}}{{address.house}}
			</div>
			<div class="top_receiver_info">
				<span class="top_receiver_info_name">{{address.real_name}}</span>
				<span class="top_receiver_infor_name">{{address.mobile}}</span>
			</div>
			<div class="iconfont top_receiver_icon">&#xe602;</div>
		</div>
		<div v-else class="top_receiver" @click="handleAddressClick">
			<div class="top_receiver_title">收货地址</div>
			<div class="top_receiver_address">请填写默认地址</div>
			<div class="iconfont top_receiver_icon">&#xe602;</div>
		</div>
	</div>
</template>

<script>
	import {useRouter,useRoute} from 'vue-router';
	import {ref} from "vue";
	import request from '../utils/request.js'
	const useAddressEffect=()=>{
		const router=useRouter();
		const route=useRoute();
		//点击地址，携带参数跳转到地址页面
		const handleAddressClick=()=>{
			router.push({name:'Address',params:{order_no:true}})
		}
		// const orderNo=route.params.order_no;
		// console.log(route.params)
		const handleBackClick=()=>{
			localStorage.setItem('orderList','');
			router.back()
		}
		
		// const handleSaveClick=(item)=>{
		// 	if(orderNo){
		// 		const handleSaveDefault=async()=>{
		// 			const result=await request.post('/api/v1/updateAddress/'+userInfo.id,{
		// 				id:item.id,
		// 				is_default:1
		// 			})
		// 			// console.log(result)
		// 			if(result.msg=='ok'){
		// 				console.log('更新成功')
		// 			}
		// 		}
		// 		handleSaveDefault();
		// 		router.back()
		// 	}else{
		// 		router.push({name:'AddressSave',params:{address:JSON.stringify(item)}})
		// 	}
		// }
		//请求默认地址接口，获取默认地址
		let userInfo=JSON.parse(localStorage.userinfo);
		let address=ref([]);
		const handleItemClick=async()=>{
			const result=await request.get('/api/v1/defaultAddress/'+userInfo.id);
			// console.log(result)
			if(result.msg=='ok'){
				console.log(address)
				address.value=result.data
			}else{
				address.value=''
			}
		}
		handleItemClick()
		return {handleBackClick,handleAddressClick,address,handleItemClick}
	}
	export default{
		setup(){
			const {handleBackClick,handleAddressClick,address,handleItemClick}=useAddressEffect();
			return {handleBackClick,handleAddressClick,address,handleItemClick}
		}
	}
	
</script>

<style lang="scss" scoped>
	.top {
		position: relative;
		height: 1.96rem;
		background-size: 100% 1.59rem;
		background-image: linear-gradient(0deg, rgba(221, 206, 254, 0) 2%, #7543e0 50%);
		background-repeat: no-repeat;
	
		&_header {
			position: relative;
			padding-top: 0.2rem;
			line-height: 0.24rem;
			color: #fff;
			text-align: center;
			font-size: 0.16rem;
	
			&_back {
				position: absolute;
				left: 0.18rem;
				font-size: 0.12rem;
			}
		}
	
		&_receiver {
			position: absolute;
			left: 0.18rem;
			right: 0.18rem;
			bottom: 0;
			height: 1.11rem;
			background: #fff;
			border-radius: 0.04rem;
	
			&_title {
				line-height: 0.22rem;
				padding: 0.16rem 0 0.14rem 0.16rem;
				font-size: 0.16rem;
				color: #333;
			}
	
			&_address {
				line-height: 0.2rem;
				padding: 0 0.4rem 0 0.16rem;
				font-size: 0.14rem;
				color: #333;
			}
	
			&_info {
				padding: 0.06rem 0 0 0.16rem;
	
				&_name {
					margin-right: 0.06rem;
					line-height: 0.18rem;
					font-size: 0.12rem;
					color: #666;
				}
			}
	
			&_icon {
				position: absolute;
				right: 0.16rem;
				top: 0.5rem;
				color: #666;
				font-size: 0.2rem;
			}
		}
	}
</style>