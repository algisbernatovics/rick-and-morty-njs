"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { LocationData } from "@/types";
import { motion } from "framer-motion";

interface LocationCardProps {
    location: LocationData;
}

export function LocationCard({ location }: LocationCardProps) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="h-full"
        >
            <Link
                href={`/location/${location.id}`}
                className="flex flex-col h-full glass p-8 rounded-3xl border border-white/5 hover:border-secondary/50 transition-all group relative overflow-hidden shadow-xl"
            >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <MapPin size={120} />
                </div>

                <p className="text-secondary font-black tracking-widest text-[10px] uppercase mb-1">
                    {location.type}
                </p>
                <h2 className="text-2xl font-black text-white group-hover:text-primary transition-colors mb-4 line-clamp-2">
                    {location.name}
                </h2>

                <div className="mt-auto space-y-4 pt-4 border-t border-white/10">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Dimension</p>
                        <p className="font-bold text-gray-200 uppercase line-clamp-1">{location.dimension}</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Resident Count</p>
                        <p className="font-bold text-gray-200">{location.residents.length} known residents</p>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
