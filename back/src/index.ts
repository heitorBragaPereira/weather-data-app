// import app from "./infra/http/server.js";
// import "./infra/mqtt/client.js";

// app.listen(8091, () => {
//   console.log("API rodando na porta 8091");
// });

import app from "./infra/http/server.js";
import "./infra/mqtt/client.js";

app.listen(8091, () => {
  console.log("Backend rodando em 8091");
});
