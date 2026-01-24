import { useLoadUserQuery } from '@/features/api/authApi';
import { Loader2 } from 'lucide-react';

const LoadingUser = ({ children }) => {
    const { isLoading } = useLoadUserQuery();

    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-white dark:bg-[#020617]">
                <div className="absolute h-64 w-64 rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none" />
                
                <div className="relative flex flex-col items-center gap-6">
                    <div className="relative">
                        <Loader2 className="h-12 w-12 animate-spin text-indigo-600 drop-shadow-[0_0_15px_rgba(79,70,229,0.5)]" />
                        <div className="absolute inset-0 h-12 w-12 rounded-full border-4 border-indigo-100 dark:border-indigo-900/30 -z-10" />
                    </div>

                    <div className="space-y-2 text-center">
                        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                            E-Learning Platform
                        </h2>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 animate-pulse tracking-wide">
                            Setting up your classroom...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default LoadingUser;