<script>
import { ref, computed } from "vue";
import { carrinhoStore } from "../store/produtos";
import { useRoute } from "vue-router";
export default {
  setup() {
    const carrinho = carrinhoStore();

    const routeName = computed(() => {
      return useRoute().name;
    });

    return {
      carrinho,
      routeName,
    };
  },
};
</script>
<template>
  <div v-if="routeName != 'checkout'">
    <router-link to="/checkout">
      <div>
        <a href="#" class="float2">
          <div class="numcircle">{{ carrinho.getQuantidadeDePedidos }}</div>
          <div class="box-preco">
            <span class="carrinho">🛒</span>
          </div>
        </a>
      </div>
      <div>
        <a href="#" class="float">
          <div class="box-preco">
            <span class="preco">R$: {{ carrinho.getValorDosPedidos }}</span>
          </div>
        </a>
      </div>
    </router-link>
  </div>
</template>

<style scoped>
.float {
  position: fixed;
  width: 100px;
  height: 40px;
  bottom: 40px;
  right: 40px;
  background-color: #2efd00;
  color: #000000;
  border-radius: 50px;
  z-index: 30;
  display: flex;
  justify-content: center;
  align-items: center;
}

.float2 {
  margin-bottom: 40px;
  position: fixed;
  width: 50px;
  height: 50px;
  bottom: 50px;
  right: 50px;
  background-color: #201726;
  border-width: 2px;
  border-style: solid;
  border-color: #2efd00;
  border-radius: 50px;
  z-index: 30;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carrinho {
  font-size: 23px;
}

.preco {
  font-family: Barlow-SemiBold;
}

.btn {
  position: relative;
  margin: 2em;
}

.numcircle {
  position: absolute;
  top: 0;
  right: 0;
  background-color: #2efd00;
  color: rgb(0, 0, 0);
  font-family: Barlow-SemiBold;
  font-size: 15px;
  width: 25px;
  line-height: 25px;
  border-radius: 50%;
  text-align: center;
  transform: translate(50%, -50%);
}
</style>
