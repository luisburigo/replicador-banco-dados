import React, {useEffect, useState} from "react";

interface LoaderProps {
    message?: string;
}

export function Loader({message}: LoaderProps) {
    const [execution, setExecution] = useState(1);

    useEffect(() => {
        let interval = setInterval(() => {
            setExecution(state => {
                if (state == 3) {
                    return 0
                }

                return state + 1;
            })
        }, 500);


        return () => {
            clearInterval(interval);
        }
    }, []);

    return (
        <div style={{display: 'flex', color: 'white'}}>
            {message}
            <div>
                {Array(execution).fill('.').map(value => value)}
            </div>
        </div>
    )
}
