<template>
  <v-layout align-space-between justify-space-between column fill-height>
    <div class="back" :style="{'background-image':'url('+require('../assets/Home.png')+')'}"> <!-- Aici o sa fie ceva background -->
      <v-layout align-space-between justify-space-between column fill-height>
        <div class="about"></div>
     <!-- Aici o sa fie ceva detalii despre medici --> 
        <div class="motto">
        </div>
      </v-layout>
    </div>
  </v-layout>
</template>


<script>
export default {
  //Nu pot sa scriu nimic fara back-end
  //O sa afiseze toate datele din baza de date 
};
</script>


<style>
.about {
  /* background-color: black; */
  height: 60%;
  width: 100%;
}
.logo {
  /* background-color:rebeccapurple; */
  height: 30%;
  width: 100%;

}
.image{
 float:right;
 margin-right: 50px;
}
.motto {
  /* background-color: green; */
  height: 10%;
  width: 100%;

  line-height: 60px;
}
.motto h3 {
  font-family: "Roboto", sans-serif;
  font-size: 2.8rem;
  font-weight: 100;
  color: white;
text-shadow: 2px 2px 11px #000000,2px 2px 11px #000000,2px 2px 11px #000000;
  text-align: center;
}
.motto2 {
  font-weight: 400;
}
</style>