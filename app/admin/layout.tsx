"use client"

import React, { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { TradingHeader } from "@/components/header/trading-header"
import { Bell, Search, User, LogOut, LayoutDashboard, Users, BarChart3, Receipt, Settings, Terminal, Zap } from "lucide-react"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [open, setOpen] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    if (pathname === "/admin/login") {
        return <>{children}</>
    }

    return (
        <div className="flex h-screen bg-[#050505] text-white overflow-hidden font-sans">
            {/* Sidebar */}
            <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                {/* Trading Header */}
                <TradingHeader />

                {/* Scrollable Area */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 custom-scrollbar relative">
                    {/* Background Glows */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>

                    {children}
                </main>
            </div>

            {/* Global Command Menu */}
            <CommandDialog open={open} onOpenChange={setOpen}>
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                    <CommandInput placeholder="Type a command or search..." className="border-none focus:ring-0 text-white" />
                    <CommandList className="max-h-[300px] overflow-y-auto custom-scrollbar">
                        <CommandEmpty className="py-6 text-center text-sm text-gray-500">No results found.</CommandEmpty>
                        <CommandGroup heading="Navigation" className="text-gray-500 px-2 py-3">
                            <CommandItem onSelect={() => { router.push("/admin"); setOpen(false) }} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer group">
                                <LayoutDashboard className="h-4 w-4 text-blue-500" />
                                <span className="text-white font-bold">Dashboard</span>
                                <CommandShortcut className="text-gray-600 font-mono">G D</CommandShortcut>
                            </CommandItem>
                            <CommandItem onSelect={() => { router.push("/admin/users"); setOpen(false) }} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer group">
                                <Users className="h-4 w-4 text-emerald-500" />
                                <span className="text-white font-bold">Manage Users</span>
                                <CommandShortcut className="text-gray-600 font-mono">G U</CommandShortcut>
                            </CommandItem>
                            <CommandItem onSelect={() => { router.push("/admin/analytics"); setOpen(false) }} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer group">
                                <BarChart3 className="h-4 w-4 text-purple-500" />
                                <span className="text-white font-bold">Platform Analytics</span>
                                <CommandShortcut className="text-gray-600 font-mono">G A</CommandShortcut>
                            </CommandItem>
                            <CommandItem onSelect={() => { router.push("/admin/transactions"); setOpen(false) }} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer group">
                                <Receipt className="h-4 w-4 text-orange-500" />
                                <span className="text-white font-bold">Financial History</span>
                                <CommandShortcut className="text-gray-600 font-mono">G T</CommandShortcut>
                            </CommandItem>
                            <CommandItem onSelect={() => { router.push("/admin#trading-console"); setOpen(false) }} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer group">
                                <Zap className="h-4 w-4 text-yellow-500" />
                                <span className="text-white font-bold">Admin Trading Console</span>
                                <CommandShortcut className="text-gray-600 font-mono">G X</CommandShortcut>
                            </CommandItem>
                        </CommandGroup>
                        <CommandSeparator className="bg-white/5" />
                        <CommandGroup heading="Settings" className="text-gray-500 px-2 py-3">
                            <CommandItem onSelect={() => { router.push("/admin/settings"); setOpen(false) }} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer group">
                                <Settings className="h-4 w-4 text-gray-400" />
                                <span className="text-white font-bold">Open Settings</span>
                                <CommandShortcut className="text-gray-600 font-mono">G S</CommandShortcut>
                            </CommandItem>
                            <CommandItem onSelect={async () => {
                                // Toggle Maintenance via API
                                try {
                                    const res = await fetch("/api/admin/site-config")
                                    const config = await res.json()
                                    await fetch("/api/admin/site-config", {
                                        method: "PATCH",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({ maintenanceMode: !config.maintenanceMode }),
                                    })
                                    router.refresh()
                                    setOpen(false)
                                } catch (e) {
                                    console.error("Command toggle failed", e)
                                }
                            }} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer group">
                                <Terminal className="h-4 w-4 text-amber-500" />
                                <span className="text-white font-bold">Toggle Maintenance Mode</span>
                            </CommandItem>
                        </CommandGroup>
                        <CommandSeparator className="bg-white/5" />
                        <CommandGroup heading="System" className="text-gray-500 px-2 py-3">
                            <CommandItem onSelect={() => {
                                document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
                                router.push("/admin/login")
                                setOpen(false)
                            }} className="flex items-center gap-3 p-3 rounded-xl hover:bg-rose-500/10 cursor-pointer group">
                                <LogOut className="h-4 w-4 text-rose-500" />
                                <span className="text-rose-500 font-bold">Logout Session</span>
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </div>
            </CommandDialog>
        </div>
    )
}
