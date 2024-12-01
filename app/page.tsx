'use strict';

import { Docker } from "node-docker-api";

import { Card, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import LogViewer from "@/components/logviewer";
import Image from "next/image";
import { Container } from "node-docker-api/lib/container";

interface ContainerData {
  Id: string;
  Names: string[];
  Image: string;
  ImageID: string;
  Command: string;
  Created: number,
  Ports: [[Object]],
  Labels: {
    string: string;
  },
  State: string;
  Status: string;
  HostConfig: { string: string; },
  NetworkSettings: { Networks: [Object] },
  Mounts: [[Object], [Object]]

}

const Home = async () => {

  const docker = new Docker({ socketPath: '/var/run/docker.sock' });

  const list = await docker.container.list() as Container[];

  // console.log(list);
  list.forEach((container) => {
    const data: ContainerData = container.data as ContainerData;
    console.log(data.Names);

  })

  return (
    <div className="align-middle m-4">
      <Card className="rounded-lg shadow-lg border-blue-400 max-w-8xl text-left p-4">
        <CardTitle className="flex flex-col col-span-2">
          <Image alt="logo" src="/constat-logo.png" width={64} height={64} />
          <div className="font-bold text-2xl text-center text-zinc-700 ">Containers</div>
        </CardTitle>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Logs</TableHead>
              <TableHead>Admin</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((container) => {
              const data = container.data as ContainerData;
              return (
                <TableRow key={data.Id}>
                  <TableCell>{data.Names}</TableCell>
                  <TableCell>{data.Id}</TableCell>
                  <TableCell>{data.Image}</TableCell>
                  <TableCell>{new Date(data.Created * 1000).toLocaleString()}</TableCell>
                  <TableCell><LogViewer containerId={container.id}></LogViewer></TableCell>
                  <TableCell>Start | Stop (coming soon)</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  )

}

export default Home;