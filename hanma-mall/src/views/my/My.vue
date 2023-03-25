<template>
	<div class="wrapper">
		<div class="bg"></div>
		<div class="person_edit" @click="handleEditClick">
			<img src="../../assets/编辑.png" alt="">
		</div>
		<div class="person">
			<div class="person_info">
				<div class="person_info_avatar">
					<img src="../../assets/avatar.jpg" alt="">
				</div>
				<div class="person_info_title">
					<div class="person_info_title_nick">{{userInfo.nickname}}</div>
					<div class="person_info_title__ID">ID:{{userInfo.numbers}}</div>
				</div>
				<div class="person_info_money">
					<div class="info">
						<div class="title">红包</div>
						<div class="num">{{userInfo.money}}</div>
					</div>
					<div class="info">
						<div class="title">优惠券</div>
						<div class="num">{{userInfo.coupons}}</div>
					</div>
					<div class="info">
						<div class="title">鲜豆</div>
						<div class="num">{{userInfo.gold}}</div>
					</div>
					<div class="info">
						<div class="title">白条</div>
						<div class="num">{{userInfo.iou}}</div>
					</div>
				</div>
			</div>
			<div class="person_menu">
				<div class="person_menu_list">
					<div class="person_menu_list_con">
						<div><img src="../../assets/钱包.png" alt=""></div>
						<p>我的钱包</p>
					</div>
					<div class="person_menu_list_more iconfont">&#xe8a6;</div>
				</div>
				<div class="person_menu_list" @click="handleRouteClick('address')">
					<div class="person_menu_list_con">
						<div><img src="../../assets/导航地址.png" alt=""></div>
						<p>我的地址</p>
					</div>
					<div class="person_menu_list_more iconfont">&#xe8a6;</div>
				</div>
				<div class="person_menu_list">
					<div class="person_menu_list_con">
						<div><img src="../../assets/客服.png" alt=""></div>
						<p><a href="tel:88984788">我的客服</a></p>
					</div>
					<div class="person_menu_list_more iconfont">&#xe8a6;</div>
				</div>
			</div>
		</div>
	</div>
	<Docker :currentIndex="3" />
</template>

<script>
	import Docker from '../home/Docker.vue'
	import {
		useRouter
	} from "vue-router";
	const useMyEffect = () => {
		const router = useRouter()
		const handleEditClick = () => {
			router.push({
				name: "Edit"
			});
		};
		const handleRouteClick=(path)=>{
			if(path=="address"){
				router.push({name:"Address"});
			}
		};
		return {handleEditClick,handleRouteClick};
	}
	export default {
		name: 'My',
		components: {
			Docker
		},
		setup(){
			const userInfo=JSON.parse(localStorage.getItem('userinfo'))
			const {handleEditClick,handleRouteClick}=useMyEffect();
			return {handleEditClick,handleRouteClick,userInfo}
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		overflow-y: auto;
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0.5rem;
		right: 0;
		background: rgb(248, 248, 248);
	}

	.bg {
		height: 2.5rem;
		background-image: linear-gradient(239deg, #7543e0 0%, #bda0fa 100%);
		border-bottom-left-radius: 30%;
		border-bottom-right-radius: 30%;
	}

	.person {
		position: absolute;
		top: 1.08rem;
		left: 0;
		right: 0;
		height: 2.03rem;

		&_info {
			position: relative;
			margin: auto;
			width: 3.39rem;
			height: 2.03rem;
			border-radius: .08rem;
			background-color: #ffffff;

			&_avatar {
				position: absolute;
				top: -0.48rem;
				height: 0.94rem;
				width: 0.94rem;
				border-radius: 50%;
				background-color: #fff;
				overflow: hidden;

				img {
					width: 100%;
				}
			}

			&_title {
				position: absolute;
				top: 0.62rem;
				right: 0;
				left: 0;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				&_nick {
					height: 0.36rem;
					width: 1.7rem;
					font-size: .24rem;
					line-height: 0.36rem;
					color: #262628;
					text-align: center;
					padding-bottom: .05rem;
				}

				&_ID {
					height: 0.17rem;
					width: 1.62rem;
					color: #c1c0c9;
					font-size: .14rem;
					text-align: center;
				}
			}

			&_money {
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				height: 0.7rem;
				border-top: 1px solid #f1f1f1;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.info {
					width: 25%;
					height: 0.7rem;

					.title {
						color: #c1c0c9;
						font-size: .12rem;
						margin-top: 0.1rem;
						text-align: center;
					}

					.num {
						font-size: 0.2rem;
						color: #262628;
						text-align: center;
						margin-top: .1rem;
					}
				}
			}
		}

		&_menu {
			position: relative;
			margin: auto;
			top: 0.2rem;
			width: 3.39rem;
			height: 1.46rem;
			border-radius: .08rem;
			background-color: #fff;
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			&_list {
				height: 0.25rem;
				display: flex;
				justify-content: space-between;
				align-items: center;

				&_con {
					width: 0.9rem;
					height: 0.25rem;
					padding-left: .16rem;
					display: flex;
					justify-content: space-between;
					align-items: center;

					div {
						height: 0.2rem;
						width: 0.2rem;
						border-radius: 8px;
						overflow: hidden;

						img {
							width: 100%;
						}
					}

					p {
						font-size: .14rem;

						a {
							color: #262626;
							text-decoration: none;
						}
					}
				}

				&_more {
					height: 0.25rem;
					line-height: 0.25rem;
					transform: rotate(180deg);
					color: #c2c4ca;
				}
			}
		}
	}

	.person_edit {
		position: absolute;
		top: 0.6rem;
		right: 0.2rem;
		z-index: 999;
		width: 0.3rem;
		height: 0.3rem;

		img {
			width: 100%;
		}
	}
</style>
