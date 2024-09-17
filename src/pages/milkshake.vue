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

    const pesoDoAcai = ref(menu.pesoDoMilkshake);
    const acais = ref([
      { nome: "Morango", id: 7, preco: 0.0, hash: "" },
      { nome: "Chocolate", id: 7, preco: 0.0, hash: "" },
      { nome: "Bombom", id: 7, preco: 0.0, hash: "" },
      { nome: "Delícia de Abacaxi", id: 7, preco: 0.0, hash: "" },
      { nome: "Brownie", id: 7, preco: 0.0, hash: "" },
      { nome: "Ouro Branco", id: 7, preco: 0.0, hash: "" },
    ]);
    const cremes = ref(menu.cremes);
    const frutas = ref(menu.frutas);
    const acompanhamentos = ref(menu.acompanhamentos);
    const coberturas = ref(menu.coberturasMilkShake);

    const quantidadeParaSelecionar = ref(0);

    const pedidoTemp = ref([]);
    const adicinalTemp = ref([]);

    const acaiEscolhido = ref("Escolha um");

    watch(acaiEscolhido, (novoValor, antigoValor) => {
      carrinho.pedidosParaSomar = acaiEscolhido.value;

      console.log(acaiEscolhido.value.nome);

      if (acaiEscolhido.value.nome == "Milk Shake 300ml") {
        quantidadeParaSelecionar.value = 4;
      }
      if (acaiEscolhido.value.nome == "Milk Shake 500ml") {
        quantidadeParaSelecionar.value = 4;
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
          <strong id="categoria">Sorvete:</strong>
          <p id="quantidadeDeItens">
            Escolha até
            <span id="quantidadeEscolhida">2</span>
            sorvetes
          </p>
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
          <strong id="categoria">Coberturas:</strong>
          <p id="quantidadeDeItens">
            Escolha até
            <span id="quantidadeEscolhida">2</span>
            coberturas
          </p>
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
