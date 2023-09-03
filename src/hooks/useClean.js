import {ref, onMounted} from 'vue';
import Img1 from '@/assets/imgs/clean/icon-1.png';
import Img2 from '@/assets/imgs/clean/icon-2.png';
import Img3 from '@/assets/imgs/clean/icon-3.png';
import tools from '@/utils/tools.js';

const imgs = [
    Img1,Img2,Img3
]
export default function useClean(){

    const timer = ref(0);
    const cleanInfo = ref({
        time: Date.now(),
        todayNum: 0,
        maxNum: 10,
        objNum: 0, // 当前数量
    });

    const objsArr = ref([]);
    const isCleanShow = ref(false);

    onMounted(()=>{
        let res = localStorage.getItem("cleanInfo");
        if(res){
            try{
                res = JSON.parse(res);
            }catch{
                res = {time: 0, objNum: 3, todayNum: 0, maxNum: 10};
            }
        } else {
            res = {time: 0, objNum: 3, todayNum: 0, maxNum: 10};
        }
       
        cleanInfo.value = res;
        console.log('初始化cleanInfo', cleanInfo.value);
        localStorage.setItem("cleanInfo", JSON.stringify(res));

        if(Date.now() - cleanInfo.value.time > 3600 * 1000){
            cleanInfo.value.objNum = cleanInfo.value.objNum + 1;
        }
        initObjsArr();
    });

   function initObjsArr(){
   
    const clientHeight = document.documentElement.clientHeight;

        for(let i=0;i<cleanInfo.value.objNum;i++){
            const index = tools.getRandomInt(0, imgs.length - 1);
            objsArr.value.push({
                id: String(Math.random()),
                src: imgs[index],
                x: tools.getRandom(0.5, 6), // rem
                y: tools.getRandom(clientHeight/2 + 50, clientHeight - 50),
                w: index === 0 ? 1.5 : (index === 1) ? 2 : 1.2,
                type: 'rabish',
            })
        }

    }

    function clearOne(id){
        const objsArrTemp = [...objsArr.value];
        let itemIndex = objsArrTemp.findIndex(item => item.id === id);
        objsArrTemp[itemIndex].type = 'clean';
        objsArr.value = objsArrTemp;
        
        cleanInfo.value.todayNum = Math.min(10, cleanInfo.value.todayNum + 1);
        cleanInfo.value.time = Date.now();
        cleanInfo.value.objNum = Math.max(0, cleanInfo.value.objNum - 1);

        localStorage.setItem("cleanInfo", JSON.stringify(cleanInfo.value));

        isCleanShow.value = true;
        clearTimeout(timer.value);
        timer.value = setTimeout(()=>{
            objsArr.value = objsArr.value.filter(item => item.type !== 'clean');
            isCleanShow.value = false;
        }, 2000);
    }

    return {
        cleanInfo,
        objsArr,
        isCleanShow,
        clearOne
    }
}