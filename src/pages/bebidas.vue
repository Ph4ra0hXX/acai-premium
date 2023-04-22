<script>
import { ref, watch } from "vue";
import { menuStore, carrinhoStore } from "../store/produtos";
import { useToast } from "vue-toastification";
import router from "../router/index";
export default {
  setup() {
    const toast = useToast();

    const carrinho = carrinhoStore();

    const menu = menuStore();

    const bebidas = ref(menu.bebida);

    function continuar() {
      router.push("/");
    }

    function notificacaoAdicionarPedido() {
      toast.success("Adicionado com sucesso!", {
        timeout: 2000,
        position: "top-right",
        icon: false,
        showCloseButtonOnHover: true,
      });
    }

    function notificacaoRemoverPedido() {
      toast.info("Removido com sucesso!", {
        timeout: 2000,
        position: "top-right",
        icon: false,
        showCloseButtonOnHover: true,
      });
    }

    return {
      notificacaoAdicionarPedido,
      notificacaoRemoverPedido,
      carrinho,
      continuar,
      bebidas,
    };
  },
};
</script>

<template>
  <div id="cardapio">
    <div id="listar">
      <div class="Categoria">
        <!---------------------------->
        <strong id="categoria">BEBIDAS:</strong>
        <div v-for="(item, index) in bebidas" :key="item">
          <label class="container-checkbox" id="textoPreco"> </label>

          <div id="container-title">
            <div id="title-price">
              <label
                id="title-nome"
                style="pointer-events: none"
                for="adicional"
                >{{ item.nome }}</label
              >
              <div class="quantity">
                <a
                  @click="
                    if (item.quantidade >= 1) {
                      item.quantidade--,
                        carrinho.atualizarValor(),
                        notificacaoRemoverPedido();
                    }
                  "
                  class="quantity__minus"
                  >-</a
                >
                <input
                  name="quantity"
                  type="text"
                  class="quantity__input"
                  v-model="item.quantidade"
                  disabled
                />
                <a
                  @click="
                    item.quantidade++,
                      carrinho.atualizarValor(),
                      notificacaoAdicionarPedido()
                  "
                  class="quantity__plus"
                  >+</a
                >
              </div>
            </div>
            <div class="quantity">
              <label id="preco">R$: {{ item.preco.toFixed(2) }}</label>
            </div>
          </div>
          <p id="itens">{{ item.descricao }}</p>

          <hr id="separador" />
        </div>
      </div>

      <button id="butOpcoes2" @click="continuar()" type="submit" value="Submit">
        continuar
      </button>
    </div>
  </div>
</template>
