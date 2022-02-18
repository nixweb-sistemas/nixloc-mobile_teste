export default {
    namespaced: true,
    state: {
        usuarioLogado: { nome: "teste" },
        menu: {
            itens: []
        },
    },
    mutations: {
        insereUsuarioLogado: (state, obj) => {
            state.usuarioLogado = obj;
        },
        insereItemMenu: (state, itens) => {
            itens.forEach(function (obj) {
                state.menu.itens.push(obj);
            });
        },
        removeItensMenu: (state) => {
            state.menu.itens = [];
        },
    },
}