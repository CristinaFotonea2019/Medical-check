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
      <v-layout align-center justify-space-between row fill-height>
        <img class="image" src="@/assets/LogoHome.png" />
        <h2 class="textAlert">History</h2>
      </v-layout>
    </div>
    <div class="alignData">
      <v-list v-for="item in patientsData" :key="item.name" class="listHistory">
        <v-list-tile>
          <v-list-tile-content class="listAlign" v-on:click="DetailsPatient(item)">
            <v-spacer />
            <h2>{{item.history_name}}</h2>
            <v-spacer />
            <h2>{{item.history_age}}</h2>
            <v-spacer />
            <h2 id="patientPhone">{{item.history_phone}}</h2>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </div>
    <v-dialog v-model="dialogDetailsEvent" :max-width="350">
      <v-card class="carCrashDetails" :height="400">
        <h1>Details</h1>
        <h2>Nume: <b>{{nameHistory}} </b></h2>
        <h2> Varsta: <b> {{ageHistory}}</b></h2>
        <h2> Numar de telefon: <b>{{phoneHistory}}</b></h2>
        <h2> Pulse: <b>{{pulseHistory}} </b></h2>
        <h2>Saturation Oxygen:<b>{{saturationHistory}}</b></h2>
        <h2>Diseases:<b>{{diseasesHistory}}</b></h2>
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
      dialogHistory: false,
      nameHistory: "",
      ageHistory: "",
      phoneHistory: "",
      pulseHistory: "",
      saturationHistory:"",
      diseasesHistory:"",
      
      detailsFlag: true,
      dialogDetailsEvent: false,
      dialogDeleteEvent: false,
      patientsData: []
    };
  },
  methods: {
    DetailsPatient(item) {
      console.log("Detalii aiciiiiiii");
      setTimeout(() => {
        if (this.dialogDeleteEvent == false) {
          this.nameHistory = item.history_name;
          this.ageHistory = item.history_age;
          this.phoneHistory = item.history_phone;
          this.pulseHistory = item.history_pulse;
          this.saturationHistory = item.history_oxygen;
          this.diseasesHistory = item.history_diseases;
          this.dialogDetailsEvent = !this.dialogDetailsEvent;
        } else {
          //S-a apasat pe Delete
        }
      }, 100);

      console.log("Detalii");
    }
  },
  mounted() {
    console.log("Mounted");
    setInterval(() => {
      axios.post("/api/getHistoryPatient").then(
        response => {
          console.log(this.patientsData.length + " " + response.data.length);
          console.log("de ce");
          if (this.patientsData.length < response.data.length) {
            if (this.patientsData.length == 0) {
              response.data.forEach(element => {
                console.log("Orice2");
                this.patientsData.push(element);
              });
            } else {
              for (
                let index = this.patientsData.length;
                index < response.data.length;
                index++
              ) {
                this.patientsData.push(response.data[index]);
              }
            }
          }

          console.log(this.patientsData);
        },
        error => {
          console.log(error);
        }
      );
    }, 1500);
  },
  watch: {
    $route(to, from) {
      console.log("Routed");
    }
  }
};
</script>
<style>
.header {
  position: absolute;
  width: 100%;
  height: 60px;
  /* background-color: black; */
}
.textAlert {
  font-size: 2rem;
  font-weight: 400;
  font-family: "Roboto", sans-serif;
  font-style: italic;
  color: white;
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