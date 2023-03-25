<template>
	<div class="wrapper">
		<div class="title">
			<div class="title_back iconfont" @click="handleBackClick">&#xe671;</div>
			<div class="title_content">
				<div class="title_content_info">编辑收货地址</div>
				<div class="title_content_more" @click="handleSaveClick">保存</div>
			</div>
		</div>
		<div class="address">
			<div class="address_item">
				<div class="address_item_title">
					所在城市：
				</div>
				<input type="text" placeholder="如山东省" v-model="city">
			</div>
			<div class="address_item">
				<div class="address_item_title">小区/大厦/学校：</div>
				<input type="text" placeholder="如鲁商凤凰广场汉码未来" v-model="area" />
			</div>
			<div class="address_item">
				<div class="address_item_title">楼号-门牌号：</div>
				<input type="text" placeholder="1号楼601" v-model="house" />
			</div>
			<div class="address_item">
				<div class="address_item_title">收货人：</div>
				<input type="text" placeholder="请填写收货人姓名" v-model="real_name" />
			</div>
			<div class="address_item">
				<div class="address_item_title">联系电话：</div>
				<input type="text" placeholder="请填写收货人手机号" v-model="mobile" />
			</div>
		</div>
	</div>
</template>

<script>
	import {reactive,toRefs} from "vue";
	import {useRouter,useRoute} from 'vue-router'
	import request from '../../utils/request.js'
	const useAddressEffect=()=>{
		const router=useRouter()
		const handleBackClick=()=>{
			router.back()
		}
		let route=useRoute();
		let address=JSON.parse(route.params.address);
		// console.log(address)
		let userInfo=JSON.parse(localStorage.getItem('userinfo'))
		if(address.user_id !=userInfo.id){
			return;
		}
		let data=reactive({
			real_name:address.real_name,
			mobile:address.mobile,
			city:address.city,
			area:address.area,
			house:address.house
		})
		const handleSaveClick=async()=>{
			const result=await request.post('/api/v1/updateAddress/'+userInfo.id,{
				id:address.id,
				real_name:data.real_name,
				mobile:data.mobile,
				city:data.city,
				area:data.area,
				house:data.house
			})
			console.log(result)
			if(result.msg=='ok'){
				router.push({name:'Address'})
			}
		}
		const {real_name,mobile,city,area,house}=toRefs(data)
		return {real_name,mobile,city,area,house,handleBackClick,handleSaveClick}
	}
	export default{
		setup(){
			const {real_name,mobile,city,area,house,handleBackClick,handleSaveClick}=useAddressEffect()
			return {real_name,mobile,city,area,house,handleBackClick,handleSaveClick}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../style/variables.scss';
	.wrapper{
		overflow-y: auto;
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0.5rem;
		right: 0;
		background: rgb(248, 248, 248);
	}
	.title{
		display: flex;
		padding: .18rem;
		line-height: 0.44rem;
		height: 0.44rem;
		background-color: #fff;
		&_back{
			width: 0.3rem;
			font-size: 0.24rem;
			color: #b6b6b6;
		}
		&_content{
			display: flex;
			flex: 1;
			color: #333;
			&_info{
				flex: 1;
				text-align: center;
				font-size: 0.16rem;
			}
			&_more{
				font-size: 0.14rem;
			}
		}
	}
	.address{
		padding: 0 .18rem;
		background-color: #fff;
		margin-top: 0.12rem;
		&_item{
			padding: .18rem .12rem;
			height: 0.2rem;
			font-size: 0.14rem;
			display: flex;
			border-bottom: 1px solid #f1f1f1;
			&_title{
				color: #666;
				line-height: 0.2rem;
				height: 0.2rem;
			}
			input{
				color: #999;
				border: 0 solid #3a91f3;
				::placeholder{
					color: #999;
				}
			}
		}
	}
</style>