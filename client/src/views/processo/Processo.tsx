import React, {useEffect, useRef, useState} from "react";
import socketIo from "socket.io-client";
import {useParams} from "react-router-dom";

import styles from "./Processo.module.css";
import {Loader} from "./components/loader/Loader";

interface RouteParams {
    id: string;
}

interface IProcesso {
    descricao: string;
    tempoExecucao: number;
}

interface ITabela {
    nomeOrigem: string;
    nomeDestino: string;
    processo: IProcesso;
}

interface ITabelaLog {
    descricao: string;
    data: string;
    type: string;
    tabela: ITabela;
}

interface MessageLog {
    text: string;
    type: string;
}

interface ITypeClassCSS {
    [key: string]: string
}

const TypeClassCSS: ITypeClassCSS = {
    SUCCESS: styles.TerminalMessageSuccess,
    INFO: styles.TerminalMessageInfo,
    ERROR: styles.TerminalMessageError,
    WARNING: styles.TerminalMessageWarning
};

const getTypeClassCSS = (type: string) => {
    let className = TypeClassCSS.INFO;

    if (TypeClassCSS.hasOwnProperty(type)) {
        className = TypeClassCSS[type];
    }

    return className;
};

const socket = socketIo('localhost:8000');

function Processo() {
    const params = useParams<RouteParams>();
    const [logs, setLogs] = useState<MessageLog[]>([]);
    const [loading, setLoading] = useState(true);
    const terminalContentRef = useRef<HTMLDivElement>(null);
    const terminalMessagesRef = useRef<HTMLUListElement>(null);

    const createLogMessage = (log: ITabelaLog): string => {
        // [24/07/2020 20:00:00 | Usuarios] Iniciando replicação [asd]..
        // [24/07/2020 20:00:00 | Usuarios] Inserindo na tabela X..
        const newDate = new Date(log.data);
        return `[${newDate.toLocaleDateString()} ${newDate.toLocaleTimeString()}| ${log.tabela.nomeOrigem}] ${log.descricao}`;
    };

    const scrollToBottom = () => {
        const ulRef = terminalMessagesRef.current;
        if (terminalContentRef.current && ulRef) {
            terminalContentRef.current.scrollTo({
                behavior: "smooth",
                top: ulRef.offsetHeight
            })
        }
    }

    useEffect(() => {
        console.log('iniciando sockets eventos');

        socket.emit(`processo:run`, params.id);

        setLoading(true);

        socket.on(`processo/${params.id}/setup`, (messages: ITabelaLog[]) => {
            const messagesLog: MessageLog[] = messages.map(message => ({
                text: createLogMessage(message),
                type: getTypeClassCSS(message.type)
            }));

            setLogs(logs => [...logs, ...messagesLog]);
            setLoading(false);

            socket.on(`processo/${params.id}`, (message: ITabelaLog) => {
                const messageLog: MessageLog = {
                    text: createLogMessage(message),
                    type: getTypeClassCSS(message.type)
                }
                setLogs((state) => [...state, messageLog]);
                scrollToBottom();
            })
        });

        socket.on(`processo:wait`, (message: string) => {
            const messageLog: MessageLog = {
                text: message,
                type: getTypeClassCSS('INFO')
            }

            setLogs((state) => [...state, messageLog]);
            scrollToBottom();
        });

        return () => {
            socket.emit(`processo:cancel`, params.id);
            socket.off(`processo/${params.id}`);
        }
    }, []);

    return (
        <div className={styles.Terminal}>
            <header className={styles.TerminalHeader}>
                <div></div>
                <div></div>
                <div></div>
            </header>
            <div
                ref={terminalContentRef}
                className={styles.TerminalContent}
            >
                <ul
                    ref={terminalMessagesRef}
                    className={styles.TerminalMessages}
                >
                    {
                        loading && (
                            <Loader message="Carregando logs anteriores"/>
                        )
                    }
                    {
                        logs.map((log, index) => (
                            <li key={index}
                                className={log.type}
                            >
                                {log.text}
                            </li>
                        ))
                    }
                    {/* <li className={styles.TerminalMessageInfo}>
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
                    </li>*/}
                </ul>
            </div>
        </div>
    )
}

export default Processo;
