import { ref } from "vue";

export default function useFood() {
  const foodClick = ref({
    food: false,
    one: false,
    two: false,
    three: false
  });
  function setFood(obj) {
    console.log("foodClick.value:", foodClick.value)
    foodClick.value = {...foodClick.value, ...obj};
  }
  return {
    foodClick,
    setFood,
  };
}
