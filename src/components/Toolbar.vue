<template>
  <component :is="component" />
</template>

<script>
import { mapState } from 'vuex';
import ToolbarLegend from './ToolbarLegend';
import ToolbarAlert from './ToolbarAlert';
import ToolbarShip from './ToolbarShip';
import LegendShip from './LegendShip';
import LegendAlert from './LegendAlert';
import { modes } from '../store';

export default {
  name: 'Toolbar',
  components: {
    LegendShip,
    LegendAlert,
    ToolbarLegend,
    ToolbarAlert,
    ToolbarShip,
  },
  data: () => ({
    component: 'ToolbarLegend',
  }),
  computed: mapState({
    mode: state => state.mode,
  }),
  watch: {
    mode() {
      if (this.mode === modes.alertDetail) {
        this.component = 'ToolbarAlert';
        this.$forceUpdate();
      } else if (this.mode === modes.shipDetail) {
        this.component = 'ToolbarShip';
        this.$forceUpdate();
      } else {
        this.component = 'ToolbarLegend';
        this.$forceUpdate();
      }
    },
  },
};
</script>
