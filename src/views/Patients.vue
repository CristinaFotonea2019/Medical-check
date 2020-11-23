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
        <h2 class="textAlert">Patients List</h2>
        <v-btn class="btnUser" v-on:click="User()">
          <img class="imagebtn" src="@/assets/User.png" />
        </v-btn>
      </v-layout>
    </div>
    <div class="alignData">
          <v-btn class="btnDelete" rounded v-on:click="Recommendation()">Recommendation</v-btn>
      <v-list v-for="item in patientsData" :key="item.name" class="listHistory">
        <v-list-tile>
         <v-btn class="btnDelete" rounded v-on:click="HistoryPatient()">History</v-btn>
          <v-list-tile-content class="listAlign" v-on:click="DetailsPatient(item)">
            <v-spacer />
            <h2 >{{item.namePatientsList}}</h2>
            <v-spacer />
            <h2>{{item.patients_name}}</h2>
            <v-spacer />
            <h2>{{item.patients_age}}</h2>
            <v-spacer />
            <h2 id="patientPhone">{{item.patients_phone}}</h2>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </div>
    <v-dialog v-model="dialogHistory" :max-width="400">
      <v-card class="popUpUser">
        <h3>User info</h3>
        <center>
          <v-text-field v-model="nameDoctor" class="log justify-center resizeHistory" disabled></v-text-field>
          <v-text-field v-model="mailDoctor" class="log justify-center resizeHistory" disabled></v-text-field>
          <v-text-field v-model="persIDDoctor" class="log justify-center resizeHistory" disabled></v-text-field>
        </center>
        <div class="btnAlignRow">
          <v-btn class="btnBack" rounded color="primary" v-on:click="UserBack()">Sign out</v-btn>
          <v-btn class="btnDeleteUser" rounded color="primary" v-on:click="UserDelete()">Delete User</v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDeleteEvent" :max-width="350">
      <v-card class="popUpUser" :height="200">
        <h2>{{deleteText}}</h2>
        <v-btn class="btnDeleteOk" rounded color="primary" v-on:click="DeleteOk()">Ok</v-btn>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDetailsEvent" :max-width="350">
      <v-card class="carCrashDetails" :height="400">
        <h1>Details</h1>
        <h2>Nume: <b>{{namePatientsList}} </b></h2>
        <h2> Varsta: <b> {{agePatientsList}}</b></h2>
        <h2> Numar de telefon: <b>{{phonePatientsList}}</b></h2>
        <h2> Mail: <b>{{mailPatientsList}} </b></h2>
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
      nameDoctor: "",
      mailDoctor: "",
      persIDDoctor:"",

      mailPatientsList: "",
      namePatientsList: "",
      agePatientsList: "",
      phonePatientsList: "",
      
      detailsFlag: true,
      dialogDeleteEvent: false,
      deleteText: "",
      dialogDetailsEvent: false,
      
      patientsData: []
    };
  },
  methods: {
    User() {
      this.nameDoctor = localStorage.getItem("userDataDoc_name");
      this.mailDoctor = localStorage.getItem("userDataDoc_mail");
      this.persIDDoctor = localStorage.getItem("userDataDoc_persID");
      this.dialogHistory = !this.dialogHistory;
    },
    UserOk() {
      this.dialogHistory = false;
      if (this.popUpUser == "Inchide!") {
        console.log("Merge");
      }},

    UserBack() {
      localStorage.setItem("userDataDoc_name", "");
      localStorage.setItem("userDataDoc_mail", "");
      localStorage.setItem("userDataDoc_persID", "");
      localStorage.setItem("Doc_Logged", "false");
      router.push("/DoctorLogin");
    },
    HistoryPatient() {
      localStorage.setItem("Doc_Logged", "true");
      router.push("/History");
    },
    Recommendation() {
      localStorage.setItem("Doc_Logged", "true");
      router.push("/Recommendation");
    },
    DetailsPatient(item) {
      console.log("Detalii aiciiiiiii");
      setTimeout(() => {
        if (this.dialogDeleteEvent == false) {
          this.mailPatientsList = item.patients_mail;
          this.namePatientsList = item.patients_name;
          this.agePatientsList = item.patients_age;
          this.phonePatientsList = item.patients_phone;
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
      axios.post("/api/getPatientsList").then(
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