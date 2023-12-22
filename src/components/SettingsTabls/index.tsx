'use client'

import * as Tabs from "@radix-ui/react-tabs"
import { TabsItems } from "./tabsItems"
import { useState } from "react"

interface ISettingTabls {
    titulo: String;
}
export const SettingsTabls = ({titulo}: ISettingTabls) => {
    const [currentTabs, setCurrentTabs] = useState("tab1")
    return (
        <Tabs.Root value={currentTabs} onValueChange={setCurrentTabs}>
            <Tabs.List className="mt-6 flex w-full items-center gap-4 border-b border-zinc-200">
                <TabsItems value="tab1" titulo="Cadastro Colaborador" isSelected={currentTabs === 'tab1'} />
                <TabsItems value="tab2" titulo="Atuação Cadastro" isSelected={currentTabs === 'tab2'}/>
            </Tabs.List>
        </Tabs.Root>
    )
}