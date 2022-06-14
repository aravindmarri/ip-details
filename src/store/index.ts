import { createStore } from 'vuex'
import axios from "axios";
import {emitter} from "../bus";

export default createStore({
  state: {
    ipDetails: null,
    ipNo: null
  },
  getters: {
  },
  mutations: {
    UpdateIp(state, data){
      state.ipNo = data.ipNo
      console.log("update" + state.ipNo);
    },
    updateDetails(state, data){
      state.ipDetails = data.ipDetails
    }
  },
  actions: {
    getIp ({commit}){
      const options = {
        url: 'https://api.ipify.org',
      };
      axios.request(options).then(async function (response) {
        await commit('UpdateIp', {
          ipNo: response.data
        });
        emitter.emit('local-ip-value', response.data)
      }).catch(function (error) {
        console.error(error);
      });
    },
    getDetails ({ commit }, payload) {
      const options = {
        method: 'GET',
        url: 'https://ip-reputation-geoip-and-detect-vpn.p.rapidapi.com/',
        params: {ip: payload},
        headers: {
          'X-RapidAPI-Key': 'd76feacf84mshd9d8fc82bf32673p157495jsnc9cd75019eb9',
          'X-RapidAPI-Host': 'ip-reputation-geoip-and-detect-vpn.p.rapidapi.com',
        }
      };
      axios.request(options).then(function (response) {
        commit('updateDetails', {
          ipDetails: response.data
        });
      }).catch(function (error) {
        console.error(error);
      });
    }
  },
  modules: {
  }
})
