<script>
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { carrinhoStore, menuStore } from "../store/produtos";

import { useRouter } from "vue-router";

export default {
  setup() {
    const carrinho = carrinhoStore();
    const toast = useToast();
    const menu = menuStore();

    const router = useRouter();

    const pedidoMontado = ref("");

    const valorEntrega = ref(menu.valorEntrega);

    const apesoEscolhido = ref(0);

    function finalizarPedido() {
      // console.log(carrinho.pedidos);
      this.pedidoMontado = "";

      var numeroDoPedido = 1;

      this.pedidoMontado += `Açaí Premium\n\n`;
      this.pedidoMontado += `--------------------------\n\n`;

      for (var index in carrinho.pedidos) {
        this.pedidoMontado += ` N° - ${numeroDoPedido++}\n\n`;
        for (var item in carrinho.pedidos[index]) {
          //console.log(carrinho.pedidos[index][item]);
          this.pedidoMontado += ` • ${carrinho.pedidos[index][item].nome}\n\n`;
        }
        this.pedidoMontado += `--------------------------\n\n`;
      }

      const bebidas = menu.bebida;

      var BebidasTemp = [];

      for (var x = 0; x < bebidas.length; x++) {
        if (bebidas[x].quantidade > 0) {
          BebidasTemp.push(bebidas[x]);
        }
      }

      if (BebidasTemp.length > 0) {
        this.pedidoMontado += ` N° - ${numeroDoPedido++}\n\n`;
        for (let index in BebidasTemp) {
          this.pedidoMontado += ` • ${BebidasTemp[index].quantidade}x #${BebidasTemp[index].nome}\n\n`;
        }
        this.pedidoMontado += `--------------------------\n`;
      }

      this.pedidoMontado += `\n*Observações:*\n - ${this.carrinho.observacoes}\n`;

      if (this.carrinho.dadosPessoais.formaDeEntrega == "Vou buscar") {
        if (this.carrinho.dadosPessoais.nome != "") {
          this.pedidoMontado += `\n*Nome:*\n - ${this.carrinho.dadosPessoais.nome}\n`;
          this.pedidoMontado += `\n*Forma de entrega:*\n - ${this.carrinho.dadosPessoais.formaDeEntrega}\n`;
          this.pedidoMontado += `\n*Forma de Pagamento:*\n - ${this.carrinho.dadosPessoais.formaDePagamento}\n`;
          if (this.carrinho.dadosPessoais.formaDePagamento == "Dinheiro") {
            this.pedidoMontado += `\n*Troco para:*\n - ${this.carrinho.dadosPessoais.troco}\n`;
          }
          this.pedidoMontado += `\n--------------------------\n`;
          this.pedidoMontado += `\n*Total:* _${this.carrinho.getValorDosPedidos}_\n`;

          console.log(this.pedidoMontado);

          this.pedidoMontado = encodeURIComponent(this.pedidoMontado);

          carrinho.pedidos = [];

          router.push("/");

          window.location.href = `https://wa.me/5588997070747?text=${this.pedidoMontado}`;
        } else {
          toast.warning("✏️ Preencha todos os campos", {
            timeout: 2000,
            position: "top-right",
            icon: false,
            showCloseButtonOnHover: true,
          });
        }
      }

      if (this.carrinho.dadosPessoais.formaDeEntrega == "Quero entrega") {
        if (
          this.carrinho.dadosPessoais.nome != "" &&
          this.carrinho.dadosPessoais.rua != "" &&
          this.carrinho.dadosPessoais.bairro != "" &&
          this.carrinho.dadosPessoais.numero != "" &&
          this.carrinho.dadosPessoais.formaDePagamento != ""
        ) {
          this.pedidoMontado += `\n*Nome:*\n - ${this.carrinho.dadosPessoais.nome}\n`;
          this.pedidoMontado += `\n*Rua:*\n - ${this.carrinho.dadosPessoais.rua}\n`;
          this.pedidoMontado += `\n*Bairro:*\n - ${this.carrinho.dadosPessoais.bairro.nome}\n`;
          this.pedidoMontado += `\n*Número:*\n - ${this.carrinho.dadosPessoais.numero}\n`;
          this.pedidoMontado += `\n*Ponto de referência:*\n - ${this.carrinho.dadosPessoais.referencia}\n`;
          this.pedidoMontado += `\n*Forma de entrega:*\n - ${this.carrinho.dadosPessoais.formaDeEntrega}\n`;
          this.pedidoMontado += `\n*Forma de Pagamento:*\n - ${this.carrinho.dadosPessoais.formaDePagamento}\n`;
          if (this.carrinho.dadosPessoais.formaDePagamento == "Dinheiro") {
            this.pedidoMontado += `\n*Troco para:*\n - ${this.carrinho.dadosPessoais.troco}\n`;
          }
          this.pedidoMontado += `\n--------------------------\n`;
          this.pedidoMontado += `\n*Total:* _${(
            Number(this.carrinho.getValorDosPedidos) +
            Number(this.carrinho.dadosPessoais.bairro.preco)
          ).toFixed(2)}_\n`;

          console.log(this.pedidoMontado);

          this.pedidoMontado = encodeURIComponent(this.pedidoMontado);

          carrinho.pedidos = [];

          router.push("/");

          window.location.href = `https://wa.me/5588997070747?text=${this.pedidoMontado}`;
        } else {
          toast.warning("✏️ Preencha todos os campos", {
            timeout: 2000,
            position: "top-right",
            icon: false,
            showCloseButtonOnHover: true,
          });
        }
      }
    }

    return {
      carrinho,
      finalizarPedido,
      valorEntrega,
      apesoEscolhido,
    };
  },
};
</script>

<template>
  <div class="container">
    <div class="checkout-card">
      <div class="title">
        <p>
          <span>Como deseja receber</span> <br />
          seu pedido?
        </p>
      </div>
      <div class="payment-container">
        <div class="price-card">
          <input
            v-model="carrinho.dadosPessoais.formaDeEntrega"
            value="Vou buscar"
            type="radio"
            name="Vou buscar"
            id="Vou buscar"
          />
          <div class="content">
            Vou buscar
            <span>grátis</span>
          </div>
          <label for="Vou buscar"></label>
        </div>
        <div class="price-card">
          <input
            v-model="carrinho.dadosPessoais.formaDeEntrega"
            value="Quero entrega"
            name="Quero entrega"
            type="radio"
            id="Quero entrega"
          />
          <div class="content">
            Quero entega
            <span>taxa de entrega</span>
          </div>
          <label for="Quero entrega"></label>
        </div>
      </div>

      <div class="detail-info">
        <div v-if="carrinho.dadosPessoais.formaDeEntrega == 'Vou buscar'">
          <div class="info">
            <h3>Seu Nome:</h3>
          </div>
          <div class="input-field">
            <input
              v-model="carrinho.dadosPessoais.nome"
              type="text"
              id="card_number"
              placeholder=""
            />
          </div>
          <br />
        </div>

        <div v-if="carrinho.dadosPessoais.formaDeEntrega == 'Quero entrega'">
          <div class="info">
            <h3>Seu Nome:</h3>
          </div>
          <div class="input-field">
            <input
              v-model="carrinho.dadosPessoais.nome"
              type="text"
              id="card_number"
              placeholder=""
            />
          </div>
          <br />
          <div class="info">
            <h3>Rua:</h3>
          </div>
          <div class="input-field">
            <input
              v-model="carrinho.dadosPessoais.rua"
              type="text"
              id="card_number"
              placeholder=""
            />
          </div>
          <br />
          <div class="info">
            <h3>Bairro:</h3>
          </div>
          <select
            required
            v-model="carrinho.dadosPessoais.bairro"
            id="selectPeso"
          >
            <option selected value="Escolha um" disabled>
              Escolha uma opção
            </option>

            <option v-for="entrega in valorEntrega" :value="entrega">
              {{ entrega.nome }} - R$ {{ entrega.preco.toFixed(2) }}
            </option>
          </select>
          <br />
          <br />
          <div class="info">
            <h3>Número da Casa:</h3>
          </div>
          <div class="input-field">
            <input
              v-model="carrinho.dadosPessoais.numero"
              type="number"
              id="card_number"
              placeholder=""
            />
          </div>
          <br />
          <div class="info">
            <h3>Ponto de Referência:</h3>
          </div>
          <div class="input-field">
            <input
              v-model="carrinho.dadosPessoais.referencia"
              type="text"
              id="card_number"
              placeholder=""
            />
          </div>
          <br />
        </div>
        <div class="info">
          <h3>Formas de Pagamento:</h3>
        </div>
        <div class="payment-container">
          <div class="price-card">
            <input
              v-model="carrinho.dadosPessoais.formaDePagamento"
              value="Pix"
              name="price"
              type="radio"
              id="pix"
            />
            <div class="content">PIX</div>
            <label for="pix"></label>
          </div>
          <div class="price-card">
            <input
              v-model="carrinho.dadosPessoais.formaDePagamento"
              value="Cartão"
              name="price"
              type="radio"
              id="cartao"
            />
            <div class="content">Cartão</div>
            <label for="cartao"></label>
          </div>
          <div class="price-card">
            <input
              v-model="carrinho.dadosPessoais.formaDePagamento"
              value="Dinheiro"
              name="price"
              type="radio"
              id="dinheiro"
            />
            <div class="content">Dinheiro</div>
            <label for="dinheiro"></label>
          </div>
        </div>
        <br />
        <div
          v-if="carrinho.dadosPessoais.formaDePagamento == 'Dinheiro'"
          class="info"
        >
          <h3>Troco?</h3>
        </div>
        <div
          v-if="carrinho.dadosPessoais.formaDePagamento == 'Dinheiro'"
          class="input-field"
        >
          <input
            v-model="carrinho.dadosPessoais.troco"
            type="number"
            id="card_number"
            placeholder="troco para 50 reais"
          />
        </div>
        <p>
          Caso tenha escolhido entrega, o valor da taxa de entrega<br />
          sera informada pelo chat do whatsapp assim como a chave<br />
          PIX caso tenha escolhido essa forma de pagamento.
        </p>

        <button @click="finalizarPedido()" class="btn">finalizar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
#formaDePagamento {
  display: flex;
}
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 100%;
  font-family: Barlow-SemiBold;
}
.checkout-card {
  background: #fff;
  max-width: 450px;
  padding: 2rem;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.2);
  margin-left: 10px;
  margin-right: 10px;
}
.checkout-card .title span {
  color: #7b2456;
}
.checkout-card .title p {
  font-size: 1.3rem;
  font-family: Barlow-SemiBold;
  text-align: center;
  padding: 1rem;
}
.price-container {
  display: flex;
  gap: 0.95rem;
  justify-content: space-evenly;
}

.payment-container {
  display: flex;
  gap: 0.3rem;
  justify-content: space-evenly;
}
.price-card {
  position: relative;
  /*   border:1px solid #bcbcbc; */
  padding: 1rem;
  border-radius: 3px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  outline: none;
  transition: 0.3s ease-in;
}
.price-card label {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  border-radius: 3px;
  border: 1px solid #bcbcbc;
  cursor: pointer;
}
.price-card input[type="radio"]:checked ~ label {
  border: 1px solid #7b2456;
  background: #7b245523;
  color: #7b2456;
  outline: none;
  border-width: 2px;
}
.price-card input[type="radio"] {
  width: 30px;
  height: auto;
  border: 0;

  accent-color: #7b2456;
  transform: scale(1.5);
}
.price-card .content {
  display: flex;
  flex-direction: column;
}
.price-card .content span {
  font-size: 0.7rem;
  font-family: Barlow-SemiBold;
}
.detail-info {
  padding-top: 2rem;
}
.info {
  margin-bottom: 10px;
}
.info h3 {
  letter-spacing: 1px;
}
.info small {
  font-size: 0.74rem;
  font-family: Barlow-SemiBold;
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
  padding: 0.75rem;
  border-radius: 3px;
  width: 100%;
  border: 1px solid #9ea0a9;
}
.input-field input:focus {
  border: 1px solid #7b2456;
  outline: none;
}

.grid {
  display: flex;
  gap: 10px;
  margin-top: 0.5rem;
  justify-content: space-evenly;
}

.detail-info p {
  font-size: 0.7rem;
  font-family: Barlow-SemiBold;
  text-align: center;
  margin-top: 1.8rem;
}
.btn {
  font-size: 13px;
  margin-top: 0.7rem;
  width: 100%;
  padding: 1rem;
  letter-spacing: 0.8px;
  background: #7b2456;
  border: none;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}
.btn:hover {
  background: #af2172;
  letter-spacing: 1px;
  box-shadow: 1px 4px 8px rgba(242, 113, 65, 0.2);
}
</style>
