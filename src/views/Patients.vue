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
        <h2 class="textAlert">Patients List</h2>
        <v-btn class="btnUser" v-on:click="User()">
        </v-btn>
      </v-layout>
    </div>
    <div class="alignData">
      <v-list v-for="item in historyData" :key="item.name" class="listHistory">
        <v-list-tile>
          <v-list-tile-content class="listAlign" v-on:click="Details(item)">
            <v-spacer />
            <h2>{{item.namePatientsList}}</h2>
            <v-spacer />
            <h2>{{item.agePatientsList}}</h2>
            <v-spacer />
            <h2>{{item.phonePatientsList}}</h2>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </div>

    <v-dialog v-model="dialogHistory" :max-width="400">
      <v-card class="popUpUser">
        <h3>User info</h3>
        <center>
          <v-text-field v-model="namePatientsList" class="log justify-center resizeHistory" disabled></v-text-field>
          <v-text-field v-model="agePatientsList" class="log justify-center resizeHistory" disabled></v-text-field>
          <v-text-field v-model="phonePatientsList" class="log justify-center resizeHistory" disabled></v-text-field>
        </center>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDetailsEvent" :max-width="350">
      <v-card class="carCrashDetails" :height="400">
        <h1>Details</h1>
        <h2>Nume: <b>{{namePatientsList}} </b></h2>
        <h2> Varsta: <b> {{agePatientsList}}</b></h2>
        <h2> Numar de telefon: <b>{{phonePatientsList}}</b></h2>
      </v-card>
    </v-dialog>

        <!-- Aici o sa fie datele pe care le afiseaza din baza de date despre fiecare pacient-->
 
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
      namePatientsList: "",
      agePatientsList:"",
      phonePatientsList: "",
      detailsFlag: true,
      dialogDeleteEvent: false,
      deleteText: "",
      
      historyData: []
    };
  },
  methods: {
 User() {
      this.namePatientsList = localStorage.getItem("userData_name");
      this.agePatientsList = localStorage.getItem("userData_age");
      this.phonePatientsList = localStorage.getItem("userData_phone");
      this.dialogHistory = !this.dialogHistory;
    },
   
    Details(item) {
      console.log("Detalii aiciiiiiii");
      setTimeout(() => {
        if (this.dialogDeleteEvent == false) {
          this.namePatientsList = item.namePatientsList;
          this.agePatientsList=item.agePatientsList;
          this.phonePatientsList = item.phonePatientsList;
        } else {
          
        }
      }, 100);

      console.log("Detalii");
    }
  },
  mounted() {
    console.log("Mounted");
    setInterval(() => {
      axios.post("/api/getPatientsList").then(
        response => {
          console.log(this.historyData.length + " " + response.data.length);
          console.log("de ce");
          console.log(this.historyData);
          console.log(response.data);
          if (this.historyData.length < response.data.length) {
            console.log("if");
            if (this.historyData.length == 0) {
              response.data.forEach(element => {
                console.log("Orice2");
                this.historyData.push(element);
              });
            } else {
              console.log("Else");
              for (
                let index = this.historyData.length;
                index < response.data.length;
                index++
              ) {
                console.log("push");
                this.historyData.push(response.data[index]);
              }
            }
          }
          console.log("history");
          console.log(this.historyData);
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