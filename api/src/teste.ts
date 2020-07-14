import { Bootstrap } from "./Bootstrap";
import { createConnection, getConnection } from "typeorm";
import { DatabaseConfig, Direcao, ConnectionFactory } from "./models/Direcao";

async function init() {
    await Bootstrap.init();

    const databaseConfigOrigem = new DatabaseConfig();
    databaseConfigOrigem.databaseName = 'academy';
    databaseConfigOrigem.port = 3306;
    databaseConfigOrigem.host = 'localhost';
    databaseConfigOrigem.password = '';
    databaseConfigOrigem.username = 'root'

    const databaseConfigDestino = new DatabaseConfig();
    databaseConfigDestino.databaseName = 'academy';
    databaseConfigDestino.port = 3306;
    databaseConfigDestino.host = 'localhost';
    databaseConfigDestino.password = '';
    databaseConfigDestino.username = 'root'

    console.log(databaseConfigDestino.hostFormated)
    console.log(databaseConfigOrigem.hostFormated)

    let direcao = new Direcao();
    direcao.origem = databaseConfigOrigem;
    direcao.destino = databaseConfigDestino;
    direcao = await direcao.save();

    const connectionFactory = ConnectionFactory.create(direcao);
    let connectionDestino = await connectionFactory.createConnectionDestino();
    connectionDestino = await connectionFactory.createConnectionDestino();

    // const connection = await createConnection({
    //     name: 'teste',
    //     type: 'mysql',
    //     host: 'localhost',
    //     port: 3306,
    //     username: 'root',
    //     password: '',
    //     database: 'barber-app',
    // });

    // connection.createQueryRunner().query("select * from information_schema.referential_constraints where constraint_schema = 'barber-app';").then(res => {
    //     res.forEach(r => {
    //         console.log(r.REFERENCED_TABLE_NAME, r.TABLE_NAME)
    //     })
    // })
}

// class ReplicacaoService {
//
//     iniciarConexoes() {
//         // Busca a direcao
//         const direcao = new Direcao();
//         const connectionFactory = ConnectionFactory.create(direcao);
//
//         connectionFactory.createConnectionDestino();
//         connectionFactory.createConnectionOrigem();
//     }
//
// }



init();
