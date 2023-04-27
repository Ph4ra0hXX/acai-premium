<script>
import { ref, onUpdated, onMounted } from "vue";
import router from "../router/index";
import { useToast } from "vue-toastification";
import { carrinhoStore, menuStore } from "../store/produtos";

export default {
  setup() {
    const toast = useToast();

    const carrinho = carrinhoStore();

    const pedidos = ref([]);

    const menu = menuStore();

    var pedidosJuntos = menu.bebida;

    console.log(pedidosJuntos);

    onMounted(() => {
      pedidos.value = carrinho.getPedidos;
    });

    onUpdated(() => {
      pedidos.value = carrinho.getPedidos;
    });

    function mensagemDeRemover() {
      toast.success("✅ Item removido com sucesso!", {
        timeout: 2000,
        position: "top-right",
        icon: false,
        showCloseButtonOnHover: true,
      });
    }

    function checarSeCarrinhoNaoEstaVazio() {
      if (carrinho.getQuantidadeDePedidos > 0) {
        router.push("/entrega");
      } else {
        toast.warning("🛒 Carrinho vazio!", {
          timeout: 2000,
          position: "top-right",
          icon: false,
          showCloseButtonOnHover: true,
        });
      }
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
      pedidosJuntos,
      pedidos,
      carrinho,
      notificacaoAdicionarPedido,
      notificacaoRemoverPedido,
      checarSeCarrinhoNaoEstaVazio,
      mensagemDeRemover,
    };
  },
};
</script>

<template>
  <div class="paypal">
    <div class="paypal__subheader-wrapper">
      <div class="paypal__subheader">
        <h1 class="paypal__username">Olá 👋</h1>
        <span v-if="pedidos.length <= 1" class="paypal__help-text"
          >Você selecionou {{ carrinho.getQuantidadeDePedidos }} item!</span
        >
        <span v-if="pedidos.length > 1" class="paypal__help-text"
          >Você selecionou {{ carrinho.getQuantidadeDePedidos }} itens!</span
        >
      </div>
    </div>

    <div class="paypal__cart">
      <h2 class="paypal__cart-title">Carrinho:</h2>

      <ul class="paypal__cart-list">
        <div v-for="pedido in pedidos">
          <li class="paypal__cart-item">
            <div v-for="item in pedido">
              <br />
              <span
                v-if="item.id == 0 || item.id == 8 || item.id == 10"
                class="paypal__item-name"
                >{{ item.nome }}</span
              >

              <span
                v-if="item.id != 0 && item.id != 8 && item.id != 10"
                @click="carrinho.excluirItem(item), mensagemDeRemover()"
                class="paypal__item-descricao"
                >+ {{ item.nome }}</span
              >
              <span
                @click="carrinho.excluirItem(item), mensagemDeRemover()"
                id="botaoExcluir"
                class="paypal__item-price"
              >
                <button class="btn2">x</button></span
              >

              <span class="paypal__item-descricao">{{ item.descricao }}</span>
            </div>
            <br />
          </li>
        </div>

        <div v-for="pedido in pedidosJuntos">
          <div v-if="pedido.quantidade > 0">
            <li class="paypal__cart-item">
              <br />
              <span class="paypal__item-name">
                <span id="quantidadeDePedidos">x{{ pedido.quantidade }}</span>
                # {{ pedido.nome }}</span
              >
              <span class="paypal__item-price2">
                <button
                  @click="
                    if (pedido.quantidade >= 1) {
                      pedido.quantidade--,
                        carrinho.atualizarValor(),
                        notificacaoRemoverPedido();
                    }
                  "
                  class="btn2"
                >
                  -
                </button>
                <button
                  @click="
                    pedido.quantidade++,
                      carrinho.atualizarValor(),
                      notificacaoAdicionarPedido()
                  "
                  class="btn2"
                >
                  +
                </button></span
              >
              <br />
              <br />
              <span v-if="pedido.id == 2" class="paypal__item-descricao">{{
                pedido.descricao
              }}</span>
            </li>
          </div>
        </div>
        <br />
        <li v-if="carrinho.getValorDosPedidos > 0" class="paypal__cart-item">
          <br />
          <span class="paypal__cart-total">Total</span>
          <span class="paypal__item-price"
            >R$ {{ carrinho.getValorDosPedidos }}</span
          >
        </li>
      </ul>
      <br />
    </div>
    <div class="paypal__footer">
      <div class="detail-info">
        <div class="info">
          <h3>Observações:</h3>
        </div>
        <div class="input-field">
          <textarea
            v-model="carrinho.observacoes"
            type="text"
            id=""
            placeholder=""
          ></textarea>
        </div>
      </div>
      <button @click="checarSeCarrinhoNaoEstaVazio()" class="btn">
        confirmar
      </button>
    </div>
  </div>
</template>

<style scoped>
#quantidadeDePedidos {
  color: #7b2456;
  font-size: 22px;
}
.input-field {
  display: flex;
  flex-direction: column;
}
.input-field label {
  font-size: 0.7rem;
  font-family: Barlow-SemiBold;
  padding-bottom: 5px;
  font-weight: 500;
}
.input-field input {
  border-radius: 3px;
  width: 100%;
  border: 1px solid #9ea0a9;
}
.input-field input:focus {
  border: 1px solid #f27141;
  outline: none;
}
textarea {
  margin: 0px auto;
  width: 99%;
  height: 70px;
}

.detail-info p {
  font-size: 0.7rem;
  font-family: Barlow-SemiBold;
  text-align: center;
  margin-top: 1.8rem;
}

.info {
  font-size: 1rem;
  font-family: Barlow-SemiBold;
}

#botaoExcluir {
  display: block;
  padding: 12px 16px;
  margin-top: -12px;
  cursor: pointer;
}

#carrinhoVazio {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 200px;
}

.btn2 {
  width: 100%;
  padding-left: 1em;
  margin-left: 2px;
  margin-right: 2px;
  padding-right: 1em;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  background: #7b2456;
  border: none;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  font-family: Barlow-SemiBold;
}

.btn {
  margin-top: 0.7rem;
  width: 100%;
  padding: 1rem;
  letter-spacing: 0.8px;
  background: #2efd00;
  border: none;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  font-family: Barlow-SemiBold;
}
.btn:hover {
  background: #2ae401;
  letter-spacing: 1px;
  box-shadow: 1px 4px 8px rgba(242, 113, 65, 0.2);
}
.inspired-by {
  display: block;
  position: relative;
  margin-bottom: 15px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  font-family: Barlow-SemiBold;
}

.paypal {
  position: relative;
  left: 50%;
  display: inline-block;
  max-width: 100%;
  width: auto;
  max-width: 450px;
  min-width: 350px;
  padding: 0px 0;
  clear: both;
  -webkit-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  -o-transform: translateX(-50%);
  transform: translateX(-50%);
}

.paypal__header {
  display: flex;
  -ms-align-items: flex-start;
  align-items: flex-start;

  padding: 30px 30px 45px;
  background: #fbfbfb;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}

.paypal__logo-wrapper {
  flex: 1 0 40%;
}

.paypal__logo {
  display: block;
  width: 50px;
  height: auto;
  margin-left: 15px;
}

.paypal__header-info {
  flex: 1 0 50%;
}

.paypal__date,
.paypal__ref {
  display: block;
  font-size: 19px;
  color: #aaa;
  font-weight: 300;
}

.paypal__date {
  margin-bottom: 5px;
}

.paypal__subheader-wrapper {
  margin-left: 10px;
  margin-right: 10px;
  background: #fbfbfb;
  padding-bottom: 10px;
  padding-top: 50px;
}

.paypal__subheader {
  padding: 0 45px 0 40px;
  border-left: 5px solid #2efd00;
}

.paypal__username {
  margin: 0 0 10px 0;
  font-size: 22px;
  font-weight: 600;
  font-family: Barlow-SemiBold;
}

.paypal__help-text {
  color: #aaa;
  font-weight: 300;
  font-family: Barlow-SemiBold;
}

.paypal__cart {
  display: block;
  padding: 25px 10px 25px;
  margin-left: 10px;
  margin-right: 10px;
}

.paypal__cart-title {
  display: block;
  margin-top: 0;
  margin-bottom: 25px;
  text-align: center;
  font-family: Barlow-SemiBold;
}

.paypal__cart-list {
  margin: 0;
  padding: 0 10px;
  list-style: none;
  font-family: Barlow-SemiBold;
}

.paypal__cart-item {
  display: block;
  padding-top: 0px;
  margin-bottom: 20px;
  border-top: 2px dashed #aaa;
  font-size: 18px;
}

.paypal__cart-item:first-child {
  border-top: 0;
}

.paypal__cart-item:last-child {
  border-top: 2px solid #000;
  margin-bottom: 10px !important;
}

.paypal__index {
  padding-right: 15px;
  color: #aaa;
  font-weight: 300;
}

.paypal__item-descricao {
  color: #aaa;
  font-size: 15px;
}

.paypal__item-name {
  color: #201726;
  font-weight: 300;
}

.paypal__item-price2 {
  display: flex;
  flex-direction: row;
  float: right;
  letter-spacing: 1px;
}

.paypal__item-price {
  float: right;
  letter-spacing: 1px;
}

.paypal__cart-total {
  font-size: 20px;
  text-transform: uppercase;
}

.paypal__footer {
  position: relative;
  padding: 0px 20px 30px 20px;
  border-top: 2px dashed #201726;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  margin-left: 10px;
  margin-right: 10px;
}

/* .paypal__footer::before,
.paypal__footer::after {
  content: "";
  position: absolute;
  top: 0;
  border: 4px solid transparent;
  -webkit-transform: translateY(calc(-50% - 1px));
  -ms-transform: translateY(calc(-50% - 1px));
  -o-transform: translateY(calc(-50% - 1px));
  transform: translateY(calc(-50% - 1px));
} */
/*
.paypal__footer::before {
  left: 0;
  border-left: 7px solid #201726;
}

.paypal__footer::after {
  right: 0;
  border-right: 7px solid #201726;
} */

.paypal__barcode {
  display: block;
  margin: 0 auto;
  max-width: 300px;

  height: auto;
}

.paypal__cart {
  background-color: #fbfbfb;
}

.paypal__footer {
  background-color: #fbfbfb;
}
</style>
