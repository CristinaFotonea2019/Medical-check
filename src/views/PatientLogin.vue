
<template>
  <v-layout align-space-between justify-space-between column fill-height> 
    <div class="backLog" :style="{'background-image':'url('+require('../assets/Contact.png')+')'}">
      <v-layout align-center justify-space-between row fill-height>
        <v-card :height="530" :width="400" class="loginCard" flat>
          <div>
            <h2>Login</h2>
          </div>
           <v-text-field
            :rules="mailRulesPatient"
            v-model="mailLoginPatient"
            class="log justify-center"
            label="Enter E-mail"
          ></v-text-field> 
          <v-text-field
            :rules="passRulesPatient"
            v-model="passLoginPatient"
            class="log justify-center"
            label="Enter Password"
            :type="hidden ? 'text' : 'password'"
          ></v-text-field>
          <v-btn class="btnLogin" rounded color="primary" v-on:click="verifyLoginData()">Login</v-btn>
        </v-card>
        <div class="login">
          <h2>Hello!</h2>
          <h3>Login to Your FAST Account.</h3>
        </div>
      </v-layout>
    </div>
    <v-dialog v-model="dialogLogIn" :max-width="350">
      <v-card class="popUp" :height="200">
        <h3>{{popUptxt}}</h3>
        <v-btn class="btnLog" rounded color="primary" v-on:click="LogInOk()">Ok</v-btn>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
/* eslint-disable*/
import { router } from "../router";
import axios from "axios";
import { setInterval } from "timers";
export default {
  data() {
    return {
      mailLoginPatient: "",
      passLoginPatient: "",
      hidden: false,
      dialogLogIn: false,
      popUptxt: "",
       mailRulesPatient: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      passRulesPatient: [
        v => !!v || "Password is required",
        v => v.length > 9 || "Password must be at least 8 characters"
      ]
    };
  },
  methods: {
    verifyLoginData() { 
      if (
        this.passLoginPatient.length < 8 
      ) {
        this.dialogLogIn = !this.dialogLogIn;
        this.popUptxt = "Invalid data!";
      } else {
        axios
          .post("/api/loginPatient", {
            server_mailPatient: this.mailLoginPatient,
            server_passwordPatient: this.passLoginPatient
          })
          .then(
            response => {
              if (typeof response.data === "object") {
                this.popUptxt = "Login successfully!";
                this.mailLoginPatient = null;
                this.passLoginPatient = null;

                localStorage.setItem(
                  "userDataPatient_name",
                  response.data.name 
                ); // save user data in browser till the browser is close
                localStorage.setItem("userDataPatient_age", response.data.age);
                localStorage.setItem(
                  "userDataPatient_password",
                  response.data.password
                );
                localStorage.setItem("userDataPatient_mail", response.data.mail);
                localStorage.setItem("userDataPatient_phone", response.data.phone);
                localStorage.setItem("Patient_Logged", "true");
                console.log(localStorage.getItem("userDataPatient_name"));
              } else {
                this.popUptxt = " Username or password invalid! ";
              }
            },
            error => {
              console.log(error);

              this.popUptxt = "Server error!";
            }
          );
        this.dialogLogIn = !this.dialogLogIn;
      }
    },
    LogInOk() {
      this.dialogLogIn = false;
      if (this.popUptxt == "Login successfully!") {
        console.log("Meeeeeeeeeeeeeeeeow"); //Mesaje numai pentru noi sa verificam se ajunge pe aici pentru debugging
        router.push("/Enroll");
      }
    },

    mounted() {
      (this.mailLoginPatient = ""), (this.passLoginPatient = "");
    },
    watch: {
      $route(to, from) {
        (this.mailLoginPatient = ""), (this.passLoginPatient = "");
      }
    }
  }
};
</script>
<style>
.backLog {
  height: 100%;
  /* background-image: url(https://scontent.ftsr1-1.fna.fbcdn.net/v/t1.15752-9/69380368_483731745757002_388805131400904704_n.png?_nc_cat=111&_nc_oc=AQkZswsosTbTP_Q0IfRxjQCHUxlUzTe4-jBZw8bFKdddQlPscAgTZ9QsxGUVw8Mzmfl4pI5pTYs4e0eGQa0dbmdC&_nc_ht=scontent.ftsr1-1.fna&oh=4e4d5359e9ae02fde7320c0472301c18&oe=5E10210F); */
  background-size: cover;
}
.login {
  color: white;
  margin-right: 30px;
  font-size: 1rem;
  text-align: center;
  /* background-color: aqua; */
  width: 300px;
  height: 200px;
  text-shadow: 1px 5px 12px #000000;
}
.login h2 {
  font-size: 2rem;
  margin-bottom: 30px;
  text-shadow: 1px 5px 12px #000000;
  font-family: "Roboto", sans-serif;
  font-style: italic;
}
.loginCard {
  margin-left: 70px;
  margin-top: auto;
  margin-bottom: auto; 
}
.loginCard h2 {
  font-family: "Roboto", sans-serif;
  font-style: italic;
}
.btnLogin {
  margin-left: 250px;
  width: 150px;
}
.btnLog {
  margin-left: 100px;
  width: 150px;
}
</style>