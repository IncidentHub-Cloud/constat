
"use server";

import { Docker } from "node-docker-api";
import { Container } from "node-docker-api/lib/container";

const docker = new Docker({ socketPath: '/var/run/docker.sock' });

export const getContainerLogs = async (containerId: string, numLines: number): Promise<string> => {
    const container = docker.container.get(containerId);
    if (!container) {
        //TODO return error
    }

    return new Promise((resolve, reject) => {
        let logBuffer = "";

        container.logs({
            stdout: true,
            stderr: true,
            tail: numLines,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }).then((stream: any) => {
            stream.on("data", (chunk: Buffer) => {
                const line = chunk.slice(8).toString("utf8");
                logBuffer += line;
                // console.log(line)
                // logBuffer += "\n";
            });

            stream.on("end", () => {
                resolve(logBuffer);
            });

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            stream.on("error", (err: any) => {
                logBuffer += err.slice(8).toString("utf8");
                // logBuffer += "\n";
            })
        }).catch(reject);
        // stream.on('error', (err: any) => logs.push(err.toString("utf-8").slice(8)))
    });
}

export const getContainers = async(): Promise<Container[]> => {
    return await docker.container.list() as Container[];
}

// getContainerLogs("80cc84c5bf3a").then(logs => {
//     console.log(logs)
// })