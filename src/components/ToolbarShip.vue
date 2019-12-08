<template>
  <div class="fit q-pa-md">
    <div class="row justify-end">
      <q-btn icon="close" flat size="sm" @click="() => setMode('LEGEND')"/>
    </div>
    <p class="text-h6 text-grey-7 text-family-bold q-mb-md">
      Navio
    </p>

    <div class="row">
      <div class="q-mr-md">
        <img :src="currentShip.pin" width="40">
      </div>
      <div class="column">
        <p class="text-grey-8 text-family-bold q-ma-none">
          {{ currentShip.ship_name }} - {{ currentShip.mmsi }} MMSI
        </p>
        <p class="text-grey-6 q-ma-none">
          Carga:
          <span class="text-family-bold">{{ currentShip.cargo || 'Containers cheios' }}</span>
        </p>
      </div>
    </div>

    <div class="col q-mt-xl">
      <p class="text-body1 text-grey-7 q-mb-md">
        Localização
      </p>
      <div class="row">
        <div class="col">
          <span class="text-h4 text-grey-8 text-family-bold">{{ currentShip.lat }}</span>
          <p class="text-h6 text-grey-8 q-ma-none">Latitude</p>
        </div>
        <div class="col">
          <span class="text-h4 text-grey-8 text-family-bold">{{ currentShip.lon }}</span>
          <p class="text-h6 text-grey-8 q-ma-none">Longitude</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ToolbarShip',
  computed: {
    ...mapState({
      currentShip: state => state.currentShip,
    }),
  },
  methods: {
    ...mapActions(['setMode']),
  },
};
</script>
