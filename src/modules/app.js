import _ from "lodash";
import axios from "@/utils/axios.js";

const app = {
  namespaced: true,
  state() {
    return {
      userInfo: {},
      isLogin: false,
      talks: [], // mock, 模拟留言
    };
  },

  mutations: {
    setState(state, paylods) {
      for (let key in paylods) {
        state[key] = paylods[key];
      }
    },
  },

  actions: {
    // 注册
    // async register(context, params) {
    //   let res = await fetch(`${baseUrl}/rest-api/users/create/username`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(params)
    //   });
    //   let result = await res.json();
    //   console.log('注册用户', result);
    //   return result;
    // },

    // TODO 发送留言
    async sendMsg(context, params) {
      console.log("sendMsg", context.state.talks);
      const historyChat = [...context.state.talks];
      const question = params.txt;
      try {
        if(historyChat.length > 10) {
          historyChat.shift();
        }
        const res = await axios.post("/rest-api/relped/chat", {historyChat: JSON.stringify(historyChat), question});
        historyChat.push({
          user: question
        })
        historyChat.push({
          system: res.detail
        })
        context.commit("setState", { talks: historyChat });
        return true;
      } catch {
        return { code: 500 };
      }



      // const talks = [...context.state.talks];
      // talks.push({ name: "user", txt: params.txt });
      // if (talks.length > 10) {
      //   talks.shift();
      // }
      // context.commit("setState", { talks });
      // // context.dispatch("getMsg");
      // return true;

      // try {
      //   const res = await axios.post("/rest-api/relped/chat", params);
      //   return res;
      // } catch {
      //   return { code: 500 };
      // }
    },

    // TODO 获取AI回复
    async getMsg(context, params) {
      const talks = [...context.state.talks];
      talks.push({ name: "包晴天", txt: "好的" });
      if (talks.length > 10) {
        talks.shift();
      }
      context.commit("setState", { talks });
      return true;

      // const res = await axios.get("/api/getMsg", params);
      // return res;
    },
  },
};

export default app;
