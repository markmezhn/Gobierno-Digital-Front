<template>
  <div class="white-skin mdb-admin-sidenav">
    <mdb-side-nav
      logo="https://michoacan.gob.mx/cdn/img/logos/dependencias/finanzas.svg"
      sideNavClass="sn-bg-4"
      mask="strong"
      :OpenedFromOutside.sync="toggle"
    >
      <li>
        <form class="search-form" role="search">
          <div class="form-group md-form mt-0 pt-1 ripple-parent" @click="wave">
            <!-- <input type="text" class="form-control" placeholder="Búsqueda" /> -->
          </div>
        </form>
      </li>
      <li>
        <mdb-side-nav-nav>
          <mdb-side-nav-cat name="Sistema" icon="tachometer-alt">
            <mdb-side-nav-item to="/home/users" @click.native="width < 1440 && toggleSideNav(false)">
              Usuarios 
            </mdb-side-nav-item>
            <mdb-side-nav-item to="/home/roles" @click.native="width < 1440 && toggleSideNav(false)">
              Roles 
            </mdb-side-nav-item> 
          </mdb-side-nav-cat>
        </mdb-side-nav-nav>
      </li>
    </mdb-side-nav>
  </div>
</template>

<script>
import {
  mdbSideNav,
  mdbSideNavNav,
  mdbSideNavCat,
  mdbSideNavItem,
  waves
} from "mdbvue";
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  name: "SideNav",
  props: {
    waves: {
      type: Boolean,
      default: true
    },
    open: {
      type: Boolean
    }
  },
  components: {
    mdbSideNav,
    mdbSideNavNav,
    mdbSideNavCat,
    mdbSideNavItem
  },
  data() {
    return {
      active: 0,
      elHeight: 0,
      windowHeight: 0,
      toggle: true,
      width: 0
    };
  },
  computed:{
    ...mapGetters(["sidenav"]),
    ...mapState({ role: state => state.auth.role }),
  }, 
  methods: {
    ...mapActions(["toggleSideNav", "logOut"]),
    afterEnter(el) {
      el.style.maxHeight = "1000px";
    },
    beforeLeave(el) {
      el.style.maxHeight = 0;
    },
    setWidth() {
      this.width = window.innerWidth;
    }
  },
  mounted() {
    this.setWidth();
    window.addEventListener("resize", this.setWidth);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.setWidth);
  },
  watch: {
    toggle(value) {
      this.toggleSideNav(value);
    },
    sidenav(value) {
      this.toggle = value;
    },
    width(value) {
      if (value < 1440) {
        this.toggle = false;
      } else this.toggle = true;
    }
  },
  mixins: [waves]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style>
.side-nav {
  opacity: 1 !important;
  transition: transform 0.3s linear !important;
}
</style>
