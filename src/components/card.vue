<script setup>
const props = defineProps(["data"]);
</script>

<template>
  <router-link :to="data.url">
    <div class="container">
      <div class="grid">
        <article class="card">
          <img class="card__image" :src="data.img" />
          <div class="card__data">
            <div class="card__info">
              <h2>{{ data.nome }}</h2>
              <p>{{ data.descricao }}</p>
            </div>
            <h3 class="card__price"></h3>

            <button class="card__add">+</button>
          </div>
        </article>
      </div>
    </div>
  </router-link>
</template>

<style scoped>
h2,
h3,
p {
  margin: 0;
}

.container {
  max-width: 375px;
  margin: 0 auto;
}
.grid {
  display: grid;
  grid-template: 1fr / repeat(0, 1fr);
}
.card {
  position: relative;
  width: 160px;
  margin: 30px auto;
}
.card__image {
  position: absolute;
  width: 130%;
  left: -15%;
  right: 0;
  margin: 0 auto;
  top: -18%;
  z-index: 2;
  transition: all 0.3s ease-out;
  -webkit-filter: drop-shadow(5px 5px 5px #222);
  filter: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.3));
}
.card__data {
  border-top-right-radius: 50%;
  border-top-left-radius: 50%;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: #7b2456;
  padding-top: calc(100% * 1.18);
  transition: all 0.3s ease-out 0.1s;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.card__info {
  text-align: center;
  padding: 0 10px;
  margin-bottom: 10px;
}
.card__info h2 {
  font-size: 16px;
  font-family: Barlow-Black;
  font-weight: 800;
  color: #2efd00;
}
.card__info p {
  margin-top: 5px;
  font-family: Barlow-SemiBold;
  font-size: 12px;
  line-height: 14px;
  color: #ffffff;
}
.card__action {
  display: grid;
  grid-template: 30px / 1fr 35px;
}
.card__price {
  padding: 0 20px 0 30px;
  font-size: 14px;
  display: flex;
  align-items: center;
  font-weight: 800;

  font-family: Barlow-Black;
}
.card__add {
  width: 140px;
  height: 30px;
  background-color: #201726;
  border: none;
  color: #fff;
  border-top-left-radius: 15px;
  border-bottom-right-radius: 10px;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease-in;
  margin-bottom: 10px;
}

.card__image {
  -webkit-animation: spin 30s linear infinite;
  -moz-animation: spin 30s linear infinite;
  animation: spin 30s linear infinite;
}
@-moz-keyframes spin {
  100% {
    -moz-transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
