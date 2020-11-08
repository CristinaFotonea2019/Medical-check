<template>
  <v-layout align-space-between justify-space-between column fill-height>
    <div
      class="background"
      :style="{'background-image':'url('+require('../assets/Contact.png')+')'}"
    >
      <v-layout align-center justify-space-between row fill-height>
        <div class="contactClss">
          <h2>Get in Touch</h2>
          <div class="contactText">
            <h3>Contact: Fotonea Cristina</h3>
            <h3>Phone: 0747266652</h3>
            <h3>E-mail: cristinafotonea@gmail.com</h3>
            <h3>Location: Martir Alexandru Ferkel Suteu</h3>
          </div>
        </div>
        <v-card :height="430" :width="300" class="send" elevation="15">
          <h2>SAY SOMETHING</h2>
          <v-text-field
            outlined
            :rules="rulesName"
            v-model="name"
            class="sendMsg justify-center"
            label="Name"
          ></v-text-field>
          <v-text-field
            outlined
            :rules="rulesMail"
            v-model="mail"
            class="sendMsg justify-center"
            label="E-mail"
          ></v-text-field>
          <v-textarea
            outlined
            v-model="mesaj"
            no-resize
            class="sendMsg justify-center"
            label="Message"
          ></v-textarea>
          <v-btn class="btnSend" rounded color="primary" v-on:click="sendmail()">SEND</v-btn>
        </v-card>
      </v-layout>
    </div>
    <v-dialog v-model="dialogContact" :max-width="350">
      <v-card class="popUp" :height="200">
        <h3>{{popUpTxt}}</h3>
        <v-btn class="btnok" rounded color="primary" v-on:click="sendOk()">Ok</v-btn>
      </v-card>
    </v-dialog>
  </v-layout>
</template>


<script>
/* eslint-disable*/
import axios from "axios";
import { router } from "../router";
export default {
  data() {
    return {
      name: "",
      mesaj: "",
      mail: "",
      dialogContact: false,
      popUpTxt: "",
      rulesMail: [
        v => !!v || "E-mail is required",
        v => v.length >= 3,
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      rulesName: [
        v => !!v || "Name is required",
        v => v.length >= 3 || "Name must be at least 3 characters"
      ]
    };
  },
  methods: {
    sendmail() {
      if (
        this.name.length < 3 ||
        this.mail.length < 8 ||
        this.mesaj.length < 8
      ) {
        this.dialogContact = !this.dialogContact;
        this.popUpTxt = "Invalid data!";
      } else {
        axios
          .post("/api/mailcontacts", {
            name: this.name,
            mesaj: this.mesaj,
            mail: this.mail
          })
          .then(
            response => {
              console.log(response);

              this.popUpTxt = "Mail sent!";
              this.name = null;
              this.mesaj = null;
              this.mail = null;
            },
            error => {
              console.log(error);

              this.popUpTxt = "Server error!";
            }
          );
        this.dialogContact = !this.dialogContact;
      }
    },
    sendOk() {
      this.dialogContact = false;
    }
  },
  mounted() {
    this.name = "";
    this.mail = "";
    this.mesaj = "";
  },
  watch: {
    $route(to, from) {
      this.name = "";
      this.mail = "";
      this.mesaj = "";
    }
  }
};
</script>


<style>
/* @import url("https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500&display=swap"); */
.background {
  height: 100%;
  /* background-image: url(https://scontent.ftsr1-1.fna.fbcdn.net/v/t1.15752-9/69380368_483731745757002_388805131400904704_n.png?_nc_cat=111&_nc_oc=AQkZswsosTbTP_Q0IfRxjQCHUxlUzTe4-jBZw8bFKdddQlPscAgTZ9QsxGUVw8Mzmfl4pI5pTYs4e0eGQa0dbmdC&_nc_ht=scontent.ftsr1-1.fna&oh=4e4d5359e9ae02fde7320c0472301c18&oe=5E10210F); */
  background-size: cover;
  /* background-color: rgb(122, 8, 8); */
}
.contactClss {
  height: 100%;
  margin-top: 30px;
  margin-left: 50px;
  /* color: white; */
}
.contactClss h2 {
  font-family: "Roboto", sans-serif;
  font-size: 3rem;
  font-style: italic;
  font-weight: 200;
}
.contactText {
  margin-top: 70px;
  margin-left: 20px;
}
.contactText h3 {
  text-align: center;
  font-family: "Roboto", sans-serif;
  font-size: 1.6rem;
  font-weight: 300;
}
.send {
  margin-right: 200px;
}
.sendMsg {
  width: 250px;
  margin: auto !important;
}
.send h2 {
  text-align: center;
  font-size: 1.4rem;
  margin-bottom: 10px;
  margin-top: 5px;
  font-family: "Roboto", sans-serif;
  /* font-style: italic; */
  font-weight: 300;
}
.btnSend {
  width: 200px;
  margin-left: 50px;
}
.btnok {
  margin-left: 100px;
  width: 150px;
}
</style>