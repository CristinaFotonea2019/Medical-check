<template>
  <v-navigation-drawer permanent class="align">
    <h2 class="medical">Medical</h2>
    <v-divider></v-divider>
    <v-list v-for="item in route" :key="item.name" class="alignBtnMedical">
      <v-list-tile>
        <v-list-tile-content>
          <v-btn class="button" elevation="7" color="#bb0000" v-on:click="routeTo(item.path)">
            <v-list-tile-title class="title-menu">{{ item.name }}</v-list-tile-title>
          </v-btn>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>


<script>
/* eslint-disable */
import { router } from "../router";
export default {
  data() {
    return {
      route: [
        //vector de obiecte
        //Aici trebuie sa apara doar cele pe care le vrem in meniu; In router.js trebuie sa apara toate
        {
          name: "Home", //denumim paginile; am ales sa le dau un nume cat se poate de explicit
          path: "/" //denumim adresa de o sa apara in link ex "localhost blabla /Home"
        },
        {
          name: "Patient Register", //Ordinea in care sunt puse aici nu conteaza
          path: "/PatientRegister"// le-am pus in ordinea in care le-am asezat in diagrama, cum vin ele
        },
        {
          name: "Patient Login",
          path: "/PatientLogin"
        },
        {
          name: "Doctor Login",
          path: "/DoctorLogin"
        },
        {
          name: "Enroll",
          path: "/Enroll"
        },
        {
          name: "History",
          path: "/History"
        },
        {
          name:"Medical Check",
          path:"/MedicalCheck"
        },
        {
          name:"Patients",
          path:"/Patients"
        }
      ]
    };
  },
  methods: {
    routeTo(routename) {
      console.log("MNOOOOOOOOO");
      router.push(routename);
    }
  }
};
</script>

<style>
.title-menu {
  /* margin-left: 50px; */
  color: antiquewhite;
}
.align {
  width: 180px !important;
  /* align-content: center!important; */
  align-items: center !important;
}
.medical {
  width: 100%;
  text-align: center;
  color: brown;
  font-family: "Impact";
  font-size: 3rem;
}
.button {
  width: 100%;
}
.alignBtnMedical {
  margin-top: 10px;
}
</style>