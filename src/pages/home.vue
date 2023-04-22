<script setup>
import { ref } from "vue";

import Card from "../components/card.vue";

import { produtosStore } from "../store/produtos";

const store = produtosStore();

const cardData = ref(store.cardDataStore);
</script>

<template>
  <Card v-for="data in cardData" :data="data" />
</template>
