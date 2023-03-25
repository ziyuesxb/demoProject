<template>
	<div class="wrapper">
		<div class="title">我的订单</div>
		<div class="orders">
			<div class="order" v-for="(item,index) in list" :key="index">
				<div class="order_title">
					{{item.shop_name}}
					<span class="order_status" v-if="item.order_status=='未支付'" @click="handleOrderClick(item)">{{item.order_status}}</span>
					<span class="order_status" v-else>{{item.order_status}}</span>
				</div>
				<div class="order_content">
					<div class="order_content_imgs">
						<span v-for="(innerItem,innerIndex) in item.products" :key="innerIndex">
							<img v-if="innerIndex<=3" :src="innerItem.img_url" alt="" class="order_content_img">
						</span>
					</div>
					<div class="order_content_info">
						<div class="order_content_price">￥{{item.totalPrice}}</div>
						<div class="order_content_count">共{{item.totalCount}}件</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<Docker :currentIndex='2' />
</template>

<script>
	import Docker from "../home/Docker.vue"
	import {useRouter} from 'vue-router'
	import {ref} from 'vue'
	import request from '../../utils/request.js'
	const useOrderListEffect=()=>{
		const router=useRouter()
		const userInfo=JSON.parse(localStorage.userinfo);
		const list=ref([]);
		//请求用户所有订单
		const getOrderList=async()=>{
			const result =await request.get('api/v1/orders/'+userInfo.id);
			console.log(result)
			if(result?.msg=='ok'&&result?.data?.length){
				const orderList=result.data;
				orderList.forEach(order=>{
					order.products=JSON.parse(order.products);
					//forEach遍历可以修改原数组内容
					let totalPrice=0,totalCount=0;
					order.products.forEach(item=>{
						totalPrice+=item.price*item.count;
						totalCount+=item.count
					})
					order.totalPrice=totalPrice.toFixed(2);
					order.totalCount=totalCount;
				});
				list.value=orderList;
			}
		}
		getOrderList();
		//点击订单，设置订单缓存，携带参数shopId跳转到订单确认界面
		const handleOrderClick=item=>{
			//设置商品缓存
			localStorage.setItem('orderList',JSON.stringify(item));
			router.push({name:'OrderConfirm',params:{id:item.shop_id}})
		}
		return {list,handleOrderClick}
	}
	export default{
		name:"OrderList",
		components:{Docker},
		setup(){
			const {list,handleOrderClick}=useOrderListEffect();
			return {list,handleOrderClick}
		}
	}
</script>

<style lang="scss" scoped>
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
		line-height: 0.44rem;
		background: #fff;
		font-size: .16rem;
		color: #333;
		text-align: center;
	}
	.order{
		margin: .16rem .18rem;
		padding: .16rem;
		background: #fff;
		&_title{
			margin-bottom: 0.16rem;
			line-height: 0.22rem;
			font-size: .16rem;
			color: #333;
		}
		&_status{
			float: right;
			font-size: .14rem;
			color: #999;
			a{
				color: red;
				text-decoration: none;
			}
		}
		&_content{
			display: flex;
			&_imgs{
				flex: 1;
			}
			&_img{
				width: 0.4rem;
				height: 0.4rem;
				margin-right: 0.12rem;
			}
			&_info{
				width: 0.7rem;
			}
			&_price{
				margin-bottom: .04rem;
				line-height: 0.2rem;
				font-size: .14rem;
				color: #e93b3b;
				text-align: right;
			}
			&_count{
				line-height: 0.14rem;
				font-size: .12rem;
				color: #333;
				text-align: right;
			}
		}
	}
</style>