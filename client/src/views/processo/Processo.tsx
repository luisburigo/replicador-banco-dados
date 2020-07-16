import React, {useEffect, useState} from "react";
import socketIo from "socket.io-client";
import {useParams} from "react-router-dom";

interface RouteParams {
    id: string;
}

const socket = socketIo('localhost:8000');

function Processo() {
    const params = useParams<RouteParams>();
    const [logs, setLogs] = useState<string[]>([]);

    console.log(params)

    useEffect(() => {
        socket.on(`processo/${params.id}`, (message: string) => {
            setLogs((state) => [...state, message]);
        })
    }, [])

    return (
        <div>
            <ul>
                {
                    logs.map((log, index) => (
                        <li key={index}>{log}</li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Processo;
