"use client";

import { Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/shared/lib/utils";

export function NotificationBell() {
    const [hasUnread, setHasUnread] = useState(false);

    useEffect(() => {
        const checkUnread = async () => {
            try {
                const res = await fetch("/api/test-drive?unreadOnly=true");
                if (res.ok) {
                    const data = await res.json();
                    setHasUnread(data.length > 0);
                }
            } catch (error) {
                console.error("Failed to check unread messages");
            }
        };

        // Check immediately
        checkUnread();

        // Poll every 5 seconds
        const interval = setInterval(checkUnread, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative">
            <Mail className={cn("h-6 w-6 transition-colors", hasUnread ? "text-red-500" : "text-white")} />
            {hasUnread && (
                <span className="absolute -right-1 -top-1 flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
                </span>
            )}
        </div>
    );
}
