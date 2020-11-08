<template>
  <v-layout align-space-between justify-space-between column fill-height>
    <div class="back" :style="{'background-image':'url('+require('../assets/Sensors.png')+')'}">
      <v-layout align-space-between justify-space-between column fill-height>
        <div class="about">
          <h3>
            <b>About us!</b>
          </h3>
          <div class="aboutText">
            <h2>
              <b>FAST - Flexible Application Safe Travel</b> is a Mobile App for people that are
            </h2>
            <h2>driving for long hours with the purpose to alert the dispatcher in case of car crash.</h2>
            <h2>Drivers can also see the sensors state in real time.</h2>
            <h2>
              <b>FAST WebApp</b> is used by
            dispatcher to receive details and send help in case of car crash.</h2>
          </div>
        </div>
        <div class="logoAbout">
          <v-img src="@/assets/LogoHome.png" :height="180" :width="180" class="image"></v-img>
        </div>
      </v-layout>
    </div>
  </v-layout>
</template>
<script>
export default {};
</script>


<style>
.about {
  /* background-color: black; */
  height: 100% !important;
  width: 100% !important;
  margin-top: 20px;
  margin-left: 10px;
}
.about h2 {
  font-family: "Roboto", sans-serif;
  font-size: 1.5rem;
  font-weight: 100;
  text-shadow: 2px 2px 11px #000000, 2px 2px 11px #000000, 2px 2px 11px #000000;
  color: white;
}
.about h3 {
  font-family: "Roboto", sans-serif;
  font-size: 2.3rem;
  font-weight: 200;
  color: white;
  text-shadow: 2px 2px 11px #000000, 2px 2px 11px #000000, 2px 2px 11px #000000;
  margin-left: 20px;
}
.aboutText {
  margin-top: 50px;
  margin-left: 50px;
}
.logoAbout {
  /* background-color:rebeccapurple; */
  height: 30%;
  width: 100%;
}
</style>