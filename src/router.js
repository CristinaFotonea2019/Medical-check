import Vue from 'vue'
import Router from 'vue-router'
import PacientRegister from './views/PacientRegister.vue'
import PacientLogin from './views/PacientLogin.vue'
import Home from './views/Home.vue'
import Enroll from './views/Enroll.vue'
import MedicalCheck from './views/MedicalCheck.vue'
import DoctorLogin from './views/DoctorLogin.vue'
import History from './views/History.vue'
import Recomandation from './views/Recomandation.vue'
// import axios from "axios"

Vue.use(Router)
/* eslint-disable */
export const router = new Router({
    mode: 'hash',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
          {
            name: "PacientRegister", //Ordinea in care sunt puse aici nu conteaza
            path: "/PacientRegister", // le-am pus in ordinea in care le-am asezat in diagrama, cum vin ele
            component: PacientRegister

          },
          {
            name: "PacientLogin",
            path: "/PacientLogin",
            component: PacientLogin
          },
          {
            name: "Enroll",
            path: "/Enroll",
            component: Enroll
          },
          {
            name: "MedicalCheck",
            path: "/MedicalCheck",
            component: MedicalCheck
          },
          {
            name: "History",
            path: "/History",
            component: History
          },
          {
            name: "DoctorLogin",
            path: "/DoctorLogin",
            component: DoctorLogin
          },
          {
            name: "Recomandation",
            path: "/Recomandation",
            component: Recomandation
          }
       
    ]

})
router.beforeEach((to, from, next) => {

    const publicPages = ['/', '/PacientRegister', '/History', '/DoctorLogin', '/PacientLogin', '/Recomandation', '/Enroll', '/MedicalCheck'];

})
