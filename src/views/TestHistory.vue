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
        <h2 class="textAlert">Alert Dashboard</h2>
        <v-btn class="btnUser" v-on:click="User()">
          <img class="imagebtn" src="@/assets/User.png" />
        </v-btn>
      </v-layout>
    </div>
    <div class="alignData">
      <v-list v-for="item in historyData" :key="item.name" class="listHistory">
        <v-list-tile>
          <v-list-tile-content class="listAlign" v-on:click="Details(item)">
            <v-btn class="btnDelete" rounded v-on:click="DeleteCar(item.idcar)">X</v-btn>
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
    </div>

    <v-dialog v-model="dialogHistory" :max-width="400">
      <v-card class="popUpUser">
        <h3>User info</h3>
        <center>
          <v-text-field v-model="usernameHistory" class="log justify-center resizeHistory" disabled></v-text-field>
          <v-text-field v-model="nameHistory" class="log justify-center resizeHistory" disabled></v-text-field>
          <v-text-field v-model="mailHistory" class="log justify-center resizeHistory" disabled></v-text-field>
          <v-text-field v-model="persIdHistory" class="log justify-center resizeHistory" disabled></v-text-field>
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

        <h1>Car Crash Details</h1>
        <h2>Number: <b>{{carCrash_nr}} </b></h2>
        <h2> Owner: <b> {{carCrash_owner}}</b></h2>
        <h2>Impact sensor: <b>{{carCrash_crashSensor}}</b></h2>
        <h2> GPS: <b>{{carCrash_GPS}}</b></h2>
        <h2>Temperature sensor: <b>{{carCrash_temperatureSensor}}</b></h2>
        <h2> Fire sensor:<b> {{carCrash_fireSensor}}</b></h2>
        <h2> Emergency Person: <b>{{carCrash_EmergencyPerson}}</b></h2>
        <h2> Date: <b>{{carCrash_date}}</b></h2>
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
    User() {
      this.nameHistory = localStorage.getItem("userData_name");
      this.mailHistory = localStorage.getItem("userData_mail");
      this.usernameHistory = localStorage.getItem("userData_username");
      this.persIdHistory = localStorage.getItem("userData_persId");
      this.dialogHistory = !this.dialogHistory;
    },
    // UserOk() {
    //   this.dialogHistory = false;
    //   if (this.popUpUser == "Inchide!") {
    //     console.log("Merge");
    //   }

    UserBack() {
      localStorage.setItem("userData_name", "");
      localStorage.setItem("userData_mail", "");
      localStorage.setItem("userData_username", "");
      localStorage.setItem("userData_persId", "");
      localStorage.setItem("isLogged", "false");
      router.push("/Login");
    },
    UserDelete() {
      axios
        .post("/api/deleteUser", {
          persId: localStorage.getItem("userData_persId")
        })
        .then(response => {
          localStorage.setItem("userData_name", "");
          localStorage.setItem("userData_mail", "");
          localStorage.setItem("userData_username", "");
          localStorage.setItem("userData_persId", "");
          localStorage.setItem("isLogged", "false");
          router.push("/Login");
        });
    },
    DeleteCar(idcar) {
      this.detailsFlag = true;
      console.log("Delete");
      axios
        .post("/api/deleteCarEvents", {
          idcar: idcar
        })
        .then(response => {
          this.deleteText = "Delete successfully!";
        });
      this.historyData.forEach(element => {
        if (element.idcar == idcar) {
          console.log(this.historyData.indexOf(element));
          this.historyData.splice(this.historyData.indexOf(element), 1);
        }
      });
      this.dialogDeleteEvent = !this.dialogDeleteEvent;
    },
    DeleteOk() {
      this.dialogDeleteEvent = false;
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
          //S-a apasat pe Delete
        }
      }, 100);

      console.log("Detalii");
    }
  },
  mounted() {
    console.log("Mounted");
    setInterval(() => {
      axios.post("/api/getCrashEvents").then(
        response => {
          console.log(this.historyData.length + " " + response.data.length);
          console.log("de ce");
          if (this.historyData.length < response.data.length) {
            if (this.historyData.length == 0) {
              response.data.forEach(element => {
                console.log("Orice2");
                this.historyData.push(element);
              });
            } else {
              for (
                let index = this.historyData.length;
                index < response.data.length;
                index++
              ) {
                this.historyData.push(response.data[index]);
              }
            }
          }

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