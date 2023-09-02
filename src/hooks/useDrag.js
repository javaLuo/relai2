import { ref, watch } from "vue";
import anime from "animejs";

export default function useDrag(dom) {
  const d = ref(null);
  const touchStartInfo = ref({ x: 0, y: 0 });
  const touchPrevInfo = ref({ x: 0, y: 0 });
  const transPrev = ref({ x: 0, y: 0 });
  const isDraging = ref(false);
  const isActive = ref(true); // 是否可以拖拽

  watch(
    () => dom.value,
    newV => {
      d.value = newV;
    },
  );

  function onTouchStart(e) {
    if (!isActive.value) return;
    isDraging.value = true;
    touchStartInfo.value = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  }

  function onTouchMove(e) {
    if (!isDraging.value) return;
    const touchNow = e.touches[0];
    const diffX = transPrev.value.x + touchNow.clientX - touchStartInfo.value.x;
    const diffY = transPrev.value.y + touchNow.clientY - touchStartInfo.value.y;
    touchPrevInfo.value.x = diffX;
    touchPrevInfo.value.y = diffY;

    d.value.style.translate = `${diffX}px ${diffY}px`;
  }

  function onTouchEnd() {
    if (!isDraging.value) return;
    transPrev.value = {
      x: touchPrevInfo.value.x,
      y: touchPrevInfo.value.y,
    };

    const battery = {
      x: touchPrevInfo.value.x,
      y: touchPrevInfo.value.y,
    };

    touchPrevInfo.value = { x: 0, y: 0 };
    transPrev.value = { x: 0, y: 0 };
    isDraging.value = false;
    anime({
      targets: battery,
      x: 0,
      y: 0,
      round: 1,
      easing: "linear",
      duration: 200,
      update: function () {
        d.value.style.translate = `${battery.x}px ${battery.y}px`;
      },
    });
  }

  function setActive(type) {
    isActive.value = type;
  }

  return {
    isDraging,
    isActive,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    setActive,
  };
}
