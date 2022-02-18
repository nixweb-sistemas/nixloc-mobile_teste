<template>
  <Page>
    <ActionBar title="Login" class="action-bar" />
    <FlexboxLayout flexDirection="column" justifyContent="center" class="full-height">
      <Image
        src="https://nixloc.com.br/wp-content/themes/nix-loc/images/logo_nixweb.png"
        class="logo-container"
      />

      <StackLayout class="container">
        <FlexboxLayout alignItems="center" class="border-bottom">
          <TextField v-model="login.usuarioNome" hint="Usuário" class="form-input" />
        </FlexboxLayout>

        <FlexboxLayout alignItems="center" class="border-bottom">
          <TextField
            v-model="login.senha"
            hint="Senha"
            secure="true"
            class="form-input"
          />
        </FlexboxLayout>

        <Button text="Login" @tap="efetuarLogin" class="my-button" />

        <Label
          :class="{ logado: estaLogado, 'nao-logado': !estaLogado }"
          horizontalAlignment="center"
          :text="mensagem"
        />

        <FlexboxLayout
          alignItems="center"
          justifyContent="space-between"
          class="auth-buttons"
        >
          <Label horizontalAlignment="left" text="Criar Conta" />
          <Label horizontalAlignment="right" text="Esqueceu Senha?" />
        </FlexboxLayout>
      </StackLayout>
    </FlexboxLayout>
  </Page>
</template>

<script>
import Login from "@/components/modulos/adm/login/Login.js";

import { mapGetters, mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "LoginView",
  data() {
    return {
      login: new Login(),
      estaLogado: false,
      mensagem: "",
    };
  },
  methods: {
    ...mapActions("generic", ["postApi"]),
    efetuarLogin() {
    
      let params = {
        url: "https://localhost:44348/api/v1/adm/login/logar",
        obj: this.login,
      };
      this.postApi(params).then((response) => {
        console.log(response);
      });
    },
  },
  computed: {
    ...mapState("usuario", ["usuarioLogado"]),
  },
};
</script>

<style lang="scss">
.border-bottom {
  border-bottom-width: 1;
  border-bottom-color: white;
  margin-bottom: 40;
  padding-bottom: 8;
}
.form-input {
  color: black;
  placeholder-color: black;
  width: 100%;
}
.icon-margin {
  margin-right: 10;
}
.my-button {
  background-color: #577696;
  color: white;
  font-weight: bold;
  border-radius: 25;
  padding-top: 14;
  padding-bottom: 14;
  text-transform: uppercase;
  letter-spacing: 0.1;
  margin-bottom: 20;
  margin-top: 10;
}
.auth-buttons {
  color: #577696;
  font-size: 14;
}
.full-height {
  height: 100%;
}
.logo-container {
  width: 200;
  margin-bottom: 60;
}
.container {
  margin-left: 34;
  margin-right: 34;
}

.logado {
  font-size: 25;
  color: green;
}

.nao-logado {
  font-size: 25;
  color: red;
}
</style>
