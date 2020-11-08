import Vue from 'vue'
import Router from 'vue-router'
import PatientLogin from './views/PatientLogin.vue'
import Enroll from './views/Enroll.vue'
import Home from './views/Home.vue'
import DoctorLogin from './views/DoctorLogin.vue'
import PatientRegister from './views/PatientRegister.vue'
import History from './views/History.vue'
import Recomandation from './views/Recomandation.vue'
import MedicalCheck from './views/MedicalCheck.vue'
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
            name: "MedicalCheck",
            path: "/MedicalCheck",
            component: MedicalCheck
          },
        {
            name: "DoctorLogin",
            path: "/DoctorLogin",
            component: DoctorLogin
        },
        {
            path: '/PatientLogin',
            name: 'PatientLogin',
            component: PatientLogin
        },
        {
            path: '/PatientRegister',
            name: 'PatientRegister',
            component: PatientRegister
        },
        {
            path: '/Recomandation',
            name: 'Recomandation',
            component: Recomandation
        },
        {
            path: '/History',
            name: 'History',
            component: History
        },
        {
            path: '/Enroll',
            name: 'Enroll',
            component: Enroll
        }
    ]

})
router.beforeEach((to, from, next) => {

    const publicPages = ['/', '/Login', '/Register', '/Mobile', '/Sensors', '/Contact'];
    const logPage =['/Login'];
    if(localStorage.getItem('isLogged') == "false" && to.fullPath == '/History' )
    {
        return next('/Login');
    }
    next();
   
}
)
