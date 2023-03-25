<template>
	<!-- <Home /> -->
	<!-- <Login /> -->
	<router-view v-if="isRouterAlive" />
</template>


<script>
	// import Home from './views/home/Home.vue';
	// import Cart from './views/cart/Cart.vue';
	// import Order from './views/order/Order.vue';
	// import My from './views/my/My.vue';
	// import Login from './views/login/Login.vue';
	// import Register from './views/register/Register.vue'
	export default{
		name:'App',
		components:{
			// Home,
			// Cart,
			// Order,
			// My,
			// Login,
			// Register,
		},
		provide(){
			return {
				reload:this.reload
			}
		},
		data(){
			return{
				isRouterAlive:true
			}
		},
		methods:{
			reload(){
				this.isRouterAlive=false
				this.$nextTick(function(){
					this.isRouterAlive=true
				})
			}
		}
	}
</script>

<style lang="scss">
	//顶部地区
	
	
</style>
