<template>
  <ul style="list-style: none" class="q-pa-none">
    <li
      class="flex items-center text-grey-7 q-my-sm text-body1">
      <img
        src="/statics/ship_noporto.png"
        class="q-mr-md q-my-xs"
        :style="{
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          transform: 'scale(1.2, 1.2)'
        }"
      />
      <span class="text-h5 text-family-bold text-grey-9" style="width: 50px">
        {{ info.shipsPublicPort }}</span>
      Navios no porto público
    </li>
    <li
      class="flex items-center text-grey-7 q-my-sm text-body1">
      <img
        src="/statics/ship_noterminal.png"
        class="q-mr-md q-my-xs"
        :style="{
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          transform: 'scale(1.2, 1.2)'
        }"
      />
      <span class="text-h5 text-family-bold text-grey-9" style="width: 50px">
        {{ info.shipsTerminals }}</span>
      Navios no terminal
    </li>
    <li
      class="flex items-center text-grey-7 q-my-sm text-body1">
      <img
        src="/statics/ship_esperado.png"
        class="q-mr-md q-my-xs"
        :style="{
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          transform: 'scale(1.2, 1.2)'
        }"
      />
      <span class="text-h5 text-family-bold text-grey-9" style="width: 50px">
        {{ info.shipsExpected }}</span>
      Navios esperados
    </li>
    <li
      class="flex items-center text-grey-7 q-my-sm text-body1">
      <img
        src="/statics/ship_green.png"
        class="q-mr-md q-my-xs"
        :style="{
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          transform: 'scale(1.2, 1.2)'
        }"
      />
      Navios a salvo
    </li>
    <li
      class="flex items-center text-grey-7 q-my-sm text-body1">
      <img
        src="/statics/ship_yellow.png"
        class="q-mr-md q-my-xs"
        :style="{
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          transform: 'scale(1.2, 1.2)'
        }"
      />
      Navios em atenção
    </li>
    <li
      class="flex items-center text-grey-7 q-my-sm text-body1">
      <img
        src="/statics/ship_red.png"
        class="q-mr-md q-my-xs"
        :style="{
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          transform: 'scale(1.2, 1.2)'
        }"
      />
      Navios em perigo!
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    info: { type: Object, default: () => ({}) },
  },
};
</script>
