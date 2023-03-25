<template>
	<div class="wrapper">
		<TopArea />
		<ProductList />
	</div>
</template>

<script>
	import TopArea from "../../components/TopArea.vue"
	import ProductList from "../../components/ProductList.vue"
	import Order from '../../components/Order.vue'
	import {useRouter} from 'vue-router'
	const useBackRouterEffect=()=>{
		const router=useRouter()
		const handleBackClick=()=>{
			// console.log(1)
			router.back()
		}
		return handleBackClick
	}
	export default{
		name:'orderConfirm',
		components:{ProductList,Order,TopArea},
		setup(){
			const handleBackClick=useBackRouterEffect()
			return {handleBackClick}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../style/mixins.scss';

	.wrapper {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: #eee;
		overflow-y: scroll;
	}
	
</style>
