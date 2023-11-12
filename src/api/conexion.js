export async function hayConexion() {
  try {
    const online = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
    return online.status >= 200 && online.status <= 299;
  } catch (error) {
    return false;
  }
}
