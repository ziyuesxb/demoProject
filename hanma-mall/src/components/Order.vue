<template>
	<div class="order">
		<div class="order_price">
			实付金额<b>{{totalPrice}}</b>
		</div>
		<div class="order_btn" @click="handleShowConfirmChange(true)">
			提交订单
		</div>
	</div>
	<div class="mask" v-if="showConfirm">
		<div class="mask_content">
			<h3 class="mask_content_title">确认要离开收银台</h3>
			<p class="mask_content_desc">请尽快完成支付，否则将被取消</p>
			<div class="mask_content_btns">
				
				<div class="mask_content_btn mask_content_btn--first">
					<!-- <router-link> -->
						取消订单
					<!-- </router-link> -->
				</div>
				<div class="mask_content_btn mask_content_btn--last">
					确认支付
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		useStore
	} from 'vuex';
	import {ref} from 'vue';
	import {useRoute,useRouter} from "vue-router";
	import request from "../utils/request.js";
	import {useCommonCartEffect} from "../effect/Effect.js";
	const useMakeOrderEffect=(shopId,shopName,productList)=>{
		const router=useRouter();
		const store=useStore();
		const handleConfirmOrder=async(isCanceled)=>{
			const products=[];
			for(let i in productList.value){
				const product=productList.value[i]
				products.push({id:parseInt(product.id,10),num:product.count});
			}
			try{
				const result=await request.post('/api/v1/order',{
					addressId:1,
					shopId,
					shopName:shopName.value,
					isCanceled,
					products:JSON.stringify(products),
				})
				console.log("Order.vue:",result);
				if(result?.msg===0){
					store.commit("clearCartData",shopId);
					router.push({name:"OrderList"});
				}
			}catch(e){
				
			}
		};
		return {handleConfirmOrder}
	}
	const useShowMaskEffect=()=>{
		const showConfirm=ref(false);
		const handleShowConfirmChange=(status)=>{
			showConfirm.value=status;
		};
		return {showConfirm,handleShowConfirmChange};
	}
	// const toggleShowMaskEffect=()=>{
	// 	const showMask=ref(false)
	// 	const handleShowMaskChange = () => {
	// 		showMask.value = !showMask.value;
	// 	}
	// 	return {
	// 		showMask,
	// 		handleShowMaskChange
	// 	}
	// }
	export default {
		name:"Order",
		props: ['totalPrice','num'],
		setup(){
			const route=useRoute();
			const shopId=parseInt(route.params.id,10);
			const {calculations,shopName,productList}=useCommonCartEffect(shopId);
			const {handleConfirmOrder}=useMakeOrderEffect(shopId,shopName,productList);
			const {showConfirm,handleShowConfirmChange}=useShowMaskEffect();
			// const {showMask,handleShowMaskChange}=toggleShowMaskEffect()
			return {showConfirm,handleShowConfirmChange,calculations,handleConfirmOrder}
		}	
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: #eee;
		overflow-y: scroll;
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
	
	.mask {
		z-index: 1;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: rgba($color:#000000, $alpha:0.5);
	
		&_content {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 3rem;
			height: 1.56rem;
			background: #fff;
			text-align: center;
			border-radius: .04rem;
	
			&_title {
				margin: .24rem 0 0 0;
				line-height: 0.26rem;
				font-size: .18rem;
				color: #333;
			}
	
			&_desc {
				margin: .08rem 0 0 0;
				line-height: 0.14rem;
				color: #666;
			}
	
			&_btns {
				display: flex;
				margin: .24rem .58rem;
			}
	
			&_btn {
				flex: 1;
				width: 0.8rem;
				line-height: 0.32rem;
				border-radius: .16rem;
				font-size: .14rem;
	
				&--first {
					margin-right: .12rem;
					border: .01rem solid #4fb0f9;
					color: #4fb0f9;
				}
	
				&--last {
					margin-left: .12rem;
					background: #4fb0f9;
					color: #fff;
				}
			}
		}
	}
</style>
