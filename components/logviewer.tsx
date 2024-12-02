"use client";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";

import { ScrollArea } from "@/components/ui/scroll-area";
import { getContainerLogs } from "@/lib/docker-utils";
import { useEffect, useState } from "react";

interface LogViewerProps {
    containerId: string;
}

async function fetchLogs(containerId: string, numLines: number): Promise<string> {
    return await getContainerLogs(containerId, numLines);
}

//Not appending log lines in this first implementation. The entire log lines list is refreshed and the lines kept at a fixed count.
const LogViewer = (props: LogViewerProps) => {
    const [messages, setMessages] = useState("");
    const containerId = props.containerId;
    useEffect(() => {
        const updateMessages = async () => {
            try {
                const messages = await fetchLogs(containerId, 100);
                setMessages(messages);
            } catch (error) {
                console.error('Failed to fetch messages', error);//TODO show error
            }
        };

        const intervalId = setInterval(updateMessages, 2000);
        return () => clearInterval(intervalId);
    }, [containerId]);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className="text-center hover:cursor-pointer bg-blue-600 text-sm text-white rounded-md py-1 px-2">View</div>
            </SheetTrigger>
            <SheetContent className="m-2 rounded-md w-[1200px]" side="top">
                <SheetHeader>
                    <SheetTitle>Logs for {containerId} - refreshing every 2 seconds</SheetTitle>
                    <ScrollArea className="h-[800px] w-[1150px] rounded-md border p-4">
                        {messages.split("\n").map(message => {
                            // eslint-disable-next-line react/jsx-key
                            return <div>{message}</div>
                        })}
                    </ScrollArea>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )

}


export default LogViewer;