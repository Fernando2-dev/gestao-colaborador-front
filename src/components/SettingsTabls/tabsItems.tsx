'use client'

import * as Tabs from "@radix-ui/react-tabs";
import { motion } from "framer-motion";

interface TabsItems {
    value: string
    titulo: string
    isSelected?: boolean
}

export const TabsItems = ({ value, titulo, isSelected = false }: TabsItems) => {
    return (
        <Tabs.Trigger
            value={value}
            className="relative px-1 pb-4 text-sm font-medium text-zinc-500 hover:text-violet-700 data-[state=active]:text-violet-700">
            <span className="">{titulo}</span>
            {isSelected && (
                <motion.div layoutId="activeTab" className="absolute -bottom-px left-0 right-0 h-0.5 bg-violet-700 "></motion.div>
            )}
        </Tabs.Trigger>
    )
}