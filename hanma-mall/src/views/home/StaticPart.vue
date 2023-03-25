<template>
	<div class="position">
		<span class="iconfont position__icon">&#xe602;</span>
		山东省济南市自贸区鲁商凤凰广场汉码未来
		<span class="iconfont position_notice">&#xe600;</span>
	</div>
	<!-- 搜索及banner -->
	<div class="search">
		<span class="iconfont" @click="Search">&#xe6e4;</span>
		<input class="search__text" type="text" placeholder="汉码商城会员优惠券">
		<!-- <span class="search__text">汉码商城会员优惠券</span> -->
	</div>
	<div class="banner">
		<img src="http://webapi.hanmaweilai.com/public/static/images/banner.jpg" class="banner__img">
	</div>
	<!-- nav -->
	<div class="icons">
		<div class="icons__item" v-for="item in iconsList" :key="item.desc">
			<img class="icons__item__img" :src="`http://webapi.hanmaweilai.com/public/static/images/${item.imgName}.png`" />
			<p class="icons__item__desc">{{item.desc}}</p>
		</div>
	</div>
	<div class="gap"></div>
</template>

<script>
	// import {reactive} from 'vue'
	// const useSearchEffect=()=>{
	// 	const data=reactive({
	// 		search:''
	// 	})
	// 	console.log(data.search)
	// 	const nearbyListData=[]
	// 	const Search=(nearbyList)=>{
	// 		var search=data.search;
	// 		console.log(search)
	// 		data.nearbyListData=nearbyList.filter(item=>{
	// 			console.log(item)
	// 			if(item.title.indexOf(search)!=-1){
	// 				return item;
	// 			}
	// 		}).slice(0,10)
	// 	}
	// 	return {data,Search}
	// }
	
	export default{
		name:'StaticPart',
		// props:['nearbyList'],
		setup(){
			const iconsList=[
				{imgName:"便利超市",desc:"便利超市"},
				{imgName:"生鲜蔬菜",desc:"生鲜蔬菜"},
				{imgName:"水果零食",desc:"水果零食"},
				{imgName:"鲜花绿植",desc:"鲜花绿植"},
				{imgName:"医药健康",desc:"医药健康"},
				{imgName:"家居",desc:"家居时尚"},
				{imgName:"蛋糕",desc:"烘焙蛋糕"},
				{imgName:"签到",desc:"签到"},
				{imgName:"品牌免运",desc:"品牌免运"},
				{imgName:"优惠",desc:"套餐红包"},
			]
			// const {Search}=useSearchEffect()
			return{iconsList}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/style/variables.scss';
	@import '@/style/mixins.scss';
	//地址区域
	.position {
		position: relative;
		padding: .16rem .24rem .16rem 0;
		line-height: .22rem;
		font-size: .16rem;
		//文字超出省略号
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	
		.position__icon {
			position: relative;
			top: .01rem;
			font-size: .2rem;
		}
	
		.position_notice {
			position: absolute;
			right: 0;
			top: .17rem;
			font-size: .2rem;
		}
	
		@include ellipsis;
		
		color:$content-fontcolor;
	}
	//nav
	.icons {
		display: flex;
		flex-wrap: wrap;
		margin-top: .16rem;
	
		&__item {
			width: 20%;
	
			&__img {
				display: block;
				widows: 0.4rem;
				height: 0.4rem;
				margin: 0 auto;
			}
	
			&__desc {
				margin: .06rem 0 .16rem 0;
				text-align: center;
				// color: $content-fontcolor;
				font-size: .12rem;
			}
		}
	}
	
	.gap {
		margin: 0 -.18rem;
		height: 0.05rem;
		background: $content-bgcolor;
	}
	
	//搜索
	.search {
		margin-bottom: .12rem;
		line-height: .32rem;
		background: $search-bgColor;
		color: $search-fontColor;
		border-radius: .16rem;
	
		.iconfont {
			display: inline-block;
			padding: 0 .08rem 0 .16rem;
			font-size: .16rem;
		}
	
		&__text {
			display: inline-block;
			font-size: .14rem;
			border: none;
			background-color: transparent;
		}
		&__text:focus{
			border-style: none;
			outline: none; 
		}
	}
	.banner {
		height: 0;
		overflow: hidden;
		padding-bottom: 25.4%;
	
		&__img {
			width: 100%;
		}
	}
</style>