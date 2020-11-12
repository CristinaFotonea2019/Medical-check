<template>
  <v-layout align-space-between justify-space-between column fill-height>
    <div class="back" :style="{'background-image':'url('+require('../assets/Contact.png')+')'}">
      <v-layout align-center justify-space-between row fill-height>
        <v-card :height="530" :width="400" class="registerCard" flat>
          <div>
            <h2>Register</h2>
          </div>
          <v-text-field
            :rules="nameRulesPatient"
            v-model="nameRegisterPatient" 
            class="reg justify-center"
            label="Enter Name"
          ></v-text-field> <!-- atribuim fiecarui field/camp/casuta = o variabila, un set de reguli descrise mai jos, o clasa si un text -->
          <v-text-field
          :rules="ageRulesPatient"
          v-model="ageRegisterPatient"
          class="reg justify-center"
            label="Enter Age"
            ></v-text-field>
              <v-text-field
              :rules="phoneRulesPatient"
          v-model="phoneRegisterPatient"
          class="reg justify-center"
            label="Enter Phone"
            ></v-text-field>
          <v-text-field
            v-model="mailRegisterPatient"
            :rules="mailRulesPatient"
            class="reg justify-center"
            label="Enter E-mail"
          ></v-text-field>
          <v-text-field
            v-model="passRegisterPatient"
            :rules="passRulesPatient"
            class="reg justify-center"
            label="Enter Password"
             :type="hiddenRegister ? 'text' : 'password'"
          ></v-text-field> <!-- ascundem parola-->
          <v-btn class="btnRegister" rounded color="primary" v-on:click="verifyRegisterData()">Register</v-btn> 
        </v-card>
        <div class="register">
          <h2>Welcome!</h2>
          <h3>Don't have an account? Create your account! It takes less than a minute.</h3>
        </div>
      </v-layout>
    </div>
    <v-dialog v-model="dialog" :max-width="350">
      <v-card class="popUp" :height="200"> 
        <h3>{{popUpText}}</h3>
        <v-btn class="btnOk" rounded color="primary" v-on:click="registerOk()">Ok</v-btn> <!-- Apare un pop-up in urma apasarii butonului de register cu un info despre register-->
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
/*eslint-disable*/
import axios from "axios";

export default {
  data() {
    return {
      nameRegisterPatient: "",
      ageRegisterPatient: "",
      phoneRegisterPatient:"", 
      mailRegisterPatient: "",
      passRegisterPatient: "", //Declarare variabile folosite pentru datele de register
      hiddenRegister: false,
      dialog: false,
      popUpText: "",
      nameRulesPatient: [
        v => !!v || "Name is required",
        v => v.length >= 3 || "Name must be at least 3 characters" //declarare reguli pentru a ne asigura ca nu primim date eronate/false/etc
      ], 
      ageRulesPatient:[
         v => !!v || "Age is required",
        v => v.length >= 2|| "Age must be 2-3 digits",
        v => v.length <= 3 || "Age must be 2-3 digits"
      ],
       phoneRulesPatient: [
        v => !!v || "Phone number is required",
        v => v.length >= 10 || "Phone number must be 10 digits",
        v => v.length < 11 || "Phone number must be 10 digits"
      ],
      mailRulesPatient: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      passRulesPatient: [
        v => !!v || "Password is required",
        v => v.length >= 8 || "Password must be at least 8 characters"
      ]
    };
  },
  // mounted() {
  //   (this.nameRegisterPatient = ""),
  //   (this.ageRegisterPatient = ""),
   //   (this.phoneRegisterPatient = ""),
  //     (this.mailRegisterPatient = ""),
  //     (this.passRegisterPatient = ""),
  // },
  // watch: {
  //   $route(to, from) {
  //   (this.nameRegisterPatient = ""),
  //   (this.ageRegisterPatient = ""),
   //   (this.phoneRegisterPatient = ""),
  //     (this.mailRegisterPatient = ""),
  //     (this.passRegisterPatient = ""),
  //   }
  // },
  methods: {
    verifyRegisterData() { //Functia de verificare ca regulile se respecta
      if (
        this.nameRegisterPatient.length < 4 || //Daca nu se respecta
        this.ageRegisterPatient.length < 2 ||
        this.ageRegisterPatient.length > 4 ||
        this.phoneRegisterPatient.length != 10 ||
        this.passRegisterPatient.length < 8 
      ) {
        this.dialog = !this.dialog; //Datele ssunt invalide
        this.popUpText = "Invalid data!";
      } else { //Daca se respecta formatul datelor
        axios
          .post("/api/registerPatient", { //se apeleaza API-ul destinat inregistrarii datelor in DB
            name: this.nameRegisterPatient, //Se atribuie variabilele din "front-end" unor variabile din back-end pentru a putea fi procesate mai departe
            age: this.ageRegisterPatient,
            phone:this.phoneRegisterPatient,
            mail: this.mailRegisterPatient,
            password: this.passRegisterPatient,
          })
          .then( //Daca primesc de la backend ca e totul ok atunci inregistrare cu succes
            response => {
              console.log(response);

              this.popUpText = "Registration complete!";
            },
            error => { //Altfel e eroare de server
              console.log(error);

              this.popUpText = "Server error!";
            }
          );
        this.dialog = !this.dialog;
      }
    },
    registerOk() {
      this.dialog = false; //variabila sa dispara pop-ul cu info despre register
    }
  }
};
</script>

<style>
.back {
  height: 100%;
  /* background-image: url(https://scontent.ftsr1-1.fna.fbcdn.net/v/t1.15752-9/69380368_483731745757002_388805131400904704_n.png?_nc_cat=111&_nc_oc=AQkZswsosTbTP_Q0IfRxjQCHUxlUzTe4-jBZw8bFKdddQlPscAgTZ9QsxGUVw8Mzmfl4pI5pTYs4e0eGQa0dbmdC&_nc_ht=scontent.ftsr1-1.fna&oh=4e4d5359e9ae02fde7320c0472301c18&oe=5E10210F); */
  background-size: cover;
}
.register {
  color: white;
  margin-right: 40px;
  font-size: 1rem;
  text-align: center;
  /* background-color: aqua; */
  width: 300px;
  height: 200px;
  text-shadow: 1px 5px 12px #000000;
}
.register h2 {
  font-size: 2rem;
  margin-bottom: 30px;
  text-shadow: 1px 5px 12px #000000;
  font-family: "Roboto", sans-serif;
  font-style: italic;
}
.registerCard {
  margin-left: 70px;
  margin-top: auto;
  margin-bottom: auto; 
}
.registerCard h2 {
  font-family: "Roboto", sans-serif;
  font-style: italic;
}
.btnRegister {
  margin-left: 250px;
  width: 150px;
}

.popUp h3 {
  font-family: "Roboto", sans-serif;

  text-align: center;
  padding: 60px;
  font-size: 1.4rem;
}
.btnOk {
  margin-left: 100px;
  width: 150px;
}
</style>