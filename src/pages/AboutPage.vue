<template>
  <!-- component -->
  <my-header></my-header>
  <!---->
    <div class="About1 py-16 h-full">  
      <div class="About mt-5">
                <div class="grid grid-cols-12">
                <div class="col-span-11 bg-white bg-opacity-80 rounded-xl shadow-lg shadow-white">
                    <div class="txt inset-y-0 right-0 ">
                        <h2 class="text-red-800 font-medium text-2xl italic">Roles in the game:</h2>
                        <ol>                            
                            <li class="text-black font-light text-base" >1. The Narrator - keeps time rolling.<br> During the night,<br> when all players have their eyes closed, the narrator awakens each role and asks them a question about who they want to kill,save or know<br> During the day, when everyone is awake, the narrator prompts players to nominate.</li>
                            <li class="text-black font-light text-base" >2. The Mafia - must lie throughout the entire game<br> and act as though they are civilians</li>
                            <li class="text-black font-light text-base" >3. The Civilians are attempting <br>to figure out who is in the mafia simply by talking it out, <br>accusing, and seeing who is acting suspicious.</li>
                            <li class="text-black font-light text-base" >4. The Doctor is a civilian role that, at each nighttime phase,<br>can save a player he or she thinks the mafia has killed</li>
                            <li class="text-black font-light text-base" >5. The Detective is a civilian role that, at each nighttime phase,<br>can point to a player he or she thinks is in the mafia<br>and the narrator will nod their head yes or no. </li>
                        </ol>
                        <h2 class="text-red-800 font-medium text-xl italic">How to play</h2>
                        <p class="text-black font-light text-base">First Night: The narrator tells all players to close their eyes. “Mafia, wake up. <br>
                            See your fellow members,” she says. “Mafia, go to sleep.” In the first round, this is all that happens.
                            First Day: Everyone opens their eyes and the games begin. <br>
                            You must just start accusing people out of nowhere.  <br>
                            Once a nomination to kill is made,  <br>
                            someone must second it for the player to be seriously considered in the mafia.  <br>
                            If you have two solid nominations, all players then vote to kill, majority wins.  <br>
                            When a player is killed, they are no longer allowed to speak
                            and their identity is not revealed. <br>
                            Second Night: All players' eyes are closed <br>
                            and the narrator awakens the mafia and asks who they want to kill.  <br>
                            She then awakens the doctor for the first time and asks who they want to save.  <br>
                            And then, she awakens the detective and asks who they want to know about.  <br>
                            Third Day: The narrator awakens all players and someone has been killed,  <br>
                            The game continues in these phases, day and night, day and night,  <br>
                            until civilians kill all mafia members or mafia outnumber civilians.</p>
                    </div>
                </div>
            </div>
            </div>
    </div>
</template>

<script>
</script>

<style scoped>

.About{
  margin-left: 45%;
  margin-right: 0;
}

.About1{
  background-image: url("../assets/about/aboutPage1.jpg") ;
  background-size: cover;
  background-repeat: no-repeat;
  
}


.txt{
  margin: 20px;
}

/* section {
 /* background-color: black; */
 /*You will see strange white bars on top and bottom if you uncomment bg-color.Probably problem is in this component 
} */
</style>

