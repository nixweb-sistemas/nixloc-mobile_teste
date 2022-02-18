<template>
  <Page>
    <ActionBar>
      <Label class="teste" text="Home" />
    </ActionBar>

    <GridLayout>
      <Label class="info">
        <FormattedString>
          <Span class="fas" text.decode="&#xf135; " />
          <Span text="Nixloc Sistema de Gestão" />
        </FormattedString>
      </Label>
    </GridLayout>
  </Page>
</template>

<script>
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";

export default {
  computed: {
    ...mapState("usuario", ["usuarioLogado"]),
    message() {
      return "Olá";
    },
  },
};
</script>

<style scoped lang="scss">
@import "@nativescript/theme/scss/variables/blue";

ActionBar {
  background-color: red;
}




.fas {
  @include colorize($color: accent);
}

.info {
  font-size: 20;
  horizontal-align: center;
  vertical-align: center;
}
</style>
