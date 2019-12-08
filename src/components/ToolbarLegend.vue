<template>
  <div class="fit q-pa-md">
    <p class="text-h6 text-grey-7 text-family-bold q-mb-md">
      Informações gerais
    </p>

    <q-spinner
      v-if="isLoading"
      color="black"
      size="28" />

    <template v-else>
      <p class="text-body1 text-uppercase text-grey-7 text-family-light q-mb-md q-mt-xl">
        Navios
      </p>
      <legend-ship :info="ships" />

      <p class="text-body1 text-uppercase text-grey-7 text-family-light q-mb-md q-mt-xl">
        Ocorrências
      </p>
      <legend-alert :info="alerts"/>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import LegendShip from './LegendShip';
import LegendAlert from './LegendAlert';
// import PIN from '../utils/pin';

export default {
  name: 'Toolbar',
  components: { LegendShip, LegendAlert },
  data: () => ({
    isLoading: false,
    ships: {},
  }),
  computed: mapState({
    alerts: state => state.alerts,
  }),
  async mounted() {
    this.isLoading = true;
    const { data: response } = await this.$s.general.getTotalizers();
    this.ships = response;

    this.isLoading = false;
  },
};
</script>
