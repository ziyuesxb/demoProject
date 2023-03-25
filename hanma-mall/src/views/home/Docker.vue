<template>
	<!-- 底部tabar -->
	<div class="docker">
		<div v-for="(item,index) in dockerList" class="docker__item" :key="item.icon">
			<router-link :to="item.to" :class="{'docker__item--active':index===currentIndex}">
				<div class="iconfont" v-html="item.icon" />
				<div class="docker__title">{{item.text}}</div>
			</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Docker',
		props:["currentIndex"],
		setup() {
			const dockerList = [{
					icon: '&#xe64f;',
					text: '首页',
					to: {
						name: 'Home'
					}
				},
				{
					icon: '&#xe601;',
					text: '购物车',
					to: {
						name: 'CartList'
					}
				},
				{
					icon: '&#xe8ae;',
					text: '订单',
					to: {
						name: 'OrderList'
					}
				},
				{
					icon: '&#xe603;',
					text: '我的',
					to: {
						name: 'My'
					}
				},
			];
			return {
				dockerList
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/style/variables.scss';

	.docker {
		display: flex;
		box-sizing: border-box;
		position: absolute;
		padding: 0 .18rem;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 0.49rem;
		border-top: .01rem solid #F1F1F1;
		color: #333;

		&__item {
			text-decoration: none;
			flex: 1;
			text-align: center;

			a {
				color: $content-fontcolor;
				text-decoration: none;

			}

			a.docker__item--active {
				color: #1FA4FC;
			}

			.iconfont {
				margin: .07rem 0 .02rem 0;
				font-size: .18rem;
			}

			// &--active {
			// 	color: #1FA4FC;
			// }
		}


		&__title {
			font-size: .2rem;
			transform: scale(.5, .5);
			transform-origin: center top;
		}
	}
</style>
