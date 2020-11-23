<template>
  <v-layout align-space-between justify-space-between column fill-height>
    <div class="back" :style="{'background-image':'url('+require('../assets/Contact.png')+')'}"> <!-- Aici o sa fie ceva background -->
      <v-layout align-space-between justify-space-between column fill-height>
       <v-card :height="200" :width="700" class="enrollCard" flat>
        <div>
          <h2>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </h2>
           <h2> Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of </h2>
            <h2>type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into </h2>
            <h2>electronic typesetting, remaining essentially unchanged.</h2>
     <v-btn class="btnMedicalCheck" rounded color="primary" v-on:click="toMedicalCheck()">Doctor 1 </v-btn> 
        </div>
       </v-card>
        <v-card :height="200" :width="700" class="enrollCard" flat>
        <div>
           <h2>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </h2>
           <h2> Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of </h2>
            <h2>type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into </h2>
            <h2>electronic typesetting, remaining essentially unchanged.</h2>
     <v-btn class="btnMedicalCheck" rounded color="primary" v-on:click="toMedicalCheck()">Doctor 2</v-btn> 
        </div>
        </v-card>
      </v-layout>
    </div>
  </v-layout>
</template>


<script>
import { router } from "../router";
import axios from "axios";
import { setInterval } from "timers";
export default {
  data() {
    return {
     
     
    };
  },
  mounted() {

  },
  watch: {
  },
  methods: {
   toMedicalCheck(){
    // localStorage.setItem("Patient_Logged", "true");
    console.log("toMedicalCheck");
     router.push("/MedicalCheck");
  }
  }
};
</script>


<style>
.about {
  /* background-color: black; */
  height: 60%;
  width: 100%;
}
.btnRegister {
  margin-left: 250px;
  width: 150px;
}
.enrollCard{
  margin-left: 70px;
  margin-top: auto;
  margin-bottom: auto;
  font-size: 0.7rem;
}
</style>