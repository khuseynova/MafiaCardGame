<template>
<!---->
<my-header></my-header>
<!---->
    <div class="page">
        <section class="h-screen px-12 sm:px-24 flex items-center relative">
            <div class="grid grid-cols-12 gap-6 ">
                <div class="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-8 xxl:col-span-12">
                    <div class="w-full">
                        <h1 class="text-7xl sm:text-8xl lg:text-8xl xl:text-9xl text-white font-bold my-8">Welcome to <span class="text-red-800">Mafia</span></h1>
                    </div>
                </div>
            </div> 
        </section>
        </div>
</template>
<script>
export default {
  data() {
    return {
      hover: false,
    };
  }
}
</script>



<style scoped>
.page{
  background-image: url('/src/assets/landing_page/landingPageBG1.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
  /*background-color: black;*/
}



</style>