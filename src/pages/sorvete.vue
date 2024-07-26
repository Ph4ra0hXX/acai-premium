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

    const pesoDoAcai = ref(menu.pesoDoSorvete);
    const acais = ref(menu.sorveteCerto);
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

      if (acaiEscolhido.value.nome == "Sorvete 100g") {
        quantidadeParaSelecionar.value = 4;
      }
      if (acaiEscolhido.value.nome == "Sorvete 150g") {
        quantidadeParaSelecionar.value = 5;
      }
      if (acaiEscolhido.value.nome == "Sorvete 200g") {
        quantidadeParaSelecionar.value = 6;
      }
      if (acaiEscolhido.value.nome == "Sorvete 250g") {
        quantidadeParaSelecionar.value = 8;
      }
      if (acaiEscolhido.value.nome == "Sorvete 300g") {
        quantidadeParaSelecionar.value = 8;
      }
      if (acaiEscolhido.value.nome == "Sorvete 350g") {
        quantidadeParaSelecionar.value = 10;
      }
      if (acaiEscolhido.value.nome == "Sorvete 400g") {
        quantidadeParaSelecionar.value = 10;
      }
      if (acaiEscolhido.value.nome == "Sorvete 450g") {
        quantidadeParaSelecionar.value = 10;
      }
      if (acaiEscolhido.value.nome == "Sorvete 500g") {
        quantidadeParaSelecionar.value = 999;
      }
      if (acaiEscolhido.value.nome == "Sorvete 550g") {
        quantidadeParaSelecionar.value = 999;
      }
      if (acaiEscolhido.value.nome == "Sorvete 600g") {
        quantidadeParaSelecionar.value = 999;
      }
      if (acaiEscolhido.value.nome == "Sorvete 650g") {
        quantidadeParaSelecionar.value = 999;
      }
      if (acaiEscolhido.value.nome == "Sorvete 700g") {
        quantidadeParaSelecionar.value = 999;
      }
      if (acaiEscolhido.value.nome == "Sorvete 750g") {
        quantidadeParaSelecionar.value = 999;
      }
      if (acaiEscolhido.value.nome == "Sorvete 800g") {
        quantidadeParaSelecionar.value = 999;
      }
      if (acaiEscolhido.value.nome == "Sorvete 850g") {
        quantidadeParaSelecionar.value = 999;
      }
      if (acaiEscolhido.value.nome == "Sorvete 900g") {
        quantidadeParaSelecionar.value = 999;
      }
      if (acaiEscolhido.value.nome == "Sorvete 950g") {
        quantidadeParaSelecionar.value = 999;
      }
      if (acaiEscolhido.value.nome == "Sorvete 1kg") {
        quantidadeParaSelecionar.value = 999;
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
          <div v-if="quantidadeParaSelecionar != 999">
            <p id="quantidadeDeItens">
              Monte seu sorvete com até
              <span id="quantidadeEscolhida">{{
                quantidadeParaSelecionar
              }}</span>
              itens
            </p>
          </div>
          <div v-else>
            <p id="quantidadeDeItens">
              Monte seu açaí
              <span id="quantidadeEscolhida">sem limite</span>
              de itens
            </p>
          </div>
          <strong id="categoria">Sorvete:</strong>
          <div v-for="(item, index) in acais" :key="item">
            <label class="container-checkbox" id="textoPreco">
              <input type="checkbox" class="checkbox1" id="adicional" :value="item" v-model="pedidoTemp" :disabled="pedidoTemp.length >= quantidadeParaSelecionar &&
                pedidoTemp.indexOf(item) === -1
                " />
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
              <input type="checkbox" class="checkbox1" id="adicional" :value="item" v-model="pedidoTemp" :disabled="pedidoTemp.length >= quantidadeParaSelecionar &&
                pedidoTemp.indexOf(item) === -1
                " />
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
              <input type="checkbox" class="checkbox1" id="adicional" :value="item" v-model="pedidoTemp" :disabled="pedidoTemp.length >= quantidadeParaSelecionar &&
                pedidoTemp.indexOf(item) === -1
                " />
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
              <input type="checkbox" class="checkbox1" id="adicional" :value="item" v-model="pedidoTemp" :disabled="pedidoTemp.length >= quantidadeParaSelecionar &&
                pedidoTemp.indexOf(item) === -1
                " />
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
              <input type="checkbox" class="checkbox1" id="adicional" :value="item" v-model="pedidoTemp" :disabled="pedidoTemp.length >= quantidadeParaSelecionar &&
                pedidoTemp.indexOf(item) === -1
                " />
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

      <button id="butOpcoes2" @click="limparDados()" type="submit" value="Submit">
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
