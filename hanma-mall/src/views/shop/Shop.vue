<template>
	<div class="wrapper">
		<div class="search">
			<div class="search__back iconfont" @click="handleBackClick">&#xe604;</div>
			<div class="search__content">
				<span class="search__content__icon iconfont">&#xe6e4;</span>
				<input placeholder="请输入商品名称" class="search__content__input">
			</div>
		</div>
		<ShopInfo :item="item" :hideBorder="true" v-show="item.imgUrl" />
		<Content :shopName="item.title" />
		<Cart :shopName="item.title" />
	</div>
</template>

<script>
	import Cart from './Cart'
	import ShopInfo from '../../components/ShopInfo.vue'
	import {useRouter,useRoute} from 'vue-router';
	import request from '../../utils/request.js'
	import {reactive,toRefs} from 'vue';
	import Content from './Content';
	const useShopInfoEffect=()=>{
		const route=useRoute()
		const data=reactive({item:{}})
		const getItemData=async()=>{
			//通过id请求店铺详情页的店铺信息
			const result=await request.get(`/api/v1/shop/${route.params.id}`)
			if(result.msg=="ok"){
				data.item=result.data
			}
		}
		const{item}=toRefs(data)
		return{item,getItemData}
	}
	const useBackRouterEffect=()=>{
		const router=useRouter()
		const handleBackClick=()=>{
			router.back()
		}
		return handleBackClick
	}
	export default{
		name:"Shop",
		components:{ShopInfo,Content,Cart},
		setup(){
			const {item,getItemData}=useShopInfoEffect()
			const handleBackClick=useBackRouterEffect()
			getItemData()
			// const router=useRouter()
			// const item={
			// 	id:'1',
			// 	title:'沃尔玛',
			// 	imgUrl:'http://webapi.hanmaweilai.com/public/static/images/near.png',
			// 	sales:10000,
			// 	expressLimit:0,
			// 	expressPrice:5,
			// 	desc:'VIP尊享满89元减4元运费券'
			// }
			// const handleBackClick=()=>{
			// 	router.back()
			// }
			return{item,handleBackClick}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../style/variables.scss';
	.wrapper{
		padding: 0 .18rem;
	}
	.search{
		display: flex;
		margin: .14rem 0 .04rem 0;
		line-height: 0.32rem;
		&__back{
			width: 0.3rem;
			font-size: .24rem;
			color: #B6b6b6;
		}
		&__content{
			display: flex;
			flex: 1;
			background: $search-bgColor;
			border-radius: .16rem;
			&__icon{
				width: 0.44rem;
				text-align: center;
				color: $search-fontColor;
			}
			&__input{
				display: block;
				width: 100%;
				padding-right: .2rem;
				border: none;
				outline: none;
				background: none;
				height: 0.32rem;
				font-size: .14rem;
				color: #333;
				&::placeholder{
					color: #333;
				}
			}
		}
	}
</style>