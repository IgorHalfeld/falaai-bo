<template>
  <ul style="list-style: none" class="q-pa-none">
    <li class="flex items-center text-grey-7 q-my-sm text-body1">
      <img
        src="/statics/icones_dash05.png"
        class="q-mr-md q-my-xs"
        :style="{
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          transform: 'scale(1.2, 1.2)'
        }"
      />
      <span class="text-h5 text-family-bold text-grey-9" style="width: 50px">
        {{ count['embarcacao-c-problema'] }}
      </span>
      Embarcação com problema
    </li>
    <li class="flex items-center text-grey-7 q-my-sm text-body1">
      <img
        src="/statics/icones_dash00.png"
        class="q-mr-md q-my-xs"
        :style="{
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          transform: 'scale(1.2, 1.2)'
        }"
      />
      <span class="text-h5 text-family-bold text-grey-9" style="width: 50px">
        {{ count['incendio-ou-explosao'] }}
      </span>
      Navios no porto público
    </li>
    <li class="flex items-center text-grey-7 q-my-sm text-body1">
      <img
        src="/statics/icones_dash03.png"
        class="q-mr-md q-my-xs"
        :style="{
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          transform: 'scale(1.2, 1.2)'
        }"
      />
      <span class="text-h5 text-family-bold text-grey-9" style="width: 50px">
        {{ count['poluicao-ambiental'] }}
      </span>
      Poluição ambiental
    </li>
    <li class="flex items-center text-grey-7 q-my-sm text-body1">
      <img
        src="/statics/icones_dash04.png"
        class="q-mr-md q-my-xs"
        :style="{
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          transform: 'scale(1.2, 1.2)'
        }"
      />
      <span class="text-h5 text-family-bold text-grey-9" style="width: 50px">
        {{ count['desabamento-estrutura'] }}
      </span>
      Desabamento de estrutura
    </li>
    <li class="flex items-center text-grey-7 q-my-sm text-body1">
      <img
        src="/statics/icones_dash01.png"
        class="q-mr-md q-my-xs"
        :style="{
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          transform: 'scale(1.2, 1.2)'
        }"
      />
      <span class="text-h5 text-family-bold text-grey-9" style="width: 50px">
        {{ count['vazamento-quimico'] }}
      </span>
      Vazamento químico
    </li>
    <li class="flex items-center text-grey-7 q-my-sm text-body1">
      <img
        src="/statics/icones_dash02.png"
        class="q-mr-md q-my-xs"
        :style="{
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          transform: 'scale(1.2, 1.2)'
        }"
      />
      <span class="text-h5 text-family-bold text-grey-9" style="width: 50px">
        {{ count['pessoa-acidentada'] }}
      </span>
      Pessoa acidentada
    </li>
  </ul>
</template>

<script>
import { slugify } from '../utils/helpers';

export default {
  name: 'LegendAlert',
  props: {
    info: { type: Array, default: () => ([]) },
  },
  data: () => ({
    count: {},
  }),
  watch: {
    info: {
      immediate: true,
      handler() {
        this.countByTypes();
      },
    },
  },
  methods: {
    slugify,
    countByTypes() {
      this.info.forEach((item) => {
        const type = slugify(item.type);
        this.count[type] = this.info.reduce((acc, cur) => {
          if (slugify(cur.type) !== type) {
            return acc;
          }
          return acc + 1;
        }, 0);
      });
    },
  },
};
</script>
