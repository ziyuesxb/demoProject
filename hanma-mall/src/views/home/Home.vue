<template>
	<div>
		<!-- 顶部地区 -->
		<div class="wrapper">
			<StaticPart  />
			<nearby />
		</div>
		<Docker :currentIndex="0"/>
	</div>
</template>

<script>
	import StaticPart from './StaticPart.vue'
	import Nearby from './Nearby.vue'
	import Docker from './Docker.vue'
	import {ref} from 'vue';
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
		name: 'Home',
		components:{
			StaticPart,
			Nearby,
			Docker
		},
		setup(){
			const {nearbyList,getNearbyList}=useNearbyListEffect()
			return {nearbyList,getNearbyList}
		}
		
	}
</script>

<style scoped>
	.wrapper {
		overflow-y: auto;
		position: absolute;
		left: 0;
		top: 0;
		bottom: .5rem;
		right: 0;
		padding: 0 .18rem;
	}
</style>
