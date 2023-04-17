import Vue from 'vue'
import Router from 'vue-router'
import store from "@/store";

const Login = () => import('@/Login');
const Home = () => import('@/sections/Home');
const HomeScreen = () => import('@/sections/HomeScreen');
const User = () => import('@/sections/User');
const CreateUser = () => import('@/sections/user/Create');
const EditUser = () => import('@/sections/user/Edit');
const ChangePwd = () => import('@/sections/ChangePwd');

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      beforeEnter(to, from, next) {
          if(store.state.auth.authenticated) {
              next();
          } else {
              if(localStorage.getItem('access_token')){
                  let obj = {};
                  obj.access_token = localStorage.getItem('access_token');
                  obj.email = localStorage.getItem('username');
                  store.commit("setAuthenticated", obj);
                  next();
              } else {
                  next("/");
              }
          }
      },
      children: [
        {
          path: '/',
          name: 'Inicio',
          component: HomeScreen
        },
        { 
          path: '/home/users',
          name: 'Usuarios',
          component: User
        },
        {
          path: '/home/create-user',
          name: 'Crear Usuario',
          component: CreateUser
        },
        {
          path: '/home/edit-user/:id',
          name: 'Modificar Usuario',
          component: EditUser
        }
      ]
    },
    {
      path: '/change-password/:id',
      name: 'ChangePwd',
      component: ChangePwd
    }
  ]
})