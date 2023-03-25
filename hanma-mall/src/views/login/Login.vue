<template>
	<Toast v-if="show" :message="toastMessage" />
	<div class="wrapper">
		<img src="http://webapi.hanmaweilai.com/public/static/images/user.png" class="wrapper__img" />
		<div class="wrapper__input">
			<input placeholder="请输入手机号" class="wrapper__input__content" v-model="username" />
		</div>
		<div class="wrapper__input">
			<input type="password" placeholder="请输入密码" class="wrapper__input__content" v-model="password" />
		</div>
		<div class="wrapper__login-button" @click="handleLogin">登录</div>
		<div class="wrapper__login-link" @click="handleRegisterClick">立即注册</div>
	</div>
</template>

<script>
	import Toast,{useToastEffect} from '../../components/Toast.vue'
	import {useRouter} from 'vue-router';
	import axios from 'axios';
	import {reactive,toRefs} from 'vue';
	import request from '@/utils/request';
	// import useToastEffect from '@/utils/useToastEffect'
	const useLoginEffect=(showToast)=>{
		const router=useRouter()
		const data=reactive({username:'',password:''})
		const handleLogin=async()=>{
			try{
				const result=await request.post('/api/v1/login',{
					username:data.username,
					password:data.password
				})
				// console.log(result)
				if(result.msg=="ok"){
					localStorage.userinfo=JSON.stringify(result.data);
					localStorage.isLogin=true
					router.push({name:'Home'})
				}else{
					showToast(result.msg)
				}
			}catch(e){
				showToast('请求失败')
			}
		}
		const {username,password}=toRefs(data);
		return {username,password,handleLogin}
	}
	//处理注册跳转
	const useRegisterEffect=()=>{
		const router=useRouter()
		const handleRegisterClick=()=>{
			router.push({name:'Register'})
		}
		return{handleRegisterClick}
	}
	export default{
		name:'Login',
		components:{Toast},
		setup(){
			// const data=reactive({
			// 	username:'',
			// 	password:'',
			// 	showToast:false,
			// 	toastMessage:''
			// })
			// const router=useRouter();
			const {show,toastMessage,showToast}=useToastEffect();
			const {username,password,handleLogin}=useLoginEffect(showToast)
			const {handleRegisterClick}=useRegisterEffect()
			// const showToast=(message)=>{
			// 	data.showToast=true
			// 	data.toastMessage=message
			// 	setTimeout(()=>{
			// 		data.showToast=false
			// 		data.toastMessage=''
			// 	},2000)
			// }
			// const handleLogin=async()=>{
			// 	try{
			// 		const result=await request.post('/api/v1/login',{
			// 			username:data.username,
			// 			password:data.password
			// 		})
			// 		if(result.msg=="ok"){
			// 			localStorage.userinfo=JSON.stringify(result.data);
			// 			localStorage.isLogin=true
			// 			router.push({name:'Home'})
			// 		}else{
			// 			// alert(result.msg)
			// 			showToast(result.msg)
			// 		}
			// 	}catch(e){
			// 		// alert('请求失败')
			// 		showToast('请求失败')
			// 	}
			// }
			
			// const handleRegisterClick=()=>{
			// 	router.push({name:'Register'})
			// }
			return {username,password,show,handleLogin,handleRegisterClick,toastMessage}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../style/variables.scss';
	.wrapper{
		position: absolute;
		top: 50%;
		left: 0;
		right: 0;
		transform: translateY(-50%);
		&__img{
			display: block;
			margin: 0 auto .4rem auto;
			width: .66rem;
			height: .66rem;
		}
		&__input{
			height: .48rem;
			margin: 0 .4rem .16rem .4rem;
			padding: 0 .16rem;
			background: #f9f9f9;
			border: 1px solid rgba(0, 0, 0, 0.10);
			border-radius: 6px;
			&__content{
				line-height: .48rem;
				border: none;
				outline: none;
				width: 100%;
				background: none;
				font-size: .16rem;
				color: $content-notice-fontcolor;
				&::placeholder{
					color:$content-notice-fontcolor;
				}
			}
		}
		&__login-button{
			margin: .32rem .4rem .16rem .4rem;
			line-height: .48rem;
			background: #7543e0;
			box-shadow: 0 0.04rem 0.08rem 0 rgba(138,98,222,0.32);
			border-radius: .04rem;
			color: #fff;
			font-size: .16rem;
			text-align: center;
		}
		&__login-link{
			text-align: center;
			font-size: .14rem;
			color: $content-notice-fontcolor;
		}
	}
</style>