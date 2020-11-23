import Vue from 'vue'
import Router from 'vue-router'
import PatientLogin from './views/PatientLogin.vue'
import Enroll from './views/Enroll.vue'
import Home from './views/Home.vue'
import DoctorLogin from './views/DoctorLogin.vue'
import PatientRegister from './views/PatientRegister.vue'
import History from './views/History.vue'
import Patients from './views/Patients.vue'
import MedicalCheck from './views/MedicalCheck.vue'
import Recommendation from './views/Recommendation.vue'
// import axios from "axios"

Vue.use(Router)
/* eslint-disable */
export const router = new Router({
    mode: 'hash',
    //Aici apar toate componentele(paginile) aplicatiei; Mai sus le importam 
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
            path: '/Patients',
            name: 'Patients',
            component: Patients
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
        },
        {
            path: '/Recommendation',
            name: 'Recommendation',
            component: Recommendation
        }

    ]

})
router.beforeEach((to, from, next) => {

    const publicPages = ['/', '/MedicalCheck', '/DoctorLogin', '/PatientLogin', '/PatientRegister', '/Patients', '/History','/Enroll','/Recommendation'];
    const patientPage =['/PatientLogin'];
    const doctorPage =['/DoctorLogin'];
    if(localStorage.getItem('Patient_Logged') == "false" && (to.fullPath == '/Enroll' || to.fullPath == '/MedicalCheck' )) 
    {
        return next('/PatientLogin');
    }
    // daca variabila Patient_Logged este false adica nu este pacientul logat si se vrea a accesa una din paginile de mai sus enumerate(pe care le poate vedea doar un pacient logat)
    // te redirectioneaza automat catre pagina de login a pacientului
    if(localStorage.getItem('Doc_Logged') == "false" && (to.fullPath == '/Patients' || to.fullPath =='/Recommendation'  ))
    {
        return next('/DoctorLogin');
    } //si aici exact acelasi lucru doar ca pentru medic
    if( localStorage.getItem('Doc_Logged') == "false" && localStorage.getItem('Patient_Logged') == "false"  && (to.fullPath == '/History'   ))
    {
        return next('/PatientLogin');
    }
    next();
   
}
)
