<template>
	<div class="wrapper">
		<div class="title">
			<div class="title_back iconfont" @click="handleBackClick">&#xe604;</div>
			<div class="title_content">
				<div class="title_content_info">管理收货地址</div>
				<div class="title_content_more" @click="handleManageClick()" v-html="showFinish?'管理':'完成'"></div>
			</div>
		</div>
		<div class="address">
			<div class="address_title">我的收货地址</div>
			<div class="manageOption" v-if="!showFinish">
				<!-- <span class="selectAll iconfont" v-html="allChecked?'&#xe731;':'&#xe72f;'"
					@click="handleSelectAll()"></span>全选 -->
				<span class="delete" @click="handleDeleteClick()">删除</span>
			</div>
			<div class="address_content" v-for="item in itemList" :key="item.id">
				<!-- 单选按钮 -->
				<div class="address_content_select iconfont" v-if="!showFinish"
					v-html="item.check?'&#xe731;':'&#xe72f;'" @click="handleAddressSelect(item.id)"></div>
				<div class="address_content_main">
					<div class="address_content_main_title">
						<div class="nickname">{{item.real_name}}</div>
						<div class="phone">{{item.mobile}}</div>
					</div>
					<div class="address_content_main_info">
						{{item.city}}{{item.area}}{{item.house}}
					</div>
				</div>
				<div class="address_content_more iconfont" @click="handleSaveClick(item)">&#xe8a6;</div>
			</div>
		</div>
	</div>
	<div class="addressAdd" @click="handleAddClick">+添加收货地址</div>
</template>

<script>
	import {
		useRouter,
		useRoute
	} from 'vue-router';
	import request from '../../utils/request.js';
	import {
		ref,
		reactive
	} from "vue";

	const useAddressEffect = () => {
		const router = useRouter();
		const handleBackClick = () => {
			router.back()
		}
		const handleAddClick = () => {
			router.push({
				name: 'AddressAdd'
			})
			
		}
		//地址删除点击事件
		const handleDeleteClick = () => {
			// const router=useRouter()
			const addressListId = []
			// console.log(itemList)
			itemList.value.forEach(item => {
				//地址被选中
				if (item.check) {
					//选中的推进新的数组里面
					addressListId.push(item.id)
				}
			})
			// console.log(addressListId)
			//遍历新数组列表，删除选中的项
			addressListId.forEach(item => {
				// console.log(item)
				const result = request.post('/api/v1/delAddress/' + userInfo.id, {
					id: item
				})
			})
			console.log(itemList)
			router.push({name:'Empty'})
			
		}
		
		//加载页面的时候就请求获取地址的接口
		let userInfo = JSON.parse(localStorage.getItem('userinfo'));
		let itemList = ref([]);
		const handleListClick = async () => {
			const result = await request.get('/api/v1/address/' + userInfo.id);
			// console.log(result)
			if (result.msg == 'ok') {
				result.data.forEach(item => {
					item.check = false
				})
				itemList.value = result.data
			}
		}
		handleListClick()
		// console.log(itemList)
		const route = useRoute()
		const orderNo = route.params.order_no;
		const handleSaveClick = async (item) => {
			//如果从订单确认界面跳转过来
			if (orderNo) {
				//改变默认地址
				const handleSaveDefault = async () => {
					const result = await request.post('/api/v1/updateAddress/' + userInfo.id, {
						id: item.id,
						is_default: 1
					})
					console.log(2323,result)
					if (result.msg == 'ok') {
						console.log('更新成功')
					}
				}
				handleSaveDefault();
				router.back()
				//从其他页面跳转过来
			} else {
				//跳转到修改地址界面
				router.push({
					name: 'AddressSave',
					params: {
						address: JSON.stringify(item)
					}
				})
			}

			// console.log(item)
			// const result = await request.post('/api/v1/updateAddress/' + userInfo.id, {
			// 	id: item.id,
			// 	real_name: item.real_name,
			// 	mobile: item.mobile,
			// 	city: item.city,
			// 	area: item.area,
			// 	house: item.house
			// })
			// // console.log(result)
			// if (result.msg == 'ok') {
			// 	router.push({
			// 		name: 'Address'
			// 	})
			// }
		}
		//地址单选事件
		const handleAddressSelect = (id) => {
			// console.log(itemList.value)
			const addressList = ref([])
			itemList.value.forEach(item => {
				console.log(item)
				if (item.id == id) {
					item.check = !item.check
				}
			})
			// console.log(addressList)
			// return itemList
		}
		//全选
		// const result = {
		// 	allChecked: true
		// }
		// const handleSelectAll = () => {
		// 	let p = true
		// 	itemList.value.forEach(item => {
		// 		// console.log(item)
		// 		if (item.check == false) {
		// 			result.allChecked = false
		// 			p = false
		// 			console.log(allChecked)
		// 		}else{
		// 			return
		// 		}
		// 		if (p == true) {
		// 			result.allChecked = true
		// 		}
		// 	})
		// }
		// console.log(allChecked)
		// handleSelectAll()
		
		return {
			handleBackClick,
			handleAddClick,
			itemList,
			handleSaveClick,
			userInfo,
			handleDeleteClick,
			handleAddressSelect,
			// handleSelectAll,
			// result
		}
	}
	let showFinish = ref(true);
	const handleManageClick = () => {
		showFinish.value = !showFinish.value
		return {
			showFinish
		};
	}
	// methods:{
	//   const handleDeleteClick = () => {
	//   	const addressListId = []
	//   	itemList.value.forEach(item => {
	//   		if (item.check) {
	//   			addressListId.push(item.id)
	//   		}
	//   	})
	//   	// console.log(addressListId)
	//   	addressListId.forEach(item => {
	//   		// console.log(item)
	//   		const result = request.post('/api/v1/delAddress/' + userInfo.id, {
	//   			id: item
	//   		})
	//   	})
	//   	this.$forceupdate();
	//   }
	// }

	export default {
		setup() {
			const {
				handleBackClick,
				handleAddClick,
				itemList,
				handleSaveClick,
				userInfo,
				handleDeleteClick,
				handleAddressSelect,
				// handleSelectAll,

			} = useAddressEffect();
			return {
				handleBackClick,
				handleAddClick,
				itemList,
				handleSaveClick,
				handleManageClick,
				showFinish,
				userInfo,
				handleDeleteClick,
				handleAddressSelect,
				// handleSelectAll,

			}

		}
	}
</script>

<style lang="scss" scoped>
	@import "../../style/variables.scss";

	.wrapper {
		overflow-y: auto;
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0.5rem;
		right: 0;
		background: rgb(248, 248, 248);
	}

	.manageOption {
		position: absolute;
		transform: translateX(2.8rem) translateY(-.22rem);
	}

	.title {
		display: flex;
		padding: .18rem;
		line-height: 0.44rem;
		height: 0.44rem;
		background-color: #fff;

		&_back {
			width: 0.3rem;
			font-size: .24rem;
			color: #b6b6b6;
		}

		&_content {
			display: flex;
			flex: 1;
			color: #333;

			&_info {
				flex: 1;
				text-align: center;
				font-size: 0.16rem;
			}

			&_more {
				font-size: 0.14rem;
			}
		}
	}

	.address {
		padding: .18rem;

		&_title {
			height: 0.2rem;
			line-height: 0.2rem;
			margin-top: .16rem;
			font-size: 0.14rem;
			color: #333;
		}

		&_content {
			padding: .18rem .16rem;
			margin-top: .12rem;
			background-color: #fff;
			display: flex;

			&_main {
				width: 2.6rem;

				&_title {
					display: flex;
					color: #999;
					font-size: 0.14rem;
					height: 0.2rem;

					.nickname {
						width: 0.88rem;
					}

					.phone {
						flex: 1;
					}
				}

				&_info {
					margin-top: .08rem;
					height: 0.4rem;
					line-height: 0.4rem;
					font-size: .14rem;
					color: #333;
				}
			}

			&_select {
				flex: 1;
				// transform: rotate(180deg);
				line-height: 0.68rem;
				color: #999;
			}

			&_more {
				flex: 1;
				transform: rotate(180deg);
				line-height: 0.68rem;
				color: #999;
			}
		}
	}

	.addressAdd {
		position: fixed;
		bottom: .1rem;
		height: 0.3rem;
		line-height: 0.3rem;
		width: 2rem;
		color: white;
		text-align: center;
		// border: 1px solid #000;
		font-size: 0.15rem;
		background: linear-gradient(to right, #ff9410 0%, #ff7801 100%);
		border-radius: .3rem;
		left: 50%;
		right: 50%;
		transform: translateX(-50%);
	}
</style>
