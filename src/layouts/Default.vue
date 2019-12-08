<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-white">
      <q-toolbar>
        <q-toolbar-title class="text-grey-8 text-family-bold">
          fala<span class="MontserratLight">.ai</span>
        </q-toolbar-title>

        <div>
          <q-avatar>
            <img src="https://avatars3.githubusercontent.com/u/9022134?s=100&v=4" alt="avatar">
          </q-avatar>
          <q-menu auto-close>
            <p class="text-grey-7 text-body2 MontserratLight q-ma-md">
              Loggado como
              <span class="text-family-bold text-underline">
                Igor Halfeld
              </span>
            </p>
          </q-menu>

        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      :width="500"
      :breakpoint="100"
      side="right"
      overlay
      bordered
      content-class="bg-grey-1"
    >
      <toolbar />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Toolbar from '../components/Toolbar';

export default {
  name: 'MyLayout',
  components: { Toolbar },
  data() {
    return {
      drawer: true,
    };
  },
};
</script>
