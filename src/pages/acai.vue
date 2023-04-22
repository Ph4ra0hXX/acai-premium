<script>
import { ref, watch, onUpdated } from "vue";
import { menuStore, carrinhoStore } from "../store/produtos";
import { useToast } from "vue-toastification";
import router from "../router/index";

export default {
  setup() {
    const toast = useToast();

    const carrinho = carrinhoStore();

    const menu = menuStore();

    const pesoDoAcai = ref(menu.pesoDoAcai);
    const acais = ref(menu.acais);
    const cremes = ref(menu.cremes);
    const frutas = ref(menu.frutas);
    const acompanhamentos = ref(menu.acompanhamentos);
    const coberturas = ref(menu.coberturas);

    const quantidadeParaSelecionar = ref(0);

    const pedidoTemp = ref([]);
    const adicinalTemp = ref([]);

    const acaiEscolhido = ref("Escolha um");

    watch(acaiEscolhido, (novoValor, antigoValor) => {
      carrinho.pedidosParaSomar = acaiEscolhido.value;

      console.log(acaiEscolhido.value.nome);

      if (acaiEscolhido.value.nome == "Açaí 100g") {
        quantidadeParaSelecionar.value = 4;
      }
      if (acaiEscolhido.value.nome == "Açaí 150g") {
        quantidadeParaSelecionar.value = 5;
      }
      if (acaiEscolhido.value.nome == "Açaí 200g") {
        quantidadeParaSelecionar.value = 6;
      }
      if (acaiEscolhido.value.nome == "Açaí 250g") {
        quantidadeParaSelecionar.value = 7;
      }
      if (acaiEscolhido.value.nome == "Açaí 300g") {
        quantidadeParaSelecionar.value = 8;
      }
      if (acaiEscolhido.value.nome == "Açaí 350g") {
        quantidadeParaSelecionar.value = 9;
      }
      if (acaiEscolhido.value.nome == "Açaí 400g") {
        quantidadeParaSelecionar.value = 10;
      }
      if (acaiEscolhido.value.nome == "Açaí 450g") {
        quantidadeParaSelecionar.value = 11;
      }
      if (acaiEscolhido.value.nome == "Açaí 500g") {
        quantidadeParaSelecionar.value = 12;
      }
      if (acaiEscolhido.value.nome == "Açaí 550g") {
        quantidadeParaSelecionar.value = 13;
      }
      if (acaiEscolhido.value.nome == "Açaí 600g") {
        quantidadeParaSelecionar.value = 14;
      }
      if (acaiEscolhido.value.nome == "Açaí 650g") {
        quantidadeParaSelecionar.value = 15;
      }
      if (acaiEscolhido.value.nome == "Açaí 700g") {
        quantidadeParaSelecionar.value = 16;
      }
      if (acaiEscolhido.value.nome == "Açaí 750g") {
        quantidadeParaSelecionar.value = 17;
      }
      if (acaiEscolhido.value.nome == "Açaí 800g") {
        quantidadeParaSelecionar.value = 18;
      }
      if (acaiEscolhido.value.nome == "Açaí 850g") {
        quantidadeParaSelecionar.value = 19;
      }
      if (acaiEscolhido.value.nome == "Açaí 900g") {
        quantidadeParaSelecionar.value = 20;
      }
      if (acaiEscolhido.value.nome == "Açaí 950g") {
        quantidadeParaSelecionar.value = 21;
      }
      if (acaiEscolhido.value.nome == "Açaí 1kg") {
        quantidadeParaSelecionar.value = 22;
      }
    });

    function salvarPedido() {
      var temp = [...[acaiEscolhido.value], ...pedidoTemp.value];

      carrinho.salvarPedido(temp);

      router.push("/");

      toast.success("Adicionado com sucesso!", {
        timeout: 2000,
        position: "top-right",
        icon: false,
        showCloseButtonOnHover: true,
      });
    }

    function limparDados() {
      router.push("/");
    }

    return {
      limparDados,
      salvarPedido,
      pedidoTemp,
      pesoDoAcai,
      acaiEscolhido,
      acais,
      adicinalTemp,
      cremes,
      acompanhamentos,
      frutas,
      coberturas,
      quantidadeParaSelecionar,
    };
  },
};
</script>

<template>
  <div id="cardapio">
    <div id="listar">
      <div class="Categoria">
        <!---------------------------->
        <strong id="categoria">Escolha o tamanho:</strong>
        <select v-model="acaiEscolhido" id="selectPeso">
          <option selected value="Escolha um" disabled>
            Escolha uma opção
          </option>

          <option v-for="peso in pesoDoAcai" :value="peso">
            {{ peso.nome }} - R$: {{ peso.preco.toFixed(2) }}
          </option>
        </select>
        <br />
        <br />

        <!---------------------------->

        <div v-if="acaiEscolhido != 'Escolha um'">
          <p id="quantidadeDeItens">
            Monte seu açaí com até
            <span id="quantidadeEscolhida">{{ quantidadeParaSelecionar }}</span>
            itens
          </p>
          <strong id="categoria">Açai:</strong>
          <div v-for="(item, index) in acais" :key="item">
            <label class="container-checkbox" id="textoPreco">
              <input
                type="checkbox"
                class="checkbox1"
                id="adicional"
                :value="item"
                v-model="pedidoTemp"
                :disabled="
                  pedidoTemp.length >= quantidadeParaSelecionar &&
                  pedidoTemp.indexOf(item) === -1
                "
              />
              <span class="checkmark"></span>
            </label>
            <label style="pointer-events: none" for="adicional">{{
              item.nome
            }}</label>
            <label id="preco"></label>
            <p id="itens"></p>
            <br />
          </div>
          <!---------------------------->
          <strong id="categoria">Cremes:</strong>
          <div v-for="(item, index) in cremes" :key="item">
            <label class="container-checkbox" id="textoPreco">
              <input
                type="checkbox"
                class="checkbox1"
                id="adicional"
                :value="item"
                v-model="pedidoTemp"
                :disabled="
                  pedidoTemp.length >= quantidadeParaSelecionar &&
                  pedidoTemp.indexOf(item) === -1
                "
              />
              <span class="checkmark"></span>
            </label>
            <label style="pointer-events: none" for="adicional">{{
              item.nome
            }}</label>
            <label id="preco"></label>
            <p id="itens"></p>
            <br />
          </div>
          <!---------------------------->
          <strong id="categoria">Frutas:</strong>
          <div v-for="(item, index) in frutas" :key="item">
            <label class="container-checkbox" id="textoPreco">
              <input
                type="checkbox"
                class="checkbox1"
                id="adicional"
                :value="item"
                v-model="pedidoTemp"
                :disabled="
                  pedidoTemp.length >= quantidadeParaSelecionar &&
                  pedidoTemp.indexOf(item) === -1
                "
              />
              <span class="checkmark"></span>
            </label>
            <label style="pointer-events: none" for="adicional">{{
              item.nome
            }}</label>
            <label id="preco"></label>
            <p id="itens"></p>
            <br />
          </div>
          <!---------------------------->
          <strong id="categoria">Acompanhamentos:</strong>
          <div v-for="(item, index) in acompanhamentos" :key="item">
            <label class="container-checkbox" id="textoPreco">
              <input
                type="checkbox"
                class="checkbox1"
                id="adicional"
                :value="item"
                v-model="pedidoTemp"
                :disabled="
                  pedidoTemp.length >= quantidadeParaSelecionar &&
                  pedidoTemp.indexOf(item) === -1
                "
              />
              <span class="checkmark"></span>
            </label>
            <label style="pointer-events: none" for="adicional">{{
              item.nome
            }}</label>
            <label id="preco"></label>
            <p id="itens"></p>
            <br />
          </div>
          <!---------------------------->
          <strong id="categoria">Coberturas:</strong>
          <div v-for="(item, index) in coberturas" :key="item">
            <label class="container-checkbox" id="textoPreco">
              <input
                type="checkbox"
                class="checkbox1"
                id="adicional"
                :value="item"
                v-model="pedidoTemp"
                :disabled="
                  pedidoTemp.length >= quantidadeParaSelecionar &&
                  pedidoTemp.indexOf(item) === -1
                "
              />
              <span class="checkmark"></span>
            </label>
            <label style="pointer-events: none" for="adicional">{{
              item.nome
            }}</label>
            <label id="preco"></label>
            <p id="itens"></p>
            <br />
          </div>
        </div>
      </div>

      <button @click="salvarPedido" id="butOpcoes" type="submit" value="Submit">
        adicionar
      </button>

      <button
        id="butOpcoes2"
        @click="limparDados()"
        type="submit"
        value="Submit"
      >
        voltar
      </button>
    </div>
  </div>
</template>

<style>
#tituloRadio {
  display: flex;
  align-items: center;
}

#tituloDoRadio {
  margin-left: 3px;
}

input[type="radio"] {
  margin-left: -3px;
  border: 0px;
  width: 30px;
  height: 2em;
  accent-color: #f27141;
}
</style>
