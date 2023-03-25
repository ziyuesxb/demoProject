<template>
	<div class="wrapper">
		<div class="title">我的全部购物车({{total}})</div>
		<div class="products" v-for="(item,index) in cart" :key="index">
			<template v-if="item.count>0">
				<div class="products_title">{{item.shopName}}</div>
				<div class="products_wrapper">
					<div class="products_list" v-for="item in item.info" :key="item.id">
						<div class="products_item">
							<img :src="item.img_url" alt="" class="products_item_img">
							<div class="products_item_detail">
								<h4 class="products_item_title">{{item.name}}</h4>
								<p class="products_item_price">
									<span>
										<span class="products_item_yen">&yen;</span>
										{{item.price}}x{{item.count}}
									</span>
									<span class="products_item_total">
										<span class="products_item_yen">&yen;</span>
										{{item.itemPrice}}
									</span>
								</p>
							</div>
						</div>
					</div>
					<div class="products_more">
						<p class="products_more_total">共计{{item.count}}件/{{item.amount}}元</p>
						<p class="products_more_check">
							<router-link :to="{path:`/orderConfirm/${item.shopId}`}">
								去结算
							</router-link>
						</p>
					</div>
				</div>
			</template>
		</div>
	</div>
	<Docker :currentIndex="1" />
</template>

<script>
	import Docker from '../home/Docker.vue'
	import {
		useStore
	} from 'vuex';
	const useCartEffect = () => {
		const store = useStore();
		//从store中的state中获取数据，取数量大于0且被选中的
		const cartList = store.state.cartList;
		console.log(cartList)
		const result = {
			total: 0,
			cart: []
		};
		//不同的店铺
		for (const i in cartList) {
			//购物车中用到的数据
			let temp = {
				shopId: 0,
				shopName: "",
				info: [],
				count: 0,
				amount: 0
			};
			let amount = 0;
			//不同的商品
			for (const j in cartList[i]) {
				let itemPrice = 0;
				//
				if (cartList[i][j] instanceof Object) {
					
					itemPrice = cartList[i][j].price * cartList[i][j].count;
					//总价
					cartList[i][j].itemPrice = itemPrice.toFixed(2);
					//数量大于0，且被选中
					if (cartList[i][j].count > 0) {
						if(cartList[i][j].check){
							temp.info.push(cartList[i][j]);
							temp.count += cartList[i][j].count;
							amount += cartList[i][j].price * cartList[i][j].count;
							temp.amount = amount.toFixed(2);
						}
						
					}
				} else {
					temp.shopName = cartList[i][j];
				}
				temp.shopId = i;
			}
			result.cart.push(temp);
			//显示店铺数量，购物车数量大于0的才显示
			var cartI = result.cart.filter((item) => item.amount > 0);
			result.total = cartI.length;
		}
		return result;
	}
	export default {
		name: 'CartList',
		components: {
			Docker
		},
		setup() {
			const {
				total,
				cart
			} = useCartEffect()
			return {
				total,
				cart
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/style/mixins.scss";

	.wrapper {
		overflow-y: auto;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0.5rem;
		background: rgb(248, 248, 248);
	}

	.title {
		line-height: .44rem;
		background: #fff;
		font-size: .16rem;
		color: #333;
		text-align: center;
	}

	.products {
		margin: .16rem 0.18rem .1rem .18rem;
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
			padding-bottom: 0.15rem;
		}

		&_more {
			margin-bottom: .15rem;
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

			&_img {
				width: 0.46rem;
				height: 0.46rem;
				margin-right: .16rem;
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
				color: #999;
			}

			&_total {
				flex: 1;
				text-align: right;
				color: #000;
			}

			&_yen {
				font-size: .12rem;
			}
		}
	}
</style>
