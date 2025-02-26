import {
    LogOut,
    MoveUpRight,
    Settings,
    CreditCard,
    FileText,
} from "lucide-react";

import { Link } from "react-router-dom";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

interface MenuItem {
    label: string;
    value?: string;
    href: string;
    icon?: React.ReactNode;
    external?: boolean;
}

interface Profile01Props {
    name: string;
    role: string;
    avatar: string;
    subscription?: string;
}

const defaultProfile = {
    name: "John Doe",
    role: "Prompt Engineer",
    avatar: "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-02-albo9B0tWOSLXCVZh9rX9KFxXIVWMr.png",
    subscription: "Free Trial",
} satisfies Required<Profile01Props>;

export default function Profile01({
    name = defaultProfile.name,
    role = defaultProfile.role,
    avatar = defaultProfile.avatar,
    subscription = defaultProfile.subscription,
}: Partial<Profile01Props> = defaultProfile) {
    const { state } = useSidebar();
    const { user, signOut } = useAuth();
    
    // Get user's metadata similar to nav-user.tsx
    const displayName = user?.user_metadata?.display_name || 'User';
    const email = user?.email || '';
    const avatarInitials = displayName.split(' ').map(n => n[0]).join('').toUpperCase();

    const menuItems: MenuItem[] = [
        {
            label: "Subscription",
            value: subscription,
            href: "#",
            icon: <CreditCard className="w-4 h-4" />,
            external: false,
        },
        {
            label: "Settings",
            href: "#",
            icon: <Settings className="w-4 h-4" />,
        },
        {
            label: "Terms & Policies",
            href: "#",
            icon: <FileText className="w-4 h-4" />,
            external: true,
        },
    ];

    const handleLogout = () => {
        if (signOut) {
            signOut();
        }
    };

    return (
        <div className="w-full max-w-sm mx-auto my-20">
            <div className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <div className="relative px-6 pt-12 pb-6">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="relative shrink-0">
                            <Avatar className="h-16 w-16 rounded-lg">
                                <AvatarImage src="" alt={displayName} />
                                <AvatarFallback className="rounded-lg">{avatarInitials}</AvatarFallback>
                            </Avatar>
                            <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900" />
                        </div>

                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">{displayName}</span>
                            <span className="text-sm text-zinc-600 dark:text-zinc-400">{email}</span>
                        </div>
                    </div>
                    <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-6" />
                    <div className="space-y-2">
                        {menuItems.map((item) => (
                            <Link
                                key={item.label}
                                to={item.href}
                                className="flex items-center justify-between p-2 
                                    hover:bg-zinc-50 dark:hover:bg-zinc-800/50 
                                    rounded-lg transition-colors duration-200"
                            >
                                <div className="flex items-center gap-2">
                                    {item.icon}
                                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                        {item.label}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    {item.value && (
                                        <span className="text-sm text-zinc-500 dark:text-zinc-400 mr-2">
                                            {item.value}
                                        </span>
                                    )}
                                    {item.external && (
                                        <MoveUpRight className="w-4 h-4" />
                                    )}
                                </div>
                            </Link>
                        ))}

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="w-full flex items-center justify-between p-2 
                                hover:bg-zinc-50 dark:hover:bg-zinc-800/50 
                                rounded-lg transition-colors duration-200"
                        >
                            <div className="flex items-center gap-2">
                                <LogOut className="w-4 h-4" />
                                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                    Logout
                                </span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
