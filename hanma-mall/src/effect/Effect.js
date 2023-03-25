import {
	useStore
} from 'vuex'
import {
	computed
} from 'vue'
export const useCommonCartEffect = (shopId) => {
	const store = useStore()
	// const {cartList}=toRefs(store.state)
	const cartList = store.state.cartList;
	const shopName=computed(()=>{
		const shopName=cartList[shopId]?.shopName||''
		return shopName
	})
	const productList = computed(() => {
	//从state中获取数据
		const productList = cartList[shopId] || {}
		const notEmptyProductList = {};
		for (let i in productList) {
			const product = productList[i];
			//排除shopName的干扰
			if (productList[i] instanceof Object) {
				if (product.count > 0) {
					notEmptyProductList[i] = product
				}
			}
		}
		return notEmptyProductList
	})
	//购物车中商品数量，总价，全选的显示
	const calculations = computed(() => {
		const productList = cartList[shopId]
		const result = {
			total: 0,
			price: 0,
			allChecked: true
		}
		if (productList) {
			for (let i in productList) {
				if (productList[i] instanceof Object) {
					const product = productList[i]
					result.total += product.count
					if (product.check) {
						result.price += (product.count * product.price)
					}
					if (product.count > 0 && !product.check) {
						result.allChecked = false
					}
				}
			}
		}
		result.price = result.price.toFixed(2)
		return result
	})
	//参数传给store里面的changeCartItemInfo
	const changeCartItemInfo = (shopId, shopName, productId, productInfo, num) => {
		//同步操作，数据提交至 mutations
		store.commit('changeCartItemInfo', {
			shopId,
			shopName,
			productId,
			productInfo,
			num
		})
	}
	return {
		cartList,
		changeCartItemInfo,
		productList,
		calculations,
		shopName
	}
}
