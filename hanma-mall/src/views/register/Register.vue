<template>
	<div class="wrapper">
		<Toast v-if="show" :message="toastMessage" />
		<img src="http://webapi.hanmaweilai.com/public/static/images/user.png" class="wrapper__img">
		<div class="wrapper__input">
			<input class="wrapper__input__content" placeholder="请输入手机号" v-model="username" />
		</div>
		<div class="wrapper__input">
			<input type="password" class="wrapper__input__content" placeholder="请输入密码" v-model="password" />
		</div>
		<div class="wrapper__input">
			<input type="password" class="wrapper__input__content" placeholder="确认密码" v-model="repassword" />
		</div>
		<div class="wrapper__register-button" @click="handleRegister">注册</div>
		<div class="wrapper__register-link" @click="handleLoginClick">已有帐号去登录</div>
	</div>
</template>

<script>
	import {useRouter} from 'vue-router';
	import {reactive,toRefs} from 'vue';
	import request from '@/utils/request';
	import Toast,{useToastEffect} from '../../components/Toast.vue'
	//处理注册逻辑
	const useRegisterEffect=showToast=>{
		const data=reactive({
			username:'',
			password:'',
			repassword:''
		})
		const router=useRouter();
		const handleRegister=async()=>{
			try{
				const result =await request.post('/api/v1/register',{
					username:data.username,
					password:data.password,
					repassword:data.repassword
				})
				if(result.msg=="ok"){
					router.push({name:'Login'})
				}else{
					showToast(result.msg)
				}
			}catch(e){
				showToast('请求失败')
			}
		}
		const {username,password,repassword}=toRefs(data);
		return{username,password,repassword,handleRegister}
	}
	//处理登录跳转
	const useLoginEffect=()=>{
		const router=useRouter();
		const handleLoginClick=()=>{
			router.push({name:'Login'});
		}
		return {handleLoginClick}
	}
	export default{
		name:'Register',
		components:{Toast},
		setup(){
			const {show,toastMessage,showToast}=useToastEffect();
			const {username,password,repassword,handleRegister}=useRegisterEffect(showToast);
			const {handleLoginClick}=useLoginEffect();
			// const data=reactive({
			// 	username:'',
			// 	password:'',
			// 	repassword:''
			// })
			// const router=useRouter();
			// const handleRegister=async()=>{
			// 	try{
			// 		const result=await request.post('/api/v1/register',{
			// 			username:data.username,
			// 			password:data.password,
			// 			repassword:data.repassword
			// 		})
			// 		if(result.msg=="ok"){
			// 			router.push({name:'Login'})
			// 		}else{
			// 			alert(result.msg)
			// 		}
			// 	}catch(e){
			// 		alert('请求失败')
			// 	}
			// }
			// const handleLoginClick=()=>{
			// 	router.push({name:'Login'});
			// }
			return {username,password,repassword,show,toastMessage,handleLoginClick,handleRegister}
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
			width: 0.66rem;
			height: 0.66rem;
		}
		&__input{
			height: 0.48rem;
			margin: 0 .4rem .16rem .4rem;
			padding: 0 .16rem;
			background: #f9f9f9;
			border: 1px solid rgba(0, 0, 0, 0.1);
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
					color: $content-notice-fontcolor;
				}
			}
		}
		&__register-button{
			margin: .32rem .4rem .16rem .4rem;
			line-height: 0.48rem;
			background: #0091ff;
			box-shadow: 0 0.04rem 0.08rem 0 rgba(138, 98, 222, 0.32);
			border-radius: .04rem;
			color:#fff;
			font-size: .16rem;
			text-align: center;
		}
		&__register-link{
			text-align: center;
			font-size: .14rem;
			color: $content-notice-fontcolor;
		}
	}
</style>