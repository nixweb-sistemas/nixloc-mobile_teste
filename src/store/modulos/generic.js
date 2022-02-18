import axios from "@/config/axios";
import Token from "@/config/token";


export default {
    namespaced: true,
    state: {
        modal: {
            nome: undefined,
            abrir: false
        },
        vodal: {
            nome: undefined,
            abrir: false
        },
        notificacoes: [],
        paginacao: [],
        selecionados: [],
        carregando: [],
        evento: {
            dataHora: undefined,
            nome: undefined,
            dados: {}
        },
        toast: {
            dataHora: undefined,
            tipo: undefined,
        },
        ids: undefined,
        pesquisa: undefined,
        EscolherEstatico: { dataHora: undefined, campoAlvo: undefined, valor: undefined },
        buscouPesquisa: false,
        limpouPesquisa: false,
        metodoExecutadoApi: undefined,
    },
    getters: {
        mostrarModal: (state) => (nome) => {
            if (nome == state.modal.nome) return true;
            return false;
        },
        mostrarVodal: (state) => (nome) => {
            if (nome == state.vodal.nome) return true;
            return false;
        },
        carregando: (state) => (chave) => {
            var carregando = state.carregando.find(value => {
                return value === chave
            })
            if (carregando) return true;
            return false;
        },
        paginacao: (state) => (chave) => {
            return state.paginacao.find(obj => {
                return obj.chave === chave
            })
        },
        dica: (state) => (obj) => {
            return dicas.find(value => {
                if (value.formNome == obj.formNome && value.campo == obj.campo)
                    return value
            })
        },
        evento: (state) => {
            return state.evento;
        },
    },
    mutations: {
        abrirModal: (state, nome) => {
            state.modal.nome = nome;
            state.modal.abrir = true;
        },
        fecharModal: (state) => {
            state.modal.abrir = false;
        },
        abrirVodal: (state, nome) => {
            state.vodal.nome = nome;
            state.vodal.abrir = true;
        },
        fecharVodal: (state) => {
            state.vodal.nome = "";
            state.vodal.abrir = false;
        },
        atualizaCampoPesquisa: (state, value) => {
            state.pesquisa = value;
        },
        buscouPesquisa: (state) => {
            state.buscouPesquisa = state.buscouPesquisa = !state.buscouPesquisa
        },
        limpouPesquisa: (state) => {
            state.limpouPesquisa = state.limpouPesquisa = !state.limpouPesquisa
        },
        adicionaSelecao: (state, selecionados) => {
            state.selecionados = selecionados;
        },
        insereToast: (state, acao) => {
            state.toast.dataHora = new Date();
            state.toast.tipo = acao;
        },
        insereMetodoExecutadoApi: (state, acao) => {
            state.metodoExecutadoApi = acao;
        },
        limpaMetodoExecutadoApi: (state) => {
            state.metodoExecutadoApi = "";
        },
        insereCarregando: (state, chave) => {
            state.carregando.push(chave);
        },
        removeCarregando: (state, listaChave) => {
            listaChave.forEach(function (chave) {
                let filtro = state.carregando.filter(function (o) {
                    return o != chave;
                });
                state.carregando = filtro;
            });
        },
        inserePaginacao: (state, paginacao) => {
            state.paginacao.push(paginacao);
        },
        atualizaPaginacao: (state, paginacao) => {
            state.paginacao.forEach(function (obj) {
                if (obj.chave == paginacao.chave)
                    obj.totalPorPagina = paginacao.totalPorPagina;
            });
        },
        insereEvento: (state, obj) => {
            state.evento.dataHora = new Date();
            state.evento.nome = obj.nome;
            state.evento.dados = obj.dados;
        },
        removeEvento: (state) => {
            state.evento = {};
        },
        insereNotificacao: (state, notificacoes) => {
            state.notificacoes = notificacoes;
        },
        insereNotificacaoErroApi: (state) => {
            var erro = { property: "ERRO API", mensagem: "Falha de Comunicação!" };
            state.notificacoes = [erro];
        },
        removeNotificacao: (state) => {
            state.notificacoes = [];
        },
        listaIdParaStringVirgula: (state, listaId) => {
            state.ids = "";
            listaId.forEach(function (id) {
                state.ids += `${id},`;
            });
        },
        insereFiltro: (state, obj) => {
            state.EscolherEstatico.dataHora = new Date();
            state.EscolherEstatico.campoAlvo = obj.campoAlvo;
            state.EscolherEstatico.valor = obj.valor;
        },
    },
    actions: {
        postApi: async function (context, params) {
            console.log(params);
            context.commit('limpaMetodoExecutadoApi');
            return axios.post(params.url, params.obj, {
                headers: 'sdsd',
            })
                .then((response) => {
                    console.log(response);
                    if (response.data.sucesso) {
                        return response.data;
                    } else {
                        return response.data;
                    }
                }, (err) => {
                    console.log(err.response);

                    if (err.response)
                        if (err.response.status === 403)
                            context.commit('insereNotificacao', [{ mensagem: "Usuário não autorizado!" }])

                    if (!err.response)
                        context.commit('insereNotificacaoErroApi');
                    return false;
                })
        },
        putApi: async function (context, params) {
            context.commit('limpaMetodoExecutadoApi');
            return axios.put(params.url, params.obj, {
                headers: new Token().tokenHeaders(),
            })
                .then((response) => {
                    if (response.data.sucesso) {
                        context.commit('insereMetodoExecutadoApi', params.MetodoExecutadoApi);

                        if (!params.naoNotificarToast)
                            context.commit('insereToast', 'putApi');

                        context.commit('removeNotificacao');
                        context.commit('validation/removeFormSujo', null, { root: true });
                        return response.data;
                    } else {
                        context.commit('insereToast', 'putApiErro');
                        context.commit('insereNotificacao', response.data.notificacoes)
                        return response.data;
                    }
                }, (err) => {
                    if (err.response)
                        if (err.response.status === 403)
                            context.commit('insereNotificacao', [{ mensagem: "Usuário não autorizado!" }])

                    if (!err.response)
                        context.commit('insereNotificacaoErroApi');

                    return false;
                })
        },
        getApi: async function (context, params) {
            context.commit('limpaMetodoExecutadoApi');
            return axios.get(params.url, {
                params: params.obj,
                headers: new Token().tokenHeaders(),
            })
                .then((response) => {
                    if (response.data.sucesso) {
                        context.commit('insereMetodoExecutadoApi', params.MetodoExecutadoApi);
                        context.commit('removeNotificacao');
                        return response.data;
                    } else {
                        context.commit('insereNotificacao', response.data.notificacoes)
                        context.commit('insereToast', 'falhaGenerica');
                        return response.data;
                    }
                }, (err) => {
                    context.commit('insereNotificacaoErroApi');
                    return false;
                })
        },
        deleteAllApi: async function (context, params) {

            context.commit('limpaMetodoExecutadoApi');
            context.commit('listaIdParaStringVirgula', params.selecionados);

            let url = params.url;
            let ids = context.state.ids;

            return axios.delete(`${url}?ids=${ids}`, {
                headers: new Token().tokenHeaders(),
            })
                .then((response) => {
                    if (response.data.sucesso) {
                        context.commit('insereMetodoExecutadoApi', 'deleteAllApi');
                        context.commit('insereToast', 'deleteApiSucesso');
                        context.commit('removeNotificacao');
                        return response.data;
                    } else {
                        context.commit('insereNotificacao', response.data.notificacoes)
                        context.commit('insereToast', 'deleteApiErro');
                        return response.data;
                    }

                }, (err) => {
                    if (err.response)
                        if (err.response.status === 403)
                            context.commit('insereNotificacao', [{ mensagem: "Usuário não autorizado!" }])

                    if (!err.response)
                        context.commit('insereNotificacaoErroApi');
                    return false;
                })
        },
        deleteApi: async function (context, params) {

            context.commit('limpaMetodoExecutadoApi');
            let url = params.url;

            return axios.delete(`${url}`, {
                headers: new Token().tokenHeaders(),
            })
                .then((response) => {
                    if (response.data.sucesso) {
                        context.commit('insereMetodoExecutadoApi', 'deleteApi')
                        context.commit('insereToast', 'deleteApiSucesso');
                        context.commit('removeNotificacao');
                        return response.data;
                    } else {
                        context.commit('insereNotificacao', response.data.notificacoes)
                        context.commit('insereToast', 'deleteApiErro');
                        return response.data;
                    }

                }, (err) => {
                    if (err.response)
                        if (err.response.status === 403)
                            context.commit('insereNotificacao', [{ mensagem: "Usuário não autorizado!" }])

                    if (!err.response)
                        context.commit('insereNotificacaoErroApi');
                    return false;
                })
        },
        getPdfApi: async function (context, params) {
            context.commit('limpaMetodoExecutadoApi');
            return axios.post(params.url, params.obj, {
                headers: new Token().tokenHeaders(), responseType: "arraybuffer",
            })
                .then((response) => {
                    let blob = new Blob([response.data], { type: "application/pdf" }),
                        url = window.URL.createObjectURL(blob);
                    window.open(url);
                    context.commit('insereMetodoExecutadoApi', 'getPdfApi');
                    context.commit('removeNotificacao');

                }, (err) => {
                    context.commit('insereNotificacaoErroApi');
                    return false;
                })
        },
        postFileApi: async function (context, params) {
            context.commit('limpaMetodoExecutadoApi');

            let formData = new FormData();
            formData.append("file", params.arquivo);
            formData.append(params.container, params.container);
            formData.append(params.nome, params.nome);
            formData.append(params.aceitos, params.aceitos);

            return axios.post(params.url, formData, {
                headers: new Token().tokenHeaders(),
            })
                .then((response) => {
                    if (response.data.sucesso) {
                        context.commit('insereMetodoExecutadoApi', 'postFileApi');
                        context.commit('removeNotificacao');
                        return response.data;
                    } else {
                        context.commit('insereToast', 'adicionarApiErro');
                        context.commit('insereNotificacao', response.data.notificacoes)

                        return response.data;
                    }
                }, (err) => {
                    if (err.response)
                        if (err.response.status === 403)
                            context.commit('insereNotificacao', [{ mensagem: "Usuário não autorizado!" }])

                    if (!err.response)
                        context.commit('insereNotificacaoErroApi');
                    return false;
                })
        },
        deleteFileApi: async function (context, params) {
            context.commit('limpaMetodoExecutadoApi');
            return axios.post(params.url, params.obj, {
                headers: new Token().tokenHeaders(),
            })
                .then((response) => {
                    if (response.data.sucesso) {
                        context.commit('insereMetodoExecutadoApi', 'deleteFileApi');
                        context.commit('removeNotificacao');
                        return response.data;
                    } else {
                        context.commit('insereNotificacao', response.data.notificacoes)
                        context.commit('insereToast', 'adicionarApiErro');
                        return response.data;
                    }
                }, (err) => {
                    if (err.response)
                        if (err.response.status === 403)
                            context.commit('insereNotificacao', [{ mensagem: "Usuário não autorizado!" }])

                    if (!err.response)
                        context.commit('insereNotificacaoErroApi');
                    return false;
                })
        },
    }
}