<template>
  <ActionBar :title="titulo" class="action-bar" />
</template>

<script>
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "Topo",
  props: {
    titulo: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss">
.action-bar {
  flat: true;
}
</style>
