<template>
  <q-page class="fit">
    <gmap-map
      :center="{ lat: -23.9535596, lng: -46.2819004 }"
      :zoom="14"
      :options="{
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUi: false
      }"
      :style="{
        width: '100%',
        height: height
      }"
    >
      <!-- alert -->
      <gmap-circle
        v-for="(alert, index) in alerts"
        :key="`alert-circle-${index}`"
        :center="alert.coords"
        :radius="400"
        @click="() => checkAlert(alert)"
        :options="{
          strokeColor: 'red',
          opacity: 0.6,
          fillColor: 'red'
        }"
      />
      <gmap-marker
        v-for="(alert, index) in alerts"
        :key="`alert-marker-${index}`"
        @click="() => checkAlert(alert)"
        :icon="{
          url: types[alert.type],
          scaledSize: { width: 40, height: 40 }
        }"
        :position="alert.coords"
        :clickable="true"
      />
      <gmap-marker
        v-for="(marker, index) in markersParsed"
        :key="`marker-${index}`"
        @click="() => checkInfo(marker)"
        :icon="{
          url: marker.pin,
          scaledSize: { width: 40, height: 40 }
        }"
        :position="marker.coords"
        :clickable="true"
      />

      <gmap-polygon
        v-for="(terminal, index) in terminals"
        :key="`polygon-${index}`"
        @click="showTerminalDesc(terminal)"
        :options="{
          fillColor: 'purple',
          fillOpacity: 0.6,
          strokeColor: 'purple'
        }"
        :path="terminal.pos" />
    </gmap-map>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex';
import { getDistanceFromLatLon } from '../utils/helpers';
import { parseFirebaseResponse } from '../boot/fb';
import terminals from '../utils/terminals';
import PIN from '../utils/pin';

let ships = [];

const types = {
  'Incêndio ou explosão': '/statics/icones_dash00.png',
  'Vazamento químico': '/statics/icones_dash01.png',
  'Pessoa acidentada': '/statics/icones_dash02.png',
  'Poluição ambiental': '/statics/icones_dash03.png',
  'Desabamento estrutura': '/statics/icones_dash04.png',
  'Embarcação c/ problema': '/statics/icones_dash05.png',
};

export default {
  name: 'PageIndex',
  data() {
    return {
      terminals: terminals.map(terminal => terminal),
      types,
      markers: [],
      alerts: [],
      height: `${window.innerHeight - 50}px`,
    };
  },
  computed: {
    markersParsed() {
      if (!this.markers.length) return [];
      if (!this.alerts.length) return [];

      const markers = this.markers.map(item => ({ ...item, priority: 0 }));

      this.alerts.forEach((alert) => {
        for (let i = 0; i < markers.length; i += 1) {
          const currentMarker = markers[i];
          const distance = Number(getDistanceFromLatLon(
            currentMarker.coords.lat,
            currentMarker.coords.lng,
            Number(alert.lat),
            Number(alert.lon),
          ).toFixed(0));

          if (distance < 300) {
            markers[i] = {
              ...currentMarker,
              pin: PIN.RED,
            };
            markers[i].priority = 1;
          }

          if (distance <= 400 && distance >= 300
            && (markers[i].priority === 0 || markers[i].priority > 2)) {
            markers[i] = {
              ...currentMarker,
              pin: PIN.YELLOW,
            };
            markers[i].priority = 2;
          }

          if (distance > 400 && (markers[i].priority === 0 || markers[i].priority === 3)) {
            markers[i] = {
              ...currentMarker,
              pin: PIN.GREEN,
            };
            markers[i].priority = 3;
          }
        }
      });

      return markers;
    },
  },
  async mounted() {
    this.$q.loading.show();
    await this.fetchShips();

    const [
      alertRef,
      shipRef,
    ] = await Promise.all([
      this.$fb.database().ref('alerts'),
      this.$fb.database().ref('ships'),
    ]);

    const handleResponse = (result) => {
      const alerts = parseFirebaseResponse(result);
      this.alerts = alerts.map(alert => ({
        ...alert,
        coords: {
          lat: Number(alert.lat),
          lng: Number(alert.lon),
        },
      }));
      this.setAlerts(alerts);
      this.$q.loading.hide();
    };

    alertRef.on('child_moved', handleResponse);
    alertRef.on('child_added', handleResponse);
    alertRef.on('child_removed', handleResponse);
    alertRef.on('child_changed', handleResponse);
    alertRef.on('value', handleResponse);


    shipRef.on('value', (result) => {
      ships = parseFirebaseResponse(result);
      this.$q.loading.hide();
    });
    setInterval(this.fetchShips, 5000);
  },
  methods: {
    ...mapActions(['setAlerts', 'setMode', 'setCurrentShip']),
    showTerminalDesc(terminal) {
      this.$q.notify(terminal.name);
    },
    async fetchShips() {
      const { data: response } = await this.$s.ships.getShips();
      this.markers = response.map(marker => ({
        ...marker,
        pin: PIN.GREEN,
        priority: 0,
        coords: {
          lat: Number(marker.lat),
          lng: Number(marker.lon),
        },
      }));
      this.$forceUpdate();
    },
    checkAlert(alert) {
      this.setMode('ALERT_DETAIL');
      this.setCurrentShip(alert);
    },
    checkInfo(marker) {
      const found = ships.find(
        ({ ship }) => ship === marker.ship_name,
      );

      this.setMode('SHIP_DETAIL');
      this.setCurrentShip({
        ...found,
        ...marker,
      });
    },
  },
};
</script>
