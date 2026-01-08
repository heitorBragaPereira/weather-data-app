import server from "./infra/http/server.js";
import "./infra/mqtt/client.js";

server.listen(8091, () => {
  console.log("Backend rodando em 8091");
});
