<template>
  <v-layout
    align-space-around
    justify-start
    column
    fill-height
    class="backSensors"
    :style="{'background-image':'url('+require('../assets/Sensors.png')+')'}"
  >
    <div class="header">
      <v-layout align-center >
        <h2 class="titleDashboard" > Dashboard</h2>
      </v-layout>
    </div>
   <!--    <div class="alignData">
      <v-list v-for="item in historyData" :key="item.name" class="listHistory">
        <v-list-tile>
       <v-list-tile-content class="listAlign" v-on:click="Details(item)">
            <v-spacer />
            <h2 id="carOwner">{{item.car_owner}}</h2>
            <v-spacer />
            <h2>{{item.car_nr}}</h2>
            <v-spacer />
            <h2>{{item.car_EmergencyPerson}}</h2>
            <v-spacer />
            <h2>{{item.car_date}}</h2>
          </v-list-tile-content>
        </v-list-tile> 
      </v-list>
    </div> -->
    <v-dialog v-model="dialogDetailsEvent" :max-width="350">
      <v-card class="carCrashDetails" :height="400">

        <h1>Person Details</h1>
        <!--<h2>Number: <b>{{carCrash_nr}} </b></h2>
        <h2> Owner: <b> {{carCrash_owner}}</b></h2>
        <h2>Impact sensor: <b>{{carCrash_crashSensor}}</b></h2>
        <h2> GPS: <b>{{carCrash_GPS}}</b></h2>
        <h2>Temperature sensor: <b>{{carCrash_temperatureSensor}}</b></h2>
        <h2> Fire sensor:<b> {{carCrash_fireSensor}}</b></h2>
        <h2> Emergency Person: <b>{{carCrash_EmergencyPerson}}</b></h2>
        <h2> Date: <b>{{carCrash_date}}</b></h2> --> 
        <!-- Aici o sa fie datele pe care le afiseaza din baza de date despre fiecare pacient-->
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
/* eslint-disable */
import { router } from "../router";
import axios from "axios";
import { setInterval } from "timers";
export default {
  data() {
    return {
      popUpUser: "",
      dialogHistory: false,
      usernameHistory: "",
      nameHistory: "",
      mailHistory: "",
      persIdHistory: "",
      detailsFlag: true,
      dialogDeleteEvent: false,
      deleteText: "",
      dialogDetailsEvent: false,
      carCrash_nr: "",
      carCrash_owner: "",
      carCrash_crashSensor: "",
      carCrash_GPS: "",
      carCrash_temperatureSensor: "",
      carCrash_fireSensor: "",
      carCrash_EmergencyPerson: "",
      carCrash_date: "",
      historyData: []
    };
  },
  methods: {
    UserBack() {
      localStorage.setItem("userData_name", "");
      localStorage.setItem("userData_mail", "");
      localStorage.setItem("userData_username", "");
      localStorage.setItem("userData_persId", "");
      localStorage.setItem("isLogged", "false");
      router.push("/Login");
    },
   
    Details(item) {
      console.log("Detalii aiciiiiiii");
      setTimeout(() => {
        if (this.dialogDeleteEvent == false) {
          this.carCrash_nr = item.car_nr;
          this.carCrash_owner = item.car_owner;
          this.carCrash_crashSensor = item.car_crashSensor;
          this.carCrash_GPS = item.car_GPS;
          this.carCrash_temperatureSensor = item.car_temperatureSensor;
          this.carCrash_fireSensor = item.car_fireSensor;
          this.carCrash_EmergencyPerson = item.car_EmergencyPerson;
          this.carCrash_date = item.car_date;
          this.dialogDetailsEvent = !this.dialogDetailsEvent;
        } else {
          
        }
      }, 100);

      console.log("Detalii");
    }
  },
  // mounted() {
  //   console.log("Mounted");
  //   setInterval(() => {
  //     axios.post("/api/getCrashEvents").then(
  //       response => {
  //         console.log(this.historyData.length + " " + response.data.length);
  //         console.log("de ce");
  //         if (this.historyData.length < response.data.length) {
  //           if (this.historyData.length == 0) {
  //             response.data.forEach(element => {
  //               console.log("Orice2");
  //               this.historyData.push(element);
  //             });
  //           } else {
  //             for (
  //               let index = this.historyData.length;
  //               index < response.data.length;
  //               index++
  //             ) {
  //               this.historyData.push(response.data[index]);
  //             }
  //           }
  //         }

  //         console.log(this.historyData);
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     );
  //   }, 1500);
  // },
  // watch: {
  //   $route(to, from) {
  //     console.log("Routed");
  //   }
  // }
};
</script>
<style>
.header {
  position: absolute;
  width: 100%;
  height: 60px;
  /* background-color: black; */
}
.titleDashboard {
  font-size: 2rem;
  font-weight: 400;
  font-family: "Roboto", sans-serif;
  font-style: italic;
  color: white;
 margin-left: 800px;
}
.image {
  width: 20px;
  height: 20px;
}
.imagebtn {
  width: 25px;
  height: 25px;
}
.btnUser {
  width: 30px !important;
  height: 50px !important;
  margin-right: 200px;
  font-size: 2rem !important;
  font-weight: 400;
  font-family: "Roboto", sans-serif;
}
.image {
  width: 60px;
  height: 60px;
  margin-left: 20px;
}
.popUpUser {
  width: 400px;
  height: 460px;
}
.popUpUser h3 {
  text-align: center;
  font-size: 1.8rem !important;
  font-weight: 400;
  font-family: "Roboto", sans-serif;
}
.popUpUser h2 {
  text-align: center;
  font-size: 1.8rem !important;
  font-weight: 400;
  padding: 30px;
  font-family: "Roboto", sans-serif;
}
.btnBack {
  /* margin-left: 40px; */
  align-self: center;
  width: 130px;
  margin-top: 15px;
}
.resizeHistory {
  width: 300px !important;
  text-align: center;
}
.alignData {
  height: 50px;
  width: 80%;
  margin-top: 80px;
  align-self: center;
  /* background-color: red !important; */
}
.listAlign {
  display: flex;
}
.listAlign h2 {
  margin-right: 40px !important;
  font-size: 1.2rem !important;
  font-weight: 400;
  line-height: 39px;
  text-align: left;
  width: 30%;
  height: 39px;
}
.listAlign #carOwner {
  width: 10% !important;
  margin-left: 20px;
}
.btnDelete {
  margin-left: 20px !important;
  color: white !important;
  background-color: brown !important;
}
.listHistory {
  background-color: rgba(245, 245, 245, 0.61) !important;
  margin-top: 10px;
}
.btnAlignRow {
  display: flex;
  align-items: center;
  justify-content: center;
}
.btnDeleteUser {
  margin-top: 15px;
  margin-left: 20px;
}
.btnDeleteOk{
  align-self: center;
  width: 130px;
  margin-top: 15px;
  margin-left: 110px;
}
.carCrashDetails h1{
font-size: 2rem;
  font-weight: 400;
  font-family: "Roboto", sans-serif;
  font-style: italic;
  text-align: center;
}
.carCrashDetails h2{
font-size: 1.2rem;
  font-weight: 300;
  font-family: "Roboto", sans-serif;
  font-style: italic;
  margin-left: 15px;
  margin-top: 10px;
}
</style>