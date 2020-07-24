import React, {useEffect, useState} from "react";
import socketIo from "socket.io-client";
import {useParams} from "react-router-dom";

import styles from "./Processo.module.css";

interface RouteParams {
    id: string;
}

const socket = socketIo('localhost:8000');

function Processo() {
    const params = useParams<RouteParams>();
    const [logs, setLogs] = useState<string[]>([]);

    useEffect(() => {
        console.log('inicaindo sockets eventos')

        socket.on(`processo/${params.id}`, (message: any) => {
            setLogs((state) => [...state, message.descricao]);
        })

        // socket.emit(`processo:run`, params.id);

        return () => {
            socket.emit(`processo:cancel`, params.id);
            socket.off(`processo/${params.id}`);
        }
    }, [])

    return (
        <div className={styles.Terminal}>
            <header className={styles.TerminalHeader}>
                <div></div>
                <div></div>
                <div></div>
            </header>
            <div className={styles.TerminalContent}>
                <ul className={styles.TerminalMessages}>
                    <li className={styles.TerminalMessageInfo}>
                        Iniciando Processo 1: Main
                    </li>
                    <li className={styles.TerminalMessageInfo}>
                        Copiando dados da tabela xxxx
                    </li>
                    <li className={styles.TerminalMessageSuccess}>
                         Dados copiados da tabela xxxx
                    </li>
                    <li className={styles.TerminalMessageError}>
                         Erro ao reiniciar processo
                    </li>
                    <li className={styles.TerminalMessageInfo}>
                        💤 Esperando processo 1: Main
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Processo;
