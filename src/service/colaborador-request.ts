export const colaborador = {
    async get(): Promise<Colaborador[]> {
      const colaborador = await fetch('', {
        method: 'GET', 
        headers: {

          
        "authorization": `Bearer ${}`
        }
      })
      return colaborador.json();
    }
}