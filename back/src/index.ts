import app from "./http/server.js";
import "./mqtt/client.js";

app.listen(8091, () => {
  console.log("API rodando na porta 8091");
});
