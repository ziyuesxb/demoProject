<template>
	<div class="wrapper">
		<div class="title">
			<div class="title_back iconfont" @click="handleBackClick">&#xe604;</div>
			<div class="title_content">
				<div class="title_content_info">编辑基本信息</div>
				<div class="title_content_more" @click="handleSaveClick">保存</div>
			</div>
		</div>
		<div class="userinfo">
			<div class="userinfo-item">
				<div class="userinfo_item_title">昵称：</div>
				<input type="text" placeholder="请输入昵称" v-model="nickname">
			</div>
			<div class="userinfo_item">
				<div class="userinfo_item_title">电话：</div>
				<input type="text" placeholder="请输入电话" v-model="mobile">
			</div>
			<div class="userinfo_item">
				<div class="userinfo_item_title">密码：</div>
				<input type="password" placeholder="请输入密码" v-model="password">
			</div>
			<div class="userinfo_item">
				<div class="userinfo_item_title">确认密码：</div>
				<input type="password" placeholder="请输入确认密码" v-model="repassword">
			</div>
		</div>
		<Toast v-if="show" :message="toastMessage" />
	</div>
</template>

<script>
	import Toast,{useToastEffect} from "@/components/Toast"
	import {useRouter} from 'vue-router';
	import {reactive,toRefs} from 'vue';
	import request from '../../utils/request.js'
	const useUserInfoEffect=(showToast)=>{
		const router=useRouter();
		const handleBackClick=()=>{
			router.back()
		}
		const userInfo=JSON.parse(localStorage.getItem('userinfo'));
		let data=reactive({
			nickname:userInfo.nickname,
			mobile:userInfo.mobile,
			password:userInfo.password,
			repassword:userInfo.password
		})
		const handleSaveClick=async()=>{
			if(data.password!=data.repassword){
				showToast('密码不一致')
			}
			//请求修改个人信息的接口
			const result=await request.post('api/v1/saveUser/'+userInfo.id,{
				username:userInfo.username,
				nickname:data.nickname,
				mobile:data.mobile,
				password:data.password,
			})
			//成功返回后加入缓存
			if(result?.msg=='ok'){
				localStorage.setItem('userinfo',JSON.stringify(result.data));
				router.push({name:"My"})
			}
		}
		const {nickname,mobile,password,repassword}=toRefs(data);
		return {nickname,mobile,password,repassword,handleBackClick,handleSaveClick}
	}
	export default{
		name:"edit",
		components:{Toast},
		setup(){
			const {show,toastMessage,showToast}=useToastEffect();
			const {nickname,mobile,password,repassword,handleBackClick,handleSaveClick}=useUserInfoEffect(showToast)
			return {show,toastMessage,showToast,nickname,mobile,password,repassword,handleBackClick,handleSaveClick}
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper{
		overflow-y: auto;
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0.5rem;
		right: 0;
		background: rgb(248, 248, 248);
	}
	.title{
		display: flex;
		padding: 0 .18rem;
		line-height: 0.44rem;
		height: 0.44rem;
		background-color: #fff;
		&_back{
			width: 0.3rem;
			font-size: 0.24rem;
			color: #b6b6b6;
		}
		&_content{
			display: flex;
			flex: 1;
			color: #333;
			&_info{
				flex: 1;
				text-align: center;
				font-size: .16rem;
			}
			&_more{
				font-size: .14rem;
			}
		}
	}
	.userinfo{
		padding: 0 .18rem;
		background-color: #fff;
		margin-top: 0.12rem;
		&_item{
			padding: .18rem .12rem;
			height: 0.2rem;
			font-size: 0.14rem;
			display: flex;
			border-bottom: 1px solid #f1f1f1;
			&_title{
				color: #666;
				line-height: 0.2rem;
				height: 0.2rem;
			}
			input{
				color: #999;
				border: 0 solid #3a91f3;
				::placeholder{
					color: #999;
				}
			}
		}
	}
</style>