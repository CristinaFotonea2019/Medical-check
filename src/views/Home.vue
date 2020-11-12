<template>
  <v-layout align-space-between justify-space-between column fill-height>
    <div class="back" :style="{'background-image':'url('+require('../assets/Home.png')+')'}"> <!-- Aici o sa fie ceva background -->
      <v-layout align-space-between justify-space-between column fill-height>
        <div class="about">
     <!-- Aici o sa fie ceva text despre aplicatie -->
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
}
.image{
 float:right;
 margin-right: 50px;
}
</style>