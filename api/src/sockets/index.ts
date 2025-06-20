import { Http2Server } from "http2";
import { Socket, Server } from "socket.io";
import { Server as HttpServer }   from "http";
import { BuildResume } from "../services/pdfService";
import Resume from "../models/Resume";

type AnyServer = HttpServer | Http2Server;
/**
 * Attaches Socket.IO to an existing HTTP server
 * and defines all real‑time events in one place.
 *
 * @param {http.Server} httpServer - Node HTTP server from `createServer`
 */
export default async function initSocket(httpServer: AnyServer) {
 try{
    // Same CORS rules you’d put in server.js
    const io = new Server(httpServer, {
        cors: { origin: "http://localhost:3000" },
    });

    io.on("connection", (socket: Socket) => {
        console.log("⚡  New client:", socket.id);

        socket.on("client:data", async (payload) => {
            const resume = await Resume.findOne({
                _id: payload.resume_id,
                user: payload.user_id
            })

            if (resume) {
                resume.data = payload.data;
                await resume.save();

                const pdfBuffer = await BuildResume(payload?.data)
                socket.emit("server:data", pdfBuffer);   
            }
        });

        socket.on("disconnect", () => console.log("👋  Client left"));
    });

    // (optional) expose `io` for emitting from other modules
    return io;
 }catch(e){
    console.log(e)
 }
}