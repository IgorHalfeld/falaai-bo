<template>
  <div class="fit q-pa-md">
    <div class="row justify-end">
      <q-btn icon="close" flat size="sm" @click="() => setMode('LEGEND')"/>
    </div>
    <p class="text-h6 text-grey-7 text-family-bold q-mb-md">
      Ocorrência
    </p>

    <div class="row">
      <div class="q-mr-md">
        <img :src="types[currentShip.type]" width="40">
      </div>
      <div class="column">
        <p class="text-grey-8 text-family-bold q-ma-none">
          {{ currentShip.type }}
        </p>
        <p class="text-grey-6 q-ma-none">
          {{ currentShip.created_at | formatDate }}
        </p>
      </div>
    </div>

    <div class="row q-mt-xl">
      <p class="text-body1 text-grey-7">
        Classificações da imagem
      </p>
      <div>
        <q-chip
          size="13px"
          v-for="label in currentShip.labels"
          :key="label.description">
          <span class="text-family-bold">
            {{ label.description }}</span> : {{ ((label.score * 1) * 100).toFixed(0) }}%
        </q-chip>
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

    <div class="row q-mt-md q-pb-xl">
      <q-img :src="currentShip.image_url" width="100%" />
    </div>

    <div class="row q-pb-xl">
      <p class="text-body2 q-ma-none text-grey-9">
        {{ currentShip.description || 'Sem descrição' }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

const types = {
  'Incêndio ou explosão': '/statics/icones_dash00.png',
  'Vazamento químico': '/statics/icones_dash01.png',
  'Pessoa acidentada': '/statics/icones_dash02.png',
  'Poluição ambiental': '/statics/icones_dash03.png',
  'Desabamento estrutura': '/statics/icones_dash04.png',
  'Embarcação c/ problema': '/statics/icones_dash05.png',
};

export default {
  name: 'ToolbarShip',
  filters: {
    formatDate(value) {
      const date = new Date(value);
      const d = date.getDate();
      const m = date.getMonth();
      const y = date.getFullYear();

      const h = date.getHours();
      const ms = date.getMinutes();

      return `${d}/${m}/${y} ${h}:${ms}`;
    },
  },
  data: () => ({
    types,
  }),
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
