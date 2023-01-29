<!--Error isn't working-->
<template>
  <base-dialog v-bind:show="!!error" title="An error occurred"
    @close="handleError">
    <p>{{error }}</p>
  </base-dialog>
  <base-dialog :show="isLoading" title="Authenticating..." fixed>
    <base-spinner></base-spinner>
  </base-dialog>
  <div>
    <section :class="isActive ? 'active' : '' ">
      <div class="container" :class="isActive ? 'active' : ''">      
        <div class="user signinBx">
          <div class="imgBx"><img src="../../assets/auth_page/mafiaSingIn.jpg"></div>
          <div class="formBx">
          <form @submit.prevent="submitForm">
            <h2>Sign In</h2>
            <input type="email" placeholder="Email" v-model.trim="login.email">
            <div v-if="v$.login.email.$errors.length" >
              <p v-for="e in v$.login.email.$errors" :key="e.$uid" class="text-red-700">
                {{e.$message}}
              </p>
            </div>
            <input type="password" placeholder="Password" v-model.trim="login.password">
            <div v-if="v$.login.password.$errors.length" >
              <p v-for="e in v$.login.password.$errors" :key="e.$uid" class="text-red-700">
                {{e.$message}}
              </p>
            </div>
            <input type="submit" value="Login" required>
            <p class="signup">don't have an account?
              <router-link 
                :to="{name: 'auth', params: {type: 'signup'}}"
                @click="switchAuthMode"
                replace> 
                Sign up
              </router-link><br>
            <span class="text-black-800">Back to  <router-link to="/"><span class="text-red-800 text-base">Home</span> </router-link></span>            
            </p>
          </form>
        </div>
      </div>

      <div class="user signupBx">
        <div class="formBx">
          <form @submit.prevent="submitForm">
            <h2>Create an account </h2>
            <input type="text" placeholder="First Name" v-model="signup.firstName">
            <div v-if="v$.signup.firstName.$errors.length" >
              <p v-for="e in v$.signup.firstName.$errors" :key="e.$uid" class="text-red-700">
                {{"Please enter your first name"}}
              </p>
            </div>
            <!-- <p>{{v$.signup.firstName.$errors.length ? v$.signup.firstName.$errors : ''}}</p> -->
            <input type="text" placeholder="Last Name" v-model="signup.lastName">
            <div v-if="v$.signup.lastName.$errors.length" >
              <p v-for="e in v$.signup.lastName.$errors" :key="e.$uid" class="text-red-700">
                {{"Please enter your first name"}}
              </p>
            </div>
            <input type="text" placeholder="Username" v-model="signup.userName">
            <div v-if="v$.signup.userName.$errors.length" >
              <p v-for="e in v$.signup.userName.$errors" :key="e.$uid" class="text-red-700">
                {{"Please enter your first name"}}
              </p>
            </div>
            <input type="text" placeholder="Email Address" v-model="signup.email">
            <div v-if="v$.signup.email.$errors.length" >
              <p v-for="e in v$.signup.email.$errors" :key="e.$uid" class="text-red-700">
                {{e.$message}}
              </p>
            </div>
            <input type="password" placeholder="Create Password" v-model="signup.password">
            <div v-if="v$.signup.password.$errors.length" >
              <p v-for="e in v$.signup.password.$errors" :key="e.$uid" class="text-red-700">
                {{e.$message}}
              </p>
            </div>
            <input type="password" placeholder="Confirm Password" v-model="signup.password_confirmation">
            <div v-if="v$.signup.password_confirmation.$errors.length" >
              <p v-for="e in v$.signup.password_confirmation.$errors" :key="e.$uid" class="text-red-700">
                {{e.$message}}
              </p>
            </div>
            <input type="submit" value="Sign Up"
            required>
            <p class="signup">Already have an account?
              <router-link 
              :to="{name: 'auth', params: {type: 'signin'}}"
              @click="switchAuthMode" 
              replace> 
              Sign in
              </router-link><br>
            <span class="text-black-800">Back to  <router-link to="/"><span class="text-blue-800 text-base">Home</span> </router-link></span>              </p>
          </form>
        </div>
        <div class="imgBx"><img src="../../assets/auth_page/mafiaSignUp.jpg"></div>
      </div>
    </div>
  </section>
</div>
</template>


<script>
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, maxLength, sameAs } from '@vuelidate/validators'


export default {
props: ['type'],
    setup () {
        return { v$: useVuelidate() }
      },
    data() {
        return {
            isActive: null,
            formType: this.type,
            signup: {
              firstName:'',
              lastName:'',
              userName:'',
              email: '',
              password: '',
              password_confirmation: '',
            },
            login: {
              email: '',
              password: '',
            },
            isFormValid: true,
            mode:'login',
            isLoading: false,
            error: null
        };
    },
    validations(){
      return{
        signup: {
          firstName:{required, maxLength: maxLength(20)},
          lastName:{required, maxLength: maxLength(20)},
          userName:{required, maxLength: maxLength(40), minLength: minLength(5)},
          email:{required, email},
          password: {required,minLength: minLength(8)},
          password_confirmation: {required,minLength: minLength(8), sameAs : sameAs(this.signup.password)},
        },
        login: {
          email:{required, email},
          password: {required,minLength: minLength(8)},
        }
      }
    },
    computed: {
        bgImage() {
            //https://d2ofqe7l47306o.cloudfront.net/games/1920x1080/mafia-definitive-edition-city.jpg
            return `background-image: url("https://www.azutura.com/media/catalog/product/cache/47/image/650x/040ec09b1e35df139433887a97daa66f/W/S/WS-47352_WP.jpg");`;
        },
        bgColor() {
            return `background: #070707eb;`;
        }
    },
    methods: {
        //must be changed to computed prop
        async submitForm() {
          //FORM VALIDATIONS
          this.isFormValid = true;
          this.v$.$validate();
          
          //FOR LOGIN
          if(this.mode === 'login') {
            if(this.v$.login.$errors.length) {
              this.isFormValid = false;
                return;
              }else {
                // this.isFormValid = false;
                //alert("Succes!")
                this.isLoading = true;
                const guestItem = this.$store.getters.getGuestData;
                const id = guestItem['id'];
                const loginActionPayload = {
                  ...this.login,
                 //localStorage.get
                 guest_id: id
                };
                //console.log(signUpActionPayload);
                try {
                  this.$store.dispatch('login', loginActionPayload).then(() => {
                    localStorage.removeItem('guestToken');
                    if (this.$store.getters.getRoomId)
                      this.$router.replace({name: 'room', params: {id: this.$store.getters.getRoomId}});
                    else this.$router.replace('/rooms');
                    this.isLoading = false;
                  });
                } catch(e) {
                  this.error = e.message | 'Failed to login'
                  this.isLoading = false;
                  return
                }
              }

          //FOR SIGNUP
          } else {
            if(this.v$.signup.$errors.length) {
              this.isFormValid = false;
                // alert("Please submit a valid signup info")
                return;
              } else {
                // this.isFormValid = false;
                this.isLoading = true;
                const guestItem = this.$store.getters.getGuestData;
                const id = guestItem['id'];
                const signUpActionPayload = {
                  ...this.signup,
                 //localStorage.get
                 guest_id: id
                };
                //console.log(signUpActionPayload);
                try {
                  this.$store.dispatch('signUp', signUpActionPayload);
                  localStorage.removeItem('guestToken');
                } catch(e) {
                  this.error = e.message | 'Failed to login'
                  return
                }
                this.isLoading = false;
                this.$router.replace('/rooms');
              }
          }
          //---------------
        //   this.isLoading = true;
        //   const loginActionPayload = {
        //     email: this.email,
        //     password: this.password,
        //   };
        //   const signUpActionPayload = {
        //     email: this.email,
        //     password: this.password,
        //     userName: this.userName,
        //   };
        // try {
        //   if (this.mode === 'login') {
        //     await this.$store.dispatch('login',loginActionPayload)
        //   } else {
        //     await this.$store.dispatch('signup',signUpActionPayload);
        //   }
        // } catch (err) {
        //   this.error = err.message || 'Failed to authenticate.';
        //    //this.isLoading = false;
        //    //return
        // }
        // this.$router.replace('/');
        },
        handleError() {
            this.error = null;
          },
        switchAuthMode() {
          if (this.formType === 'signin') {
            //dom manipulation
            this.formType = 'signup', 
            this.isActive = true;
            this.mode = 'signup';
          } else {
            //dom manipulation
            this.formType = 'signin',
            this.isActive = false;
            this.mode = 'login';
          }
        },
        defineForm() {
          //this method is used to define auth mode from url
            if (this.formType === "signin") {
                this.isActive = false;
                this.mode = "login";
            }
            if (this.formType === "signup") {
                this.isActive = true;
                this.mode = "signup";
            }
        },
    },
    mounted() {
        this.defineForm();
    }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /*font-family: 'Poppins', sans-serif;*/
}

section {
  position: relative;
  min-height: 100vh;
  background-image: url("../../assets/auth_page/mafiaSingIn2.jpg");
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  transition: 0.5s; 
}
section.active {
  background: url(/src/assets/auth_page/mafiaSignUp2.jpg);
}
section .container {
  position: relative;
  width: 900px;
  height: 700px;
  background: #fff;
  box-shadow: 0 15px 50px rgba(0,0,0,0.1);
  overflow: hidden;
}
section .container .user{
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
}
section .container .user .imgBx{
  position: relative;
  width: 50%;
  height: 100%;
  transition: 0.5;
}
section .container .user .imgBx img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
section .container .user .formBx{
  position: relative;
  width: 50%;
  height: 100%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  transition: 00.5s;
}
section .container .user .formBx h2 {
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
  width: 100%;
  margin-bottom: 10px;
  color: #555;
}
section .container .user input {
  width: 100%;
  padding: 10px;
  background: #f5f5f5;
  color: #333;
  border: none;
  outline: none;
  box-shadow: none;
  font-size: 14px;
  margin: 8px 0;
  letter-spacing: 1px;
  font-weight: 300;
}
section .container .user .formBx input[type="submit"] {
  max-width: 100px;
  background: #677eff;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1px;
  transition: 0.5s;
}
section .container .user.signupBx .formBx input[type="submit"] {
  background: #e73e49;
}
section .container .user .formBx .signup {
  position: relative;
  margin-top: 20px;
  font-size: 12px;
  letter-spacing: 1px;
  color: #555;
  text-transform: uppercase;
  font-weight: 300;
}

section .container .user .formBx .signup a {
  font-weight: 600;
  text-decoration: none;
  color: #557eff;

}
section .container .signupBx {
  pointer-events: none;
}
section .container.active .signupBx {
  pointer-events: initial;
}

section .container .signupBx .formBx {
  top: 100%;
}
section .container.active .signupBx .formBx {
  top: 0;
}
section .container .signupBx .imgBx {
  top: -100%;
  transition: 0.5s;
}
section .container.active .signupBx .imgBx {
  top: 0;
}




section .container .signinBx {
  top: 0;
}
section .container.active .signinBx .formBx {
  top: 100%;
}
section .container .signinBx .imgBx {
  top: 0;
  transition: 0.5s;
}
section .container.active .signinBx .imgBx {
  top: -100%;
}


@media( max-width: 850px) {
  section .container {
    max-width: 400px;
  }
  section .container .imgBx {
    display: none;
  }
  section .container .user .formBx {
    width: 100%;
  }
  section .container.active .signinBx .formBx {
    top: -100%;
  }
}
</style>