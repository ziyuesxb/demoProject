<template>
	<!-- 主體内容 -->
	<div class="nearby">
		<h3 class="nearby__title">附近店鋪</h3>
		<!-- <ShopInfo v-for="item in nearbyList" :key="item._id" :item="item" /> -->
		<!-- 路由中带id跳转 -->
		<router-link :to="`/shop/${item.id}`" v-for="item in nearbyList" :key="item._id">
			<!-- 父传子 -->
			<ShopInfo :item="item" />
		</router-link>
		<!-- <div class="nearby__item" v-for="item in nearbyList" :key="item.id">
			<img :src="item.imgUrl" class="nearby__item__img">
			<div class="nearby__content">
				<div class="nearby__content__title">{{item.title}}</div>
				<div class="nearby__content__tags">
					<span class="nearby__content__tag" >月售:{{item.sales}}</span>
					<span class="nearby__content__tag" >起送:{{item.expressLimit}}</span>
					<span class="nearby__content__tag" >基础运费:{{item.expressPrice}}</span>
				</div>
				<p class="nearby__content__highlight">{{item.desc}}</p>
			</div>
		</div> -->
	</div>
</template>

<script>
	import {ref} from 'vue';
	import request from '../../utils/request.js';
	import ShopInfo from '../../components/ShopInfo.vue';
	//防止后面订单确认页面刷新产生空订单
	const orderList=[]
	localStorage.setItem('orderList',orderList)
	//附近店铺数据请求
	const useNearbyListEffect=()=>{
		const nearbyList=ref([]);
		const getNearbyList=async()=>{
			const result=await request.get('/api/v1/hotShops',{state:1})
			if(result.msg=="ok"){
				nearbyList.value=result.data
			}
		}
		return {nearbyList,getNearbyList}
	}
	export default {
		name: 'Nearby',
		components:{ShopInfo},
		setup() {
			const {nearbyList,getNearbyList}=useNearbyListEffect();
			getNearbyList()
			return {
				nearbyList
			};
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/style/variables.scss';

	//主体内容
	.nearby {
		&__title {
			margin: .16rem 0 .02rem 0;
			font-size: .18rem;
			font-weight: normal;
			color: $content-fontcolor;
		}
		a {
			text-decoration: none;
		}

		// &__item {
		// 	display: flex;
		// 	padding-top: .12rem;

		// 	&__img {
		// 		margin-right: .16rem;
		// 		width: .56rem;
		// 		height: .56rem;
		// 		margin-top: .1rem;
		// 	}
		// }

		// &__content {
		// 	flex: 1;
		// 	padding-bottom: .12rem;
		// 	border-bottom: 1px solid $content-bgcolor;

		// 	&__title {
		// 		line-height: .22rem;
		// 		font-size: .16rem;
		// 		color: $content-fontcolor;
		// 	}

		// 	&__tags {
		// 		margin-top: .08rem;
		// 		line-height: .18rem;
		// 		font-size: .13rem;
		// 		color: $content-fontcolor;
		// 	}

		// 	&__tag {
		// 		margin-right: .16rem;
		// 	}

		// 	&__highlight {
		// 		margin: .08rem 0 0 0;
		// 		line-height: .18rem;
		// 		font-size: .13rem;
		// 		color: #e93b3b;
		// 	}
		// }
	}
</style>
