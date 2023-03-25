import {
	createStore
} from "vuex";
const setLocalCartList = (state) => {
	const {
		cartList
	} = state
	const cartListString = JSON.stringify(cartList)
	localStorage.setItem("cartList", cartListString)
}
const getLocalCartList = () => {
	return JSON.parse(localStorage.getItem("cartList")) || {}
}

export default createStore({
	state: {
		cartList: getLocalCartList()
	},
	getters: {},
	mutations: {
		// addItemToCart(state,payload){
		//  const{shopId,productId,productInfo}=payload;
		//  let shopInfo=state.cartList[shopId]
		//  if(!shopInfo){shopInfo={}}
		//  let product=shopInfo[productId]
		//  if(!product){
		//   product=productInfo
		//   product.count=0
		//  }
		//  product.count+=1
		//  shopInfo[productId]=product
		//  state.cartList[shopId]=shopInfo
		// },
		//商品加减点击事件，创建对应店铺下购物车商品信息列表
		changeCartItemInfo(state, payload) {
			// console.log(payload)
			const {
				shopId,
				shopName,
				productId,
				productInfo,
				num
			} = payload;
			//state中的数据结构类似下面这样
			//cartList:{shopId: {productId: {id: 1, name: "苹果", sales: 100, price: "10.00", oldPrice: "20.00",…,count:2}, shopName: "汉码未来"}}
			let shopInfo = state.cartList[shopId]
			// if(!shopInfo){shopInfo={}}
			//对应店铺下的shopInfo如果不存在，可以先放一个shopName
			if (!shopInfo) {
				shopInfo = {
					shopName: shopName
				}
			}
			
			let product = shopInfo[productId]
			//对应productId下的product如果不存在，就让他等于传过来的productInfo
			if (!product) {
				product = productInfo
				product.count = 0
			}
			//产品数量加减1
			product.count = product.count + payload.num;
			//产品数量小于0，产品数量等于0
			product.count <= 0 && (product.count = 0);
			//点击加1，商品选中状态为true
			if (payload.num > 0) {
				product.check = true
			}
			//给state中的数据赋值改变后的数据
			shopInfo[productId] = product
			state.cartList[shopId] = shopInfo
			//设置到缓存中
			setLocalCartList(state)
		},
		//选中与反选
		changeCartItemChecked(state, payload) {
			const {
				shopId,
				productId
			} = payload
			const product = state.cartList[shopId][productId]
			product.check = !product.check
			setLocalCartList(state)
		},
		//清空购物车
		cleanCartProducts(state, payload) {
			const {
				shopId
			} = payload
			state.cartList[shopId] = {}
			//删除shopInfo
			delete state.cartList[shopId]
			setLocalCartList(state)
		},
		
		clearCartData(state, payload) {
			const {
				shopId
			} = payload
			state.cartList[shopId]={}
			delete state.cartList[shopId]
			setLocalCartList(state)
		},
		//全选点击事件，如果有没选中的，则让他选中
		setCartItemsChecked(state, payload) {
			const {
				shopId
			} = payload
			const products = state.cartList[shopId]
			if (products) {
				for (let key in products) {
					// console.log(products)
					const product = products[key]
					product.check = true
				}
			}
			setLocalCartList(state)
		}
	},
	actions: {},
	modules: {},
});
