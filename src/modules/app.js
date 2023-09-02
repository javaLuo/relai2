import _ from 'lodash';

const app = {
  namespaced: true,
  state() {
    return {
      userInfo: {},
      isLogin: false,
    };
  },

  mutations: {
    setState(state, paylods) {
      for (let key in paylods) {
        state[key] = paylods[key];
      }
    }
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
  }
};

export default app;
