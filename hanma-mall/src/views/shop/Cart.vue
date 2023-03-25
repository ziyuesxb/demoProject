<template>
	<div>
		<div class="mask" @click="handleCartShowChange" v-if="showCart&&calculations.total>0" />

		<div class="cart">

			<div class="product" v-if="showCart&&calculations.total>0">
				<div class="product__header">
					<div class="product__header__all" @click="()=>setCartItemsChecked(shopId)">
						<span class="product__header__icon iconfont"
							v-html="calculations.allChecked?'&#xe731;':'&#xe72f;'"></span>全选
					</div>
					<div class="product__header__clear">
						<span class="product__header__clear__btn" @click="()=>{handleCartShowChange();return cleanCartProducts(shopId)}">
							清空购物车
						</span>
					</div>
				</div>
				<template v-for="item in productList" :key="item.id">
					<!-- 数量大于0才显示 -->
					<div class="product__item" v-if="item.count > 0">
						<div class="product__item__checked iconfont" v-html="item.check?'&#xe731;':'&#xe72f;'"
							@click="()=>changeCartItemChecked(shopId,item.id)"></div>
						<img :src="item.img_url" class="product__item__img" />
						<div class="product__item__detail">
							<h4 class="product__item__title">{{item.name}}</h4>
							<p class="product__item__price">
								<span class="product__item__yen">&yen;</span>{{item.price}}
								<span class="product__item__origin">&yen;{{item.oldPrice}}</span>
							</p>
						</div>
						<div class="product__number">
							<span class="product__number__minus"
								@click="()=>{changeCartItemInfo(shopId,shopName,item.id,item,-1)}">
								-
							</span>
							{{item.count||0}}
							<span class="product__number__plus"
								@click="()=>{changeCartItemInfo(shopId,shopName,item.id,item,1)}">+</span>
						</div>
					</div>
				</template>
			</div>
			<div class="check">
				<div class="check__icon">
					<img src="http://webapi.hanmaweilai.com/public/static/images/basket.png" class="check__icon__img"
						@click="handleCartShowChange" />
					<div class="check__icon__tag">{{calculations.total}}</div>
				</div>
				<div class="check__info">
					总计:<span class="check__info__price">&yen;{{calculations.price}}</span>
				</div>
				<router-link :to="`/orderConfirm/${shopId}`">
					<div class="check__btn" v-if="calculations.total>0">去结算</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		computed,
		ref
	} from 'vue'
	import {
		useStore
	} from 'vuex'
	import {
		useRoute
	} from 'vue-router'
	import {
		useCommonCartEffect
	} from '../../effect/Effect.js'
	const useCartEffect = (shopId) => {
		const store = useStore()
		const route = useRoute()
		// const shopId=route.params.id
		const cartList = store.state.cartList
		//选中与反选
		const changeCartItemChecked = (shopId, productId) => {
			store.commit('changeCartItemChecked', {
				shopId,
				productId
			})
		}
		
		const {
			changeCartItemInfo,productList,calculations
		} = useCommonCartEffect(shopId);
		//清空购物车
		const cleanCartProducts = (shopId) => {
			store.commit('cleanCartProducts', {
				shopId
			})
		};
		//选中状态改变
		const setCartItemsChecked = (shopId) => {
			store.commit('setCartItemsChecked', {
				shopId
			})
		}
		return {
			// total,
			// price,
			productList,
			calculations,
			changeCartItemInfo,
			changeCartItemChecked,
			cleanCartProducts,
			// allChecked,
			setCartItemsChecked
		}
	}
	//显示与不显示购物车
	const toggleCartEffect = () => {
		const showCart = ref(false)
		const handleCartShowChange = () => {
			showCart.value = !showCart.value;
		}
		return {
			showCart,
			handleCartShowChange
		}
	}
	export default {
		name: 'Cart',
		props:['shopName'],
		setup() {
			const route = useRoute()
			const shopId = route.params.id
			const {
				showCart,
				handleCartShowChange
			} = toggleCartEffect()
			const {
				total,
				price,
				productList,
				calculations,
				changeCartItemChecked,
				changeCartItemInfo,
				cleanCartProducts,
				allChecked,
				setCartItemsChecked
			} = useCartEffect(shopId)
			// const{total,price}=useCartEffect()
			return {
				total,
				price,
				shopId,
				productList,
				calculations,
				changeCartItemChecked,
				changeCartItemInfo,
				cleanCartProducts,
				allChecked,
				setCartItemsChecked,
				showCart,
				handleCartShowChange
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../style/variables.scss';
	@import '../../style/mixins.scss';

	.cart {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		background: $bgColor;
		z-index: 11;
	}
	.mask{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		background: rgba(0, 0, 0, .5);
		z-index: 1;
	}

	.check {
		display: flex;
		height: 0.49rem;
		border-top: .01rem solid $content-bgcolor;
		line-height: 0.49rem;

		&__icon {
			position: relative;
			width: 0.84rem;

			&__img {
				display: block;
				margin: .12rem auto;
				width: 0.28rem;
				height: 0.26rem;
			}

			&__tag {
				position: absolute;
				left: .46rem;
				top: .04rem;
				padding: 0 .04rem;
				min-width: .2rem;
				height: 0.2rem;
				line-height: 0.2rem;
				background-color: $hightlight-fontColor;
				border-radius: .1rem;
				font-size: .12rem;
				text-align: center;
				color: #fff;
				transform: scale(.5);
				transform-origin: left center;
			}
		}

		&__info {
			flex: 1;
			color: $content-fontcolor;
			font-size: .12rem;

			&__pricec {
				line-height: 0.49rem;
				color: $hightlight-fontColor;
				font-size: .18rem;
			}
		}

		&__btn {
			width: 0.98rem;
			background-color: #7543e0;
			text-align: center;
			color: #fff;
			font-size: .14rem;
		}
	}

	.product {
		overflow-y: scroll;
		flex: 1;
		background: $bgColor;

		&__header {
			display: flex;
			line-height: 0.52rem;
			border-bottom: 1px solid $content-bgcolor;
			font-size: .14rem;
			color: $content-fontcolor;

			&__all {
				width: 0.64rem;
				margin-left: .18rem;
			}

			&__icon {
				display: inline-block;
				margin-right: .1rem;
				vertical-align: top;
				color: $btn-bgColor;
				font-size: .2rem;
			}

			&__clear {
				flex: 1;
				margin-right: .16rem;
				text-align: right;

				&__btn {
					display: inline-block;
				}
			}
		}

		&__item {
			position: relative;
			display: flex;
			padding: .12rem 0;
			margin: 0 .16rem;
			border-bottom: .01rem solid $content-bgcolor;

			&__detail {
				overflow: hidden;
			}

			&__img {
				width: .46rem;
				height: 0.46rem;
				margin-right: .16rem;
			}

			&__title {
				margin: 0;
				line-height: 0.2rem;
				font-size: .14rem;
				color: $content-fontcolor;
				@include ellipsis;
			}

			&__price {
				margin: .06rem 0 0 0;
				line-height: .2rem;
				font-size: .14rem;
				color: $hightlight-fontColor;
			}

			&__yen {
				font-size: .12rem;
			}

			&__origin {
				margin-left: .06rem;
				line-height: 0.2rem;
				font-size: .12rem;
				color: $light-fontColor;
			}

			&__checked {
				line-height: 0.5rem;
				margin-right: .2rem;
				color: #7543e0;
				font-size: .2rem;
			}

			.product__number {
				position: absolute;
				right: 0;
				bottom: .12rem;

				&__minus,
				&__plus {
					display: inline-block;
					width: 0.2rem;
					height: 0.2rem;
					line-height: 0.16rem;
					border-radius: 50%;
					font-size: .2rem;
					text-align: center;
				}

				&__minus {
					border: .01rem solid $medium-fontColor;
					color: $medium-fontColor;
					margin-right: .05rem;
				}

				&__plus {
					background: $btn-bgColor;
					color: $bgColor;
					margin-left: .05rem;
				}
			}
		}
	}
</style>
