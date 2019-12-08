export default httpClient => ({
  getTotalizers: async () => {
    const { data: response } = await httpClient.get('general');
    const {
      PesquisarTotalizadoresResult,
    } = response;

    return {
      data: {
        inOperation: PesquisarTotalizadoresResult.EmOperacao,
        shipsTerminals: PesquisarTotalizadoresResult.NaviosAtracadosTerminais,
        shipsPublicPort: PesquisarTotalizadoresResult.NaviosAtracadosCaisPublico,
        shipsExpected: PesquisarTotalizadoresResult.NaviosEsperados,
      },
    };
  },
});
