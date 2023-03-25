<template>
	<div class="content">
		<div class="category">
			<div :class="{'category__item':true,'category__item--active':currentTab===item.tab}"
				v-for="item in categories" :key="item.name" @click="()=>handleCategoryClick(item.tab)">
				{{item.name}}
			</div>
		</div>
		<div class="product">
			<div class="product__item" v-for="item in contentList" :key="item.id">
				<img :src="item.img_url" class="product__item__img">
				<div class="product__item__detail">
					<h4 class="product__item__title">{{item.name}}</h4>
					<p class="product__item__sales">月售{{item.sales}}件</p>
					<p class="product__item__price">
						<span class="product__item__yen">&yen;</span>{{item.price}}
						<span class="product__item__origin">&yen;{{item.oldPrice}}</span>
					</p>
				</div>
				<!-- 购物车数据放到全局中进行处理，需要使用vuex处理购物车数据，首先在store中定义购物车数据 -->
				<!-- vuex是全局数据管理，存起来整个项目不用传来传去，避免路由切换数据不更新的问题 -->
				<!--  1.能够在vuex中集中管理共享的数据,易于开发和后期维护;
				// 2.能够高效地实现组件之间的数据共享,提高开发效率;
				// 3.存储在vuex的数据都是响应式的,能够实时保持数据与页面的同步; -->
				<div class="product__number">
					<!-- changeCartItemInfo中的参数最终同步传到store中的changeCartItemInfo方法中 -->
					<span class="product__number__minus"
						@click="()=>{changeCartItemInfo(shopId,shopName,item.id,item,-1)}">-</span>
					{{cartList?.[shopId]?.[item.id]?.count||0}}
					<span class="product__number__plus"
						@click="()=>{changeCartItemInfo(shopId,shopName,item.id,item,1)}">+</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		useStore
	} from 'vuex'
	import {
		reactive,
		toRefs,
		ref,
		watchEffect
	} from 'vue';
	import {
		useRoute
	} from 'vue-router';
	import request from '../../utils/request.js';
	import {useCommonCartEffect} from '../../effect/Effect.js'
	const categories = [{
			name: '全部商品',
			tab: 'all'
		},
		{
			name: '新鲜水果',
			tab: 'fruit'
		},
		{
			name: '休闲食品',
			tab: 'food'
		},
		{
			name: '时令蔬菜',
			tab: 'greens'
		},
		{
			name: '肉蛋家禽',
			tab: 'meat'
		},
	];
	// const useCartEffect = () => {
	// 	const store = useStore()
	// 	const {
	// 		cartList
	// 	} = toRefs(store.state)
	// 	const addItemToCart = (shopId, productId, productInfo) => {
	// 		console.log(shopId, productId, productInfo)
	// 		store.commit('addItemToCart', {
	// 			shopId,
	// 			productId,
	// 			productInfo
	// 		})
	// 	}
	// 	const changeCartItemInfo = (shopId, productId, productInfo, num) => {
	// 		store.commit('changeCartItemInfo', {
	// 			shopId,
	// 			productId,
	// 			productInfo,
	// 			num
	// 		})
	// 	}
	// 	return {
	// 		cartList,
	// 		changeCartItemInfo,
	// 		addItemToCart
	// 	}
	// }
	//左侧tab栏点击
	const useTabEffect = () => {
	//默认第一个tab
		const currentTab = ref(categories[0].tab);
	//点击的tab等于当前项的tab
		const handleCategoryClick = (tab) => {
			currentTab.value = tab
		}
		return {
			currentTab,
			handleCategoryClick
		};
	}
	//请求分类商品
	const useCurrentListEffect = (currentTab) => {
		const route = useRoute()
		const shopId = route.params.id;
		const data = reactive({
			contentList: []
		})
		//请求分类商品
		const getContentData = async () => {
			const result = await request.get(`/api/v1/product/${shopId}`, {
				tab: currentTab.value
			})
			if (result.msg == "ok") {
				console.log(result)
				data.contentList = result.data
			}
		}
		//监听currentTab.value的改变
		watchEffect(() => {
			getContentData()
		})
		const {
			contentList
		} = toRefs(data)
		return {
			contentList
		}
	}
	export default {
		name: 'Content',
		//接受父元素传参
		props:['shopName'],
		setup() {
			const route = useRoute()
			const shopId = route.params.id
			const {
				currentTab,
				handleCategoryClick
			} = useTabEffect()
			const {
				contentList
			} = useCurrentListEffect(currentTab)
			const {
				cartList,
				changeCartItemInfo
			} = useCommonCartEffect()
			// const data=reactive({
			// 	currentTab:categories[0].tab,
			// 	contentList:[]
			// })
			// const handleCategoryClick=(tab)=>{
			// 	data.currentTab=tab
			// 	getContentData(tab)
			// }
			// const route=useRoute()
			// const getContentData=async(tab)=>{
			// 	const result=await request.get(`/api/v1/product/${route.params.id}`,{tab:tab})
			// 	if(result.msg=="ok"){
			// 		data.contentList=result.data
			// 	}
			// }
			// getContentData('all')
			// const {currentTab,contentList}=toRefs(data)
			return {
				categories,
				currentTab,
				handleCategoryClick,
				contentList,
				cartList,
				shopId,
				// addItemToCart,
				changeCartItemInfo
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../style/variables.scss';
	@import '../../style/mixins.scss';

	.content {
		display: flex;
		position: absolute;
		left: 0;
		right: 0;
		top: 1.5rem;
		bottom: .5rem;
	}

	.category {
		overflow-y: scroll;
		height: 100%;
		width: 0.76rem;
		background: $search-bgColor;

		&__item {
			line-height: .4rem;
			text-align: center;
			font-size: 14px;
			color: #333;

			&--active {
				background: $bgColor;
			}
		}
	}

	.product {
		overflow-y: scroll;
		flex: 1;

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
				width: .68rem;
				height: .68rem;
				margin-right: .16rem;
			}

			&__title {
				margin: 0;
				line-height: .2rem;
				font-size: .14rem;
				color: $content-fontcolor;
				@include ellipsis;
			}

			&__sales {
				margin: .06rem 0;
				font-size: .12rem;
				color: $content-fontcolor;
			}

			&__price {
				margin: 0;
				line-height: .2rem;
				font-size: .14rem;
				color: $hightlight-fontColor;
			}

			&__yen {
				font-size: .12rem;
			}

			&__origin {
				margin-left: .06rem;
				line-height: .2rem;
				font-size: .12rem;
				color: $light-fontColor;
				text-decoration: line-through;
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
