<template>
  <div>
    <header class="fixed z-10 w-full bg-trasparent">
      <nav>
        <h1 class="text-xl font-light">
          <router-link to="/"
            ><img
              src="../../assets/join_room/roomLogo2.png"
              alt="logo"
              class="logo"
          /></router-link>
        </h1>
        <ul>
          <li class="text-xl font-light">
            <router-link to="/about" class="text-2xl">About</router-link>
          </li>
          <li class="text-xl font-light">
            <router-link to="/rooms" class="text-2xl">Game Rooms</router-link>
          </li>
          <li v-if="!isLoggedIn" class="text-xl font-light">
            <router-link :to="{ name: 'auth', params: { type: 'signin' } }" class="text-2xl">
              Login
            </router-link>
          </li>
          <li v-if="!isLoggedIn" class="text-xl font-light">
            <router-link :to="{ name: 'auth', params: { type: 'signup' } }" class="text-2xl">
              Create an Account
            </router-link>
          </li>
          <li v-if="isLoggedIn">
            <!-- you will see userName when you will login for the first time-->
            <p>Welcome Back {{ NickName }}</p>
          </li>
          <li v-if="isLoggedIn">
            <router-link to="/" @click="logout" replace>Logout</router-link>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    /*
    userName() {
      //console.log(this.userName);
      return this.$store.getters.userName;
    },
    */
   NickName() {
     return this.$store.getters.getNickName;
   }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/");
      //this.$router.go(-1);
    },
    check() {
      //console.log(this.$store.getters.getNickName);
    }
  },
  mounted() {
    //this.check()
    // console.log(this.$store.getters.getNickName);
  }

};
</script>

<style scoped>
header {
  width: 100%;
  height: 3rem;

  justify-content: center;
  align-items: center;
}

header a {
  text-decoration: none;
  color: #f5f2f1;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border-bottom: 2px solid #db2505;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-bottom: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
p {
  color: white;
}
.logo {
  
  width: 100px;
  height: 60px;
  
  
}
</style>
