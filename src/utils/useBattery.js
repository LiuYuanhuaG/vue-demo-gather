import { computed, onMounted, reactive, toRefs } from "vue";

export const useBattery = () => {
  const state = reactive({
    battery: {
      charging: false,
      chargingTime: 0,
      dischargingTime: 0,
      level: 100,
    },
  });

  // 更新电池使用状态
  const updateBattery = (target) => {
    for (const key in state.battery) {
      state.battery[key] = target[key];
    }
    state.battery.level = state.battery.level * 100;
  };

  // 计算电池剩余可用时间
  const calcDischargingTime = computed(() => {
    const hour = state.battery.dischargingTime / 3600;
    const minute = (state.battery.dischargingTime / 60) % 60;
    return `${~~hour}小时${~~minute}分钟`;
  });

  // 电池状态
  const batteryStatus = computed(() => {
    if (state.battery.charging && state.battery.level >= 100) {
      return "已充满";
    } else if (state.battery.charging) {
      return "充电中";
    } else {
      return "已断开电源";
    }
  });

  onMounted(async () => {
    const BatteryManager = await window.navigator.getBattery();
    updateBattery(BatteryManager);
    // console.log(BatteryManager, "电池");

    // 电池充电状态更新时被调用
    BatteryManager.onchargingchange = ({ target }) => {
      updateBattery(target);
      // console.log(target, "电池充电状态改变了");
    };
    // 电池充电时间更新时被调用
    BatteryManager.onchargingtimechange = ({ target }) => {
      updateBattery(target);
      // console.log(target, "电池充电了");
    };
    // 电池断开充电时间更新时被调用
    BatteryManager.ondischargingtimechange = ({ target }) => {
      updateBattery(target);
      // console.log(target, "电池断开充电了");
    };
    // 电池电量更新时被调用
    BatteryManager.onlevelchange = ({ target }) => {
      updateBattery(target);
      // console.log(target, "电量更新了");
    };

    // new Intl.DateTimeFormat('zh', {
    //   year: 'numeric',
    //   month: '2-digit',
    //   day: '2-digit',
    //   hour: '2-digit',
    //   minute: '2-digit',
    //   second: '2-digit',
    //   hour12: false
    // }).format(new Date())
  });

  return {
    ...toRefs(state),
    batteryStatus,
    calcDischargingTime,
  };
};
