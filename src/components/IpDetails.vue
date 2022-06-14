<script setup lang="ts">
import {onMounted, ref} from 'vue'
import store from "../store";
import {emitter} from "../bus";

let customIp = ref('')
let error = ref('')
defineProps<{ msg: string }>()

onMounted(async () => {
  await store.dispatch('getIp');
})


emitter.on('local-ip-value', (data) => {
  store.dispatch('getDetails', <string>data);
});

function getCustomIp() {
  if (/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(customIp.value)) {
    error.value = ''
    store.dispatch('getDetails', customIp.value);
  } else {
    error.value = 'Please check the IP address'
  }
}
</script>

<template>
  <h1>{{ msg }}</h1>

  <input v-model="customIp" placeholder="Enter IP number">
  <button type="button" @click="getCustomIp" >Get details</button>
  <p>{{ error }}</p>
  <div v-if="store.state.ipDetails !== null">
    <h2>Your system ip is : {{ store.state.ipDetails.ip }}</h2>
    <p>Risk: {{ store.state.ipDetails.risk }}</p>
    <p>Risk level: {{ store.state.ipDetails.risk_level }}</p>
    <p>Postal code: {{ store.state.ipDetails.postal_code }}</p>
    <p>Region code: {{ store.state.ipDetails.region_code }}</p>
    <p>Time zone: {{ store.state.ipDetails.time_zone }}</p>
    <p>Time zone offset: {{ store.state.ipDetails.time_zone_offset }}</p>
    <h3>Country: {{ store.state.ipDetails.country }}</h3>
    <p>Flag image: <img :src="store.state.ipDetails.flag_image" height="18" alt="flag image"></p>
    <p>Country code : {{ store.state.ipDetails.country_code }}</p>
    <p>Country calling code: {{ store.state.ipDetails.country_calling_code }}</p>
    <p>Provider: {{ store.state.ipDetails.organization }}</p>
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
