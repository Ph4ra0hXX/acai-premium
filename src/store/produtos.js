import { defineStore } from "pinia";

export const carrinhoStore = defineStore("carrinho", {
  state: () => {
    return {
      pedidos: [],
      valorBebidas: 0,
      valorDosPedidos: 0,
      valorDaEntrega: 0,
      valorPedidosComQuantidade: 0,
      quandidadeDePedidos: 0,
      pedidosParaSomar: [],
      pedidosFormatados: [],
      observacoes: "",
      dadosPessoais: {
        nome: "",
        rua: "",
        bairro: [],
        numero: "",
        referencia: "",
        formaDeEntrega: "",
        formaDePagamento: "",
        troco: "",
      },
    };
  },
  actions: {
    salvarPedido(pedido) {
      function makeid(length) {
        let result = "";
        const characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
          counter += 1;
        }
        return result;
      }

      for (var x = 0; x < pedido.length; x++) {
        console.log((pedido[x].hash = makeid(8)));
      }

      this.pedidos.push(pedido);

      console.log(JSON.stringify(this.pedidos));
    },
    excluirItem(item) {
      for (var x = 0; x < this.pedidos.length; x++) {
        for (var y = 0; y < this.pedidos[x].length; y++) {
          if (this.pedidos[x][y].hash == item.hash) {
            const index = this.pedidos[x].indexOf(item);

            if (
              this.pedidos[x][y].id == 6 ||
              this.pedidos[x][y].id == 0 ||
              this.pedidos[x][y].id == 8 ||
              this.pedidos[x][y].id == 10
            ) {
              this.pedidos[x] = [];
              this.pedidos = this.pedidos.filter((e) => e.length);
            } else {
              this.pedidos[x].splice(index, 1);
              this.pedidos = this.pedidos.filter((e) => e.length);
            }
          }
        }
      }
    },
    atualizarValor() {
      const menu = menuStore();

      const bebidas = menu.bebida;

      this.valorBebidas = bebidas.reduce(
        (sum, { preco, quantidade }) => sum + preco * quantidade,
        0
      );
    },
  },
  getters: {
    getPedidos() {
      return this.pedidos;
    },
    getDadosPessoais() {
      return this.dadosPessoais;
    },
    getQuantidadeDePedidos() {
      const menu = menuStore();

      const bebidas = menu.bebida;

      const sum = bebidas.reduce((bebida, object) => {
        return bebida + object.quantidade;
      }, 0);

      return this.pedidos.length + sum;
    },
    getValorDosPedidos() {
      var juntos = this.pedidos.flat();

      let valorDosPedidosTemp = juntos.reduce(
        (sum, { preco }) => sum + preco,
        0
      );

      this.valorDosPedidos = valorDosPedidosTemp.toFixed(2);

      return (Number(this.valorDosPedidos) + this.valorBebidas).toFixed(2);
    },
  },
});

export const produtosStore = defineStore("produto", {
  state: () => {
    return {
      cardDataStore: [
        {
          id: 2,
          nome: "ACAÍ",
          img: "food2.webp",
          descricao: "Monte do seu jeito",
          url: "/acai",
        },
        {
          id: 3,
          nome: "SORVETE",
          img: "food3.webp",
          descricao: "Monte do seu jeito",
          url: "/sorvete",
        },
        {
          id: 6,
          nome: "VITAMINA DE AÇAÍ",
          img: "food6.webp",
          descricao: "Monte do seu jeito",
          url: "/vitamina",
        },
        {
          id: 4,
          nome: "MILKSHAKE",
          img: "food4.webp",
          descricao: "Refrescante",
          url: "/milkshake",
        },
        {
          id: 5,
          nome: "BEBIDAS",
          img: "food5.webp",
          descricao: "Geladas",
          url: "/bebida",
        },
      ],
    };
  },
});

export const menuStore = defineStore("menu", {
  state: () => {
    return {
      pesoVitaminas: [
        { nome: "Vitamina 300ml Tradicional", id: 11, preco: 12.0, hash: "" },
        { nome: "Vitamina 300ml Turbinada", id: 11, preco: 15.0, hash: "" },
        { nome: "Vitamina 500ml Tradicional", id: 11, preco: 14.0, hash: "" },
        { nome: "Vitamina 500ml Turbinada", id: 11, preco: 17.0, hash: "" },
      ],
      pesoDoMilkshake: [
        { nome: "Milk Shake 350ml", id: 8, preco: 12.0, hash: "" },
        { nome: "Milk Shake 600ml", id: 8, preco: 15.0, hash: "" },
      ],
      sorvete: [
        { nome: "Sorvete de Pavê", id: 7, preco: 0.0, hash: "" },
        { nome: "Sorvete de Morango", id: 7, preco: 0.0, hash: "" },
        { nome: "Sorvete de Bombom", id: 7, preco: 0.0, hash: "" },
        { nome: "Sorvete de Chocolate", id: 7, preco: 0.0, hash: "" },
        { nome: "Sorvete de Napolitano", id: 7, preco: 0.0, hash: "" },
        { nome: "Sorvete de Brawnie", id: 7, preco: 0.0, hash: "" },
        { nome: "Sorvete de Chokito", id: 7, preco: 0.0, hash: "" },
        { nome: "Sorvete de Flocos", id: 7, preco: 0.0, hash: "" },
        { nome: "Sorvete de Doce de Leite", id: 7, preco: 0.0, hash: "" },
        { nome: "Sorvete de Ouro Branco", id: 7, preco: 0.0, hash: "" },
        { nome: "Sorvete de Sonho de Valsa", id: 7, preco: 0.0, hash: "" },
        { nome: "Sorvete de Delícia Abacaxi", id: 7, preco: 0.0, hash: "" },
      ],
      sorveteCerto: [
        { nome: "Sorvete de Pavê", id: 9, preco: 0.0, hash: "" },
        { nome: "Sorvete de Morango", id: 9, preco: 0.0, hash: "" },
        { nome: "Sorvete de Bombom", id: 9, preco: 0.0, hash: "" },
        { nome: "Sorvete de Chocolate", id: 9, preco: 0.0, hash: "" },
        { nome: "Sorvete de Napolitano", id: 9, preco: 0.0, hash: "" },
        { nome: "Sorvete de Brawnie", id: 9, preco: 0.0, hash: "" },
        { nome: "Sorvete de Chokito", id: 9, preco: 0.0, hash: "" },
        { nome: "Sorvete de Flocos", id: 9, preco: 0.0, hash: "" },
        { nome: "Sorvete de Doce de Leite", id: 9, preco: 0.0, hash: "" },
        { nome: "Sorvete de Ouro Branco", id: 9, preco: 0.0, hash: "" },
        { nome: "Sorvete de Sonho de Valsa", id: 9, preco: 0.0, hash: "" },
        { nome: "Sorvete de Delícia Abacaxi", id: 9, preco: 0.0, hash: "" },
      ],
      pesoDoAcai: [
        { nome: "Açaí 100g", preco: 6.0,  id: 0, hash: "" },
        { nome: "Açaí 150g", preco: 7.0,  id: 0, hash: "" },
        { nome: "Açaí 200g", preco: 10.0, id: 0, hash: "" },
        { nome: "Açaí 250g", preco: 12.0, id: 0, hash: "" },
        { nome: "Açaí 300g", preco: 14.0, id: 0, hash: "" },
        { nome: "Açaí 350g", preco: 16.0, id: 0, hash: "" },
        { nome: "Açaí 400g", preco: 18.0, id: 0, hash: "" },
        { nome: "Açaí 450g", preco: 20.0, id: 0, hash: "" },
        { nome: "Açaí 500g", preco: 21.0, id: 0, hash: "" },
        { nome: "Açaí 550g", preco: 24.0, id: 0, hash: "" },
        { nome: "Açaí 600g", preco: 26.0, id: 0, hash: "" },
        { nome: "Açaí 650g", preco: 28.0, id: 0, hash: "" },
        { nome: "Açaí 700g", preco: 30.0, id: 0, hash: "" },
        { nome: "Açaí 750g", preco: 32.0, id: 0, hash: "" },
        { nome: "Açaí 800g", preco: 34.0, id: 0, hash: "" },
        { nome: "Açaí 850g", preco: 36.0, id: 0, hash: "" },
        { nome: "Açaí 900g", preco: 38.0, id: 0, hash: "" },
        { nome: "Açaí 950g", preco: 40.0, id: 0, hash: "" },
        { nome: "Açaí 1kg",  preco: 42.0, id: 0, hash: "" },
      ],
      pesoDoSorvete: [
        { nome: "Sorvete 100g", preco: 6.0,  id: 10, hash: "" },
        { nome: "Sorvete 150g", preco: 7.0,  id: 10, hash: "" },
        { nome: "Sorvete 200g", preco: 10.0, id: 10, hash: "" },
        { nome: "Sorvete 250g", preco: 12.0, id: 10, hash: "" },
        { nome: "Sorvete 300g", preco: 14.0, id: 10, hash: "" },
        { nome: "Sorvete 350g", preco: 16.0, id: 10, hash: "" },
        { nome: "Sorvete 400g", preco: 18.0, id: 10, hash: "" },
        { nome: "Sorvete 450g", preco: 20.0, id: 10, hash: "" },
        { nome: "Sorvete 500g", preco: 21.0, id: 10, hash: "" },
        { nome: "Sorvete 550g", preco: 24.0, id: 10, hash: "" },
        { nome: "Sorvete 600g", preco: 26.0, id: 10, hash: "" },
        { nome: "Sorvete 650g", preco: 28.0, id: 10, hash: "" },
        { nome: "Sorvete 700g", preco: 30.0, id: 10, hash: "" },
        { nome: "Sorvete 750g", preco: 32.0, id: 10, hash: "" },
        { nome: "Sorvete 800g", preco: 34.0, id: 10, hash: "" },
        { nome: "Sorvete 850g", preco: 36.0, id: 10, hash: "" },
        { nome: "Sorvete 900g", preco: 38.0, id: 10, hash: "" },
        { nome: "Sorvete 950g", preco: 40.0, id: 10, hash: "" },
        { nome: "Sorvete 1kg",  preco: 42.0,  id: 10, hash: "" },
      ],
      acais: [
        {
          nome: "Açaí light",
          id: 1,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Açaí tradicional",
          id: 1,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Açaí Mesclado com Banana",
          id: 1,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Açaí Mesclado com Morango",
          id: 1,
          preco: 0.0,
          hash: "",
        },
      ],
      cremes: [
        {
          nome: "Creme de Oreo",
          id: 2,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Creme de Ninho",
          id: 2,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Creme de Nutella",
          id: 2,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Creme de Cupuaçu",
          id: 2,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Creme de Ovomaltine",
          id: 2,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Creme de Tapioca",
          id: 2,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Creme de Castanha (Power)",
          id: 2,
          preco: 0.0,
          hash: "",
        },
      ],
      frutas: [
        {
          nome: "Uva",
          id: 3,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Kiwi",
          id: 3,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Manga",
          id: 3,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Banana",
          id: 3,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Abacaxi",
          id: 3,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Morango",
          id: 3,
          preco: 0.0,
          hash: "",
        },
      ],
      acompanhamentos: [
        {
          nome: "Bis",
          id: 4,
          preco: 1.0,
          hash: "",
        },
        {
          nome: "Granola",
          id: 4,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Leite Ninho",
          id: 4,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Amendoim",
          id: 4,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Castanha",
          id: 4,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Cereja",
          id: 4,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Jujuba",
          id: 4,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Disquete",
          id: 4,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Bombom",
          id: 4,
          preco: 1.0,
          hash: "",
        },
        {
          nome: "Chocoball",
          id: 4,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Granulado",
          id: 4,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Paçoquita",
          id: 4,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Ovomaltine",
          id: 4,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Bolacha Wafer",
          id: 4,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Gota de Chocolate",
          id: 4,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Farinha Láctea",
          id: 4,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Casquinha Quebrada",
          id: 4,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Sucrilhos",
          id: 4,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Batom Garoto",
          id: 4,
          preco: 1.5,
          hash: "",
        },
        {
          nome: "Mini Oreo",
          id: 4,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Coco Ralado",
          id: 4,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Marshmallow",
          id: 4,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Chocopower",
          id: 4,
          preco: 0.0,
          hash: "",
        },
      ],
      acompanhamentoVitaminas: [
        {
          nome: "Castanha",
          id: 12,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Amendoim",
          id: 12,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Granola",
          id: 12,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Paçoquita",
          id: 12,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Ovomaltine",
          id: 12,
          preco: 0.0,
          hash: "",
        },
      ],
      coberturaVitaminas: [
        {
          nome: "Cobertura de uva",
          id: 5,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Cobertura de mel",
          id: 5,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Cobertura de morango",
          id: 5,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Cobertura de chocolate",
          id: 5,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Cobertura de tutti-frutti",
          id: 5,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Cobertura de maracujá",
          id: 5,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Cobertura de doce de leite",
          id: 5,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Cobertura de frutas vermelhas",
          id: 5,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Cobertura de leite condensado",
          id: 5,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Cobertura de chocolate com menta",
          id: 5,
          preco: 0.0,
          hash: "",
        },
      ],
      coberturas: [
        {
          nome: "Cobertura de uva",
          id: 5,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Cobertura de mel",
          id: 5,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Cobertura de nutela",
          id: 5,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Cobertura de morango",
          id: 5,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Cobertura de chocolate",
          id: 5,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Cobertura de tutti-frutti",
          id: 5,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Cobertura de maracujá",
          id: 5,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Cobertura de calda mágica",
          id: 5,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Cobertura de doce de leite",
          id: 5,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Cobertura de frutas vermelhas",
          id: 5,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Cobertura de leite condensado",
          id: 5,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Cobertura de calda de cookies",
          id: 5,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Cobertura de chocolate com menta",
          id: 5,
          preco: 0.0,
          hash: "",
        },
      ],
      valorEntrega: [
        { nome: "Luiz alvez de Freitas", preco: 2.0 },
        { nome: "Conjunto estrada das flores", preco: 2.0 },
        { nome: "Bom nome", preco: 2.0 },
        { nome: "Santa Luiza", preco: 2.0 },
        { nome: "Populares ", preco: 3.0 },
        { nome: "Centro", preco: 2.0 },
        { nome: "Mon senhor otavio", preco: 2.0 },
        { nome: "Brotolandia", preco: 3.0 },
        { nome: "Pitombeira", preco: 3.0 },
        { nome: "Bom Jesus", preco: 4.0 },
        { nome: "Limoeirinho", preco: 3.0 },
        { nome: "Antonio Holanda", preco: 5.0 },
        { nome: "São Raimundo", preco: 3.0 },
        { nome: "Arraial", preco: 4.0 },
        { nome: "Arraial de Baixo", preco: 5.0 },
        { nome: "Boa fé (Antes do contorno)", preco: 2.0 },
        { nome: "Boa fé (Depois do contorno)", preco: 3.0 },
        { nome: "Socorro", preco: 4.0 },
        { nome: "Várzea do cobra", preco: 6.0 },
        { nome: "Morros", preco: 5.0 },
        { nome: "Conviver", preco: 4.0 },
        { nome: "Corrego de areia", preco: 5.0 },
        { nome: "Milagres", preco: 4.0 },
        { nome: "Bom fim (Vila Teteu)", preco: 4.0 },
        { nome: "Bom fim", preco: 5.0 },
        { nome: "Ilha", preco: 2.0 },
        { nome: "Ilha de Baixo", preco: 4.0 },
        { nome: "Canafistola", preco: 3.0 },
        { nome: "Habitar brasil", preco: 3.0 },
      ],
      coberturasMilkShake: [
        {
          nome: "Cobertura de uva",
          id: 5,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Cobertura de mel",
          id: 5,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Cobertura de morango",
          id: 5,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Cobertura de chocolate",
          id: 5,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Cobertura de tutti-frutti",
          id: 5,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Cobertura de maracujá",
          id: 5,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Cobertura de calda mágica",
          id: 5,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Cobertura de doce de leite",
          id: 5,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Cobertura de frutas vermelhas",
          id: 5,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Cobertura de leite condensado",
          id: 5,
          preco: 0.0,
          hash: "",
        },
        {
          nome: "Cobertura de chocolate com menta",
          id: 5,
          preco: 0.0,
          hash: "",
        },
      ],
      bebida: [
        {
          id: 6,
          quantidade: 0,
          nome: "Pó de Guaraná 350 ML",
          preco: 14.0,
        },
        {
          id: 6,
          quantidade: 0,
          nome: "Pó de Guaraná 600 ML",
          preco: 16.0,
        },
        {
          id: 6,
          quantidade: 0,
          nome: "ÁGUA SEM GÁS",
          preco: 2.0,
        },
        {
          id: 6,
          quantidade: 0,
          nome: "ÁGUA COM GÁS",
          preco: 2.5,
        },
      ],
    };
  },
});
