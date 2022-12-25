const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
var crypto = require("crypto");

// Variáveis
const keySecret = "fd85b494-aaaa";
const ivSecret = "smslt";
const method = "AES-256-CBC";

const key = crypto
  .createHash("sha512")
  .update(keySecret, "utf-8")
  .digest("hex")
  .substring(0, 32);

const iv = crypto
  .createHash("sha512")
  .update(ivSecret, "utf-8")
  .digest("hex")
  .substring(0, 16);

function criptografarSenha(senha) {
  const criptografia = crypto.createCipheriv(method, key, iv);
  const criptografado =
    criptografia.update(senha, "utf-8", "base64") +
    criptografia.final("base64");
  return Buffer.from(criptografado).toString("base64");
}

function descriptografarSenha(senha) {
  const buffer = Buffer.from(senha, "base64");
  const descriptografia = buffer.toString("utf-8");
  const descriptografado = crypto.createDecipheriv(method, key, iv);
  return (
    descriptografado.update(descriptografia, "base64", "utf-8") +
    descriptografado.final("utf-8")
  );
}

// Conexão com o banco de dados
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234@abc",
  database: "testetcc",
});

app.use(cors());
app.use(express.json({ limit: "50mb" }));

// TABELA DE FUNCIONÁRIOS
// Login de funcionários (adm)
app.post("/login", (req, res) => {
  const { credencial, senha } = req.body;

  try {
    // Verifica se já existe alguém no banco
    const SELECT =
      "SELECT * FROM funcionarios WHERE num_funcionario = ? AND senha = ?";
    db.query(
      SELECT,
      [credencial, criptografarSenha(senha)],
      (error, result) => {
        if (result.length > 0) {
          // Verifica se é administrador
          if (result[0].adm === 1) {
            const data = {
              nome: result[0].nome,
              img: result[0].foto_perfil,
              credencial: result[0].num_funcionario,
            };
            return res.status(200).send(data);
          } else if (result[0].ativo === 0) {
            // Envia uma mensagem caso o funcionário não esteja ativo
            return res
              .status(202)
              .send("Você não possui permissão para acessar esta área");
          } else {
            return res
              .status(202)
              .send("Você não possui permissão para acessar esta área");
          }
        } else {
          // Digitou os dados errados ou usuário inexistente no banco
          return res.status(202).send("Usuário e/ou senha inválidos");
        }
      }
    );
  } catch (error) {
    // Envia uma mensagem caso a conexão com o banco de dados falhe
    return res.send("Erro inesperado! Tente novamente mais tarde");
  }
});

// Cadastrar funcionários
app.post("/cadastrar-funcionarios", (req, res) => {
  const { credencial, img, nome, email, senha, adm } = req.body;

  try {
    // Verifica se o usuário já está cadastrado
    const SELECT = "SELECT * FROM funcionarios WHERE num_funcionario = ?";
    db.query(SELECT, [credencial], (error, result) => {
      // Se estiver cadastrado, ele retorna uma mensagem
      if (result.length > 0) {
        return res.status(202).send("Funcionário já foi cadastrado");
      } else {
        // Cadastrar o funcionário
        const INSERT = "INSERT INTO funcionarios VALUES(?, ?, ?, ?, ?, ?, ?)";
        db.query(
          INSERT,
          [credencial, img, nome, email, criptografarSenha(senha), adm, true],
          (error, result) => {
            // Mensagem de sucesso
            return res.status(200).send("Funcionário cadastrado com sucesso!");
          }
        );
      }
    });
  } catch (error) {
    // Envia uma mensagem caso a conexão com o banco de dados falhe
    return res.send("Erro incomum! Tente novamente mais tarde");
  }
});

// Listar Dados do funcionário (exceto adm)
app.post("/listar-dados-funcionario", (req, res) => {
  const { credencial } = req.body;

  try {
    // Seleciona todos os usuários, exceto o usuário logado
    const select = "SELECT * FROM funcionarios  WHERE NOT num_funcionario = ?";
    db.query(select, [credencial], (error, result) => {
      return res.send(result);
    });
  } catch (error) {
    return res.send("Erro incomum! Tente novamente mais tarde");
  }
});

// Listar dados do funcionário individualmente
app.post("/buscar-dados-funcionario", (req, res) => {
  const { credencial } = req.body;

  try {
    const JOIN = "SELECT * from funcionarios WHERE num_funcionario = ?";
    db.query(JOIN, [credencial], (error, result) => {
      if (result.length > 0) {
        return res.send({
          num_funcionario: result[0].num_funcionario,
          foto_perfil: result[0].foto_perfil,
          nome: result[0].nome,
          email: result[0].email,
          senha: descriptografarSenha(result[0].senha),
          adm: result[0].adm,
          ativo: result[0].ativo,
        });
      } else {
        const SELECT = "SELECT * from funcionarios WHERE num_funcionario = ?";
        db.query(SELECT, [credencial], (error, result) => {
          return res.send(result);
        });
      }
    });
  } catch (error) {
    return res.send("Erro incomum! Tente novamente mais tarde");
  }
});

// Excluir funcionário do banco
app.post("/excluir-funcionario", (req, res) => {
  const { credencial } = req.body;

  try {
    // Verifica se o usuário está vinculado a algum caminhão
    const JOIN =
      "SELECT * from funcionarios inner join caminhoes ON funcionarios.num_funcionario = caminhoes.piloto WHERE num_funcionario = ?";
    db.query(JOIN, [credencial], (error, result) => {
      if (result.length > 0) {
        // Caso estiver, retorna uma mensagem ao adm
        return res
          .status(202)
          .send(
            "É necessário desvincular o funcionário do veículo antes de excluí-lo"
          );
      } else {
        // Senão, o funcionário é deletado
        const DELETE = "DELETE from funcionarios WHERE num_funcionario = ?";
        db.query(DELETE, [credencial], (error, result) => {
          return res.status(200).send("Funcionário deletado com sucesso!");
        });
      }
    });
  } catch (error) {
    // Envia uma mensagem caso a conexão com o banco de dados falhe
    return res.send("Erro incomum! Tente novamente mais tarde");
  }
});

// Atualizar dados do funcionário
app.post("/atualizar-dados-funcionario", (req, res) => {
  const { credencial, img, nome, email, senha, ativo, adm } = req.body;

  try {
    // Atualizar dados
    const UPDATE =
      "UPDATE funcionarios SET num_funcionario = ?, foto_perfil = ?, nome = ?, email = ?, senha = ?, adm = ?, ativo = ? WHERE num_funcionario = ?";
    db.query(
      UPDATE,
      [
        credencial,
        img,
        nome,
        email,
        criptografarSenha(senha),
        adm == 1 ? true : false,
        ativo == 1 ? true : false,
        credencial,
      ],
      (error, result) => {
        // Mensagem de sucesso
        console.log(error)
        return res.status(200).send("Dados atualizados com sucesso!");
      }
    );
  } catch (error) {
    // Envia uma mensagem caso a conexão com o banco de dados falhe
    return res.send("Erro incomum! Tente novamente mais tarde");
  }
});

// Listar dados do Adm
app.post("/buscar-dados-adm", (req, res) => {
  const { credencial } = req.body;

  try {
    // Listar dados do adm logado
    const SELECT = "SELECT * from funcionarios WHERE num_funcionario = ?";
    db.query(SELECT, [credencial], (error, result) => {
      return res.send({
        num_funcionario: result[0].num_funcionario,
        foto_perfil: result[0].foto_perfil,
        nome: result[0].nome,
        email: result[0].email,
        senha: descriptografarSenha(result[0].senha),
        adm: result[0].adm,
        ativo: result[0].ativo,
      });
    });
  } catch (error) {
    // Envia uma mensagem caso a conexão com o banco de dados falhe
    return res.send("Erro incomum! Tente novamente mais tarde");
  }
});

// Atualizar dados do Adm
app.post("/atualizar-dados-adm", (req, res) => {
  const { credencial, img, nome, email, senha, adm, ativo } = req.body;

  try {
    // Atualizar dados
    const UPDATE =
      "UPDATE funcionarios SET num_funcionario = ?, foto_perfil = ?, nome = ?, email = ?, senha = ?, adm = ?, ativo = ? WHERE num_funcionario = ?";

    db.query(
      UPDATE,
      [
        credencial,
        img,
        nome,
        email,
        criptografarSenha(senha),
        Number(adm) === 1 ? true : false,
        Number(ativo) === 1 ? true : false,
        credencial,
      ],
      (error, result) => {
        // Mensagem de sucesso
        return res.send("Dados atualizados com sucesso");
      }
    );
  } catch (error) {
    // Envia uma mensagem caso a conexão com o banco de dados falhe
    return res.send("Erro incomum! Tente novamente mais tarde");
  }
});

// Listar Dados do funcionário (exceto adm)
app.post("/listar-dados-motorista", (req, res) => {
  const { credencial } = req.body;

  try {
    // Seleciona todos os usuários exceto o usuário logado e o usuário que possui inatividade na empresa
    const select = "SELECT * FROM funcionarios WHERE NOT  num_funcionario = ? AND NOT ativo = ? ";
    db.query(select, [credencial, 0], (error, result) => {
      return res.send(result);
    });
  } catch (error) {
    return res.send("Erro incomum! Tente novamente mais tarde");
  }
});

// API - Buscar email com base na credencial
app.post("/buscar-email", (req, res) => {
  const { credencial } = req.body;

  try {
    const SELECT = "SELECT email from funcionarios WHERE num_funcionario = ?";
    db.query(SELECT, [credencial], (error, result) => {
      return res.send(result[0]);
    });
  } catch (error) {
    return res.send("Erro incomum! Tente novamente mais tarde");
  }
});

// API - Enviar Email com senha nova
app.post("/atualizar-senha", (req, res) => {
  const { credencial, senha } = req.body;

  try {
    const UPDATE =
      "UPDATE funcionarios SET senha = ? WHERE num_funcionario = ?";
    db.query(
      UPDATE,
      [criptografarSenha(senha), credencial],
      (error, result) => {
        return res.status(200).send("");
      }
    );
  } catch (error) {
    return res.status(202).send("Erro incomum! Tente novamente mais tarde");
  }
});

// TABELA DE CAMINHÕES
// Cadastrar Caminhões
app.post("/cadastrar-caminhao", (req, res) => {
  const { placa, marca, modelo, bluetooth } = req.body;

  try {
    const SELECT = "SELECT * FROM caminhoes WHERE placa = ?";
    db.query(SELECT, [placa], (error, result) => {
      if (result.length > 0) {
        return res.status(202).send("Veículo já foi cadastrado");
      } else {
        const INSERT = "INSERT INTO caminhoes VALUES(?,?,?,?,?,?)";
        db.query(
          INSERT,
          [placa, marca, modelo, null, true, bluetooth],
          (error, result) => {
            return res.status(200).send("Veículo cadastrado com sucesso!");
          }
        );
      }
    });
  } catch (error) {
    return res.send("Erro incomum! Tente novamente mais tarde");
  }
});

// Listar Caminhões
app.post("/gerenciar-caminhoes", (req, res) => {
  try {
    const SELECT = "SELECT * FROM caminhoes";
    db.query(SELECT, (error, result) => {
      return res.send(result);
    });
  } catch (error) {
    return res.send("Erro incomum! Tente novamente mais tarde");
  }
});

// Excluir caminhão
app.post("/excluir-caminhao", (req, res) => {
  const { placa } = req.body;

  try {
    const DELETE = "DELETE FROM caminhoes WHERE placa = ?";
    db.query(DELETE, [placa], (error, result) => {
      return res.send("Veículo deletado com sucesso");
    });
  } catch (error) {
    return res.send("Erro incomum! Tente novamente mais tarde");
  }
});

// Listar Caminhões individualmente
app.post("/buscar-dados-veiculos", (req, res) => {
  const { placa } = req.body;

  try {
    const SELECT = "SELECT * FROM caminhoes WHERE placa = ? ";
    db.query(SELECT, [placa], (error, result) => {
      return res.send(result);
    });
  } catch (error) {
    return res.send("Erro incomum! Tente novamente mais tarde");
  }
});

// Atualizar dados do caminhão
app.post("/atualizar-dados-caminhao", (req, res) => {
  const { placa, modelo, ativo, marca, piloto } = req.body;

  try {
    const UPDATE =
      "UPDATE caminhoes SET placa = ?, marca = ?, modelo = ?, piloto = ?, ativo = ? WHERE placa = ?";
    db.query(
      UPDATE,
      [
        placa,
        marca,
        modelo,
        piloto === "" ? null : piloto,
        ativo === 1 ? true : false,
        placa,
      ],
      (error, result) => {
        return res.status(200).send("Dados atualizados com sucesso!");
      }
    );
  } catch (error) {
    return res.send("Erro incomum! Tente novamente mais tarde");
  }
});

// BUSCAR VEÍCULOS CADASTRADOS
app.post("/buscar-veiculos", (req, res) => {
  try {
    const SELECT = "SELECT placa, modelo FROM caminhoes";
    db.query(SELECT, [], (error, result) => {
      return res.send(result);
    });
  } catch (error) {
    return res.send("Erro incomum! Tente novamente mais tarde");
  }
});

// ALOCAR CAMINHÃO AO FUNCIONÁRIO
app.post("/atualizar-motorista", (req, res) => {
  const { placa, credencial } = req.body;

  try {
    const SELECT = "UPDATE caminhoes SET piloto = ? WHERE placa = ?";
    db.query(SELECT, [credencial, placa], (error, result) => {
      return res.send("Atualizado com sucesso");
    });
  } catch (error) {
    return res.send("Erro incomum! Tente novamente mais tarde");
  }
});

// SERVIDOR INICIADO NA PORTA 3001
app.listen(3001, () => {
  console.log("Servidor funcionando");
});
