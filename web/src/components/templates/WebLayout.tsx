import React from "react"
import { Outlet } from "react-router-dom"
import WebHeader from "../organisms/WebHeader"
import WebFooter from "../organisms/WebFooter"


const WebLayout: React.FC = () => {
    return <div className="flex min-h-screen flex-col">
        <WebHeader />
        <main className="flex-1">
            <Outlet />
        </main>
        <WebFooter />
    </div>
}

export default WebLayout