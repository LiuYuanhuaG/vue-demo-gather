<template>
	<div class="lockscreen">
		<template v-if="!state.isShowLogin">
			<div class="lock-box">
				<h6 class="tips" @click="unLockLogin">前往登录</h6>
			</div>
			<component
				:is="randomCompName"
				:battery="battery"
				:battery-status="batteryStatus"
				:calc-discharging-time="calcDischargingTime"
			/>
		</template>

		<template v-if="!state.isShowLogin">
			<div class="local-time">
				<div class="time">{{ hour }}:{{ minute }}</div>
				<div class="date">{{ month }}月{{ day }}号，星期{{ week }}</div>
			</div>
		</template>
	</div>
</template>

<script setup>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import XiaomiCharge from './xiaomi-charge.vue';
import { useTime } from '@/utils/useTime';
import { useBattery } from '@/utils/useBattery';
import { LOCAL_STORAGE } from '@/utils/request';
// 状态管理依赖
import { useStore } from 'vuex';

const emit = defineEmits(['']);
const store = useStore();
const router = useRouter();

const randomCompName = Math.random() > 0.48 ? XiaomiCharge : XiaomiCharge;

// 获取本地时间
const { month, day, hour, minute, week } = useTime();

const { battery, batteryStatus, calcDischargingTime } = useBattery();

const state = reactive({
	isShowLogin: false,
	loginLoading: false, // 正在登录
});

// 解锁登录
const unLockLogin = () => {
	// if (sessionStorage.getItem(LOCAL_STORAGE)) {
	//   store.dispatch(`userInfo/LOG_OUT`);
	//   if (route.path !== "/login") {
	//     location.reload();
	//   }
	// }
	router.push({ path: '/home' });
};
</script>
<style scoped lang="scss">
.lockscreen {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 9999;
	display: flex;
	overflow: hidden;
	color: white;
	background: #000;

	&.unLockLogin {
		background-color: rgba(25, 28, 34, 0.78);
		backdrop-filter: blur(7px);
	}

	.login-box {
		position: absolute;
		top: 45%;
		left: 50%;
		display: flex;
		transform: translate(-50%, -50%);
		flex-direction: column;
		justify-content: center;
		align-items: center;

		> * {
			margin-bottom: 14px;
		}

		.username {
			font-size: 30px;
		}
	}

	.lock-box {
		position: absolute;
		top: 12vh;
		left: 50%;
		font-size: 34px;
		transform: translateX(-50%);

		.tips {
			position: relative;
			z-index: 1;
			color: white;
			cursor: text;
			cursor: pointer;
		}

		.tips::before {
			content: '';
			position: absolute;
			z-index: -1;
			top: 0;
			bottom: 0;
			left: -0.25em;
			right: -0.25em;
			background-color: hsla(341, 97%, 59%, 0.75);
			transform-origin: center right;
			transform: scaleX(0);
			transition: transform 0.2s ease-in-out;
		}

		.tips:hover::before {
			transform: scaleX(1);
			transform-origin: center left;
		}

		.lock {
			display: flex;
			justify-content: center;

			.lock-icon {
				cursor: pointer;

				.anticon-unlock {
					display: none;
				}

				&:hover .anticon-unlock {
					display: initial;
				}

				&:hover .anticon-lock {
					display: none;
				}
			}
		}
	}

	.local-time {
		position: absolute;
		bottom: 60px;
		left: 60px;
		font-family: helvetica;

		.time {
			font-size: 70px;
		}

		.date {
			font-size: 40px;
		}
	}

	.computer-status {
		position: absolute;
		right: 60px;
		bottom: 60px;
		font-size: 24px;

		> * {
			margin-left: 14px;
		}

		.network {
			position: relative;

			&.offline::before {
				position: absolute;
				top: 50%;
				left: 50%;
				z-index: 10;
				width: 2px;
				height: 28px;
				background-color: red;
				content: '';
				transform: translate(-50%, -50%) rotate(45deg);
			}
		}
	}
}
</style>
