import {
	createRouter,
	createWebHashHistory
} from "vue-router";

const routes = [{
	path: "/",
	name: "Home",
	component: () => import( /*webpackChunkName:"home" */ '../views/home/Home.vue')
}, {
	path: "/CartList",
	name: "CartList",
	component: () => import( /*webpackChunkName:"cartList" */ '../views/cartList/CartList.vue')
}, {
	path: "/OrderList",
	name: "OrderList",
	component: () => import( /*webpackChunkName:"orderList" */ '../views/orderList/OrderList.vue')
}, {
	path: "/My",
	name: "My",
	component: () => import( /*webpackChunkName:"my" */ '../views/my/My.vue')
}, {
	path: "/Login",
	name: 'Login',
	component: () => import( /*webpackChunkName:"login" */ '../views/login/Login.vue'),
	beforeEnter(to, from, next) {
		const {
			isLogin
		} = localStorage;
		isLogin ? next({
			name: "Home"
		}) : next();
	}
}, {
	path: "/Register",
	name: 'Register',
	component: () => import( /*webpackChunkName:"register" */ '../views/register/Register.vue'),
	beforeEnter(to, from, next) {
		const {
			isLogin
		} = localStorage;
		isLogin ? next({
			name: "Home"
		}) : next();
	}
}, {
	path: "/shop/:id",
	name: 'Shop',
	component: () => import( /*webpackChunkName:"shop" */ '../views/shop/Shop.vue'),
},{
	path:'/orderConfirm/:id',
	name:'OrderConfirm',
	component:()=>import(/* webpackChunkName: "orderConfirmation" */ '../views/orderConfirm/OrderConfirm')
},{
	path:'/edit',
	name:'Edit',
	component:()=>import(/* webpackChunkName: "edit" */ '../views/my/Edit')
},{
	path:'/address',
	name:'Address',
	component:()=>import(/* webpackChunkName: "address" */ '../views/address/Address')
},{
	path:'/addressAdd',
	name:'AddressAdd',
	component:()=>import(/* webpackChunkName: "addressAdd" */ '../views/address/AddressAdd')
},{
	path:'/addressSave',
	name:'AddressSave',
	component:()=>import(/* webpackChunkName: "addressSave" */ '../views/address/AddressSave')
},
{
	path:'/empty',
	name:'Empty',
	component:()=>import(/* webpackChunkName: "empty" */ '../views/empty/Empty')
}];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});
router.beforeEach((to, from, next) => {
	// console.log(to, from)
	const {
		isLogin
	} = localStorage;
	const {
		name
	} = to;
	const isLoginOrRegister = (name === "Login" || name === "Register");
	(isLogin || isLoginOrRegister) ? next(): next({
		name: 'Login'
	});
})
export default router;
