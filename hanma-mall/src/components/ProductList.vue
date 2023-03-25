<template>
	<div class="products">
		<div class="products_title">{{shopName}}{{orderList.shop_name}}{{orderList.order_no}}</div>
		<div class="products_wrapper">
			<div class="products_list">
				<div class="products_item" v-for="item in orderList.products" :key="item.id">
					<img :src="item.img_url" alt="" class="products_item_img">

					<div class="products_item_detail">
						<h4 class="products_item_title">{{item.name}}</h4>
						<p class="products_item_price">
							<span>
								<span class="products_item_yen">
									&yen;
								</span>
								{{item.price}}X{{item.count}}
							</span>
							<span class="products_item_total">
								<span class="products_item_yen">&yen;</span>
								{{(item.price*item.count).toFixed(2)}}
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	<Order :totalPrice="totalPrice" />
</template>

<script>
	import {
		useRoute
	} from 'vue-router';
	import {
		useCommonCartEffect
	} from '../effect/Effect.js';
	import {
		reactive,
		toRefs
	} from 'vue';
	import request from '@/utils/request.js'
	import Order from './Order.vue'
	import {
		useStore
	} from 'vuex'
	const useMakeOrderEffect = (shopId, shopName, productList) => {
		//productId, shopName, productList从useCommonCartEffect()方法中获取
		const store = useStore()
		const userInfo = JSON.parse(localStorage.userinfo);
		const data = reactive({
			orderList: [],
			totalPrice: 0
		});
		//订单列表，设置到缓存中，从缓存中拿，清除购物车之后，刷新只能从缓存中拿订单数据
		const orderList = localStorage.getItem("orderList") != "" ? JSON.parse(localStorage.getItem(
			"orderList")) : "";
			//从订单界面跳转过来
		if (orderList != "") {
			// console.log(1)
			let totalPrice = 0;
			orderList.products.forEach(item => {
				totalPrice += item.price * item.count;
			})
			totalPrice = totalPrice.toFixed(2);
			return {
				orderList,
				totalPrice
			}
		} else {
			//缓存中订单为空才请求创建订单
			const data = reactive({
				orderList: [],
				totalPrice: 0
			});
			//1.创建订单
			const handleCreateOrder = async () => {
				const products = [];
				for (let i in productList.value) {
					const product = productList.value[i];//productList从store中拿
					if(product.check){
						products.push({
							id: parseInt(product.id, 10),
							num: product.count
						})
					}
					
				}
				
				const result = await request.post('/api/v1/create', {
					id: userInfo.id,//个人信息id
					addressId: 1,
					shopId,//路由中传入
					shopName: shopName.value,//从store中拿
					products: JSON.stringify(products)//从productList中获取
				})
				console.log(result)
				//请求成功
				if (result.msg == 'ok') {
					// const clearCartData = (shopId) => {
						//清楚购物车
						store.commit('clearCartData', {
							shopId
						})
					// };
					// clearCartData(shopId)
					// console.log(258)
					data.orderList = result.data;
					let totalPrice = 0;
					result.data.products.forEach(item => {
						totalPrice += item.price * item.count
					});
					data.totalPrice = totalPrice.toFixed(2)
					console.log(orderList)
					localStorage.setItem('orderList', JSON.stringify(data.orderList))
				}
			}
			handleCreateOrder();
			//转换成普通对象，普通对象上的每一个属性都是响应式的，这样用ES6解构赋值就不会出问题了
			const {
				orderList,
				totalPrice
			} = toRefs(data);
			return {
				totalPrice,
				orderList,
			}
		}
	}
	export default {
		name: 'ProductList',
		components: {
			Order
		},
		setup() {
			const route = useRoute();
			const shopId = route.params.id;
			const {
				shopName,
				productId,
				productList
			} = useCommonCartEffect(shopId);
			const {
				orderList,
				totalPrice
			} = useMakeOrderEffect(shopId, shopName, productList)
			return {
				shopName,
				orderList,
				totalPrice
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../style/mixins.scss';

	.products {
		margin: 0.16rem 0.18rem .1rem .18rem;
		// border: 1px solid #000;
		background: #fff;

		&_title {
			padding: .16rem;
			font-size: .16rem;
			color: #333;
			font-weight: bold;
		}

		&_wrapper {
			overflow-y: scroll;
			margin: 0 .18rem;
		}

		&_list {
			background: #fff;
			padding-bottom: .15rem;
		}

		&_more {
			margin-bottom: 0.15rem;
			height: 0.28rem;
			color: #7543e0;
			line-height: 0.28rem;
			font-size: .14rem;
			display: flex;
			justify-content: space-between;
			align-items: center;

			&_total {
				border: 1px solid #7543e0;
				flex: 1;
				text-align: center;
				padding: 0 .05rem;
			}

			&_check {
				text-align: center;
				background-color: #7543e0;
				color: #fff;
				padding: .01rem .05rem;

				a {
					color: #fff;
					text-decoration: none;
				}
			}
		}

		&_item {
			position: relative;
			display: flex;
			justify-content: space-between;
			padding-top: 0.1rem;

			&_img {
				width: 0.46rem;
				height: 0.46rem;
				margin-right: 0.16rem;
			}

			&_detail {
				flex: 1;
			}

			&_title {
				margin: 0;
				line-height: 0.2rem;
				font-size: .14rem;
				color: #333;
				@include ellipsis;
			}

			&_price {
				display: flex;
				margin: .06rem 0 0 0;
				line-height: 0.2rem;
				font-size: .14rem;
				color: #e93b3b;
			}

			&_total {
				flex: 1;
				text-align: right;
				color: #000;
			}

			&_yen {
				font-size: 0.12rem;
			}
		}
	}

	.order {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		height: 0.49rem;
		line-height: 0.49rem;
		background: #fff;

		&_price {
			flex: 1;
			text-indent: .24rem;
			font-size: .14rem;
			color: #333;
		}

		&_btn {
			width: 0.98rem;
			background: #7543e0;
			color: #fff;
			text-align: center;
			font-size: .14rem;
		}
	}
</style>
