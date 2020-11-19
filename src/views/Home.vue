<template>
  <v-layout align-space-between justify-space-between column fill-height>
    <div class="back" :style="{'background-image':'url('+require('../assets/Home.png')+')'}"> <!-- Aici o sa fie ceva background -->
      <v-layout align-space-between justify-space-between column fill-height>
        <div class="about">
          <h2>Medical Check</h2>
        </div>
     <div class="aboutText">
    <h2> Medical Check is a medical application that comes in help of doctors and patients. </h2>
     <h2> Patients can send medical data and then the doctors can monitor patient’s health without physically seeing them. </h2>

     <h2> The application can be used at any time by both the doctor and the patient in a easy way. In order to use it the patient needs to register.</h2>
      <h2> Once he is registered the patient will have to enroll to a doctor from the doctors </h2>
       <h2>list and send him data about his health through a form. </h2> 
 
     <h2> Depending on the symptoms described in the form by the patient, doctors can write and send</h2>
     <h2>  recommendations from the application directly to the patient e-mail.</h2>
  
     </div> 
      </v-layout>
    </div>
  </v-layout>
</template>


<script>
export default {};
</script>


<style>
.about {

  height: 60%;
  width: 100%;
    font-family: "Roboto", sans-serif;
  font-size: 1.5rem;
  font-weight: 100;
    text-shadow: 2px 2px 11px white, 2px 2px 11px white, 2px 2px 11px white;
  color: black;
   margin-top: 50px;
  margin-left: 50px;
}
.aboutText {
  margin-bottom: 500px;
  margin-left: 100px;  
  font-size: 0.9rem;
  font-weight: 100;
  text-shadow: 2px 2px 11px white, 2px 2px 11px white, 2px 2px 11px white;
  color: black;
  
}
.image{
 float:right;
 margin-right: 50px;
}
</style>