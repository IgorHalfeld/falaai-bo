export default httpClient => ({
  getShips: async () => {
    const { data: response } = await httpClient.get('traffic');
    return { data: response.positions };
  },
});
