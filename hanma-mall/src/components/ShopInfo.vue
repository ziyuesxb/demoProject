<template>
	<div class="shop">
		<img :src="item.imgUrl" class="shop__img">
		<div :class="{'shop__content':true,'shop__content--bordered':hideBorder?false:true}">
			<div class="shop__content__title">{{item.title}}</div>
			<div class="shop__content__tags">
				<span class="shop__content__tag">月售:{{item.sales}}</span>
				<span class="shop__content__tag">起送:{{item.expressLimit}}</span>
				<span class="shop__content__tag">基础运费:{{item.expressPrice}}</span>
			</div>
			<p class="shop__content__highlight">{{item.desc}}</p>
		</div>
	</div>
</template>

<script>
	
	export default {
		name: 'ShopInfo',
		props: ['item', 'hideBorder'],
	}
</script>

<style lang="scss" scoped>
	@import '../style/variables.scss';

	.shop {
		display: flex;
		padding-top: .12rem;

		&__img {
			margin-right: .16rem;
			width: 0.56rem;
			height: 0.56rem;
		}

		&__content {
			flex: 1;
			padding-bottom: .12rem;

			&--bordered {
				border-bottom: 1px solid $content-bgcolor;
			}

			&__title {
				line-height: .22rem;
				font-size: .16rem;
				color: $content-fontcolor;
			}

			&__tags {
				margin-top: .08rem;
				line-height: .18rem;
				font-size: .13rem;
				color: $content-fontcolor;
			}

			&__tag {
				margin-right: .16rem;
			}

			&__highlight {
				margin: .08rem 0 0 0;
				line-height: 0.18rem;
				font-size: .13rem;
				color: #e93b3b;
			}
		}
	}
</style>
