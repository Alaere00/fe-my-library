import React, { useState } from 'react'
import { Tabs } from '@/untitled-components/application/tabs/tabs' 
import { NativeSelect } from "@/untitled-components/base/select/select-native"

enum SelectedTab {
    ALL = "All catalogs",
    ISBN = "ISBN",
    TITLE = "Title",
    AUTHOR = "Author",

}

const tabs = [
    { id: "all", label: "All catalogs"}, 
    { id: "isbn", label: "ISBN"},
    { id: "title", label: "Title"},
    { id: "author", label: "Author"},


]
export const SearchComponent = () => {
    const [selectedTab, setSelectedTab ] = useState<string>(SelectedTab.ALL)
    return (
        <div>
            <NativeSelect
                aria-label="Tabs"
                value={selectedTab}
                onChange={(event) => setSelectedTab(event.target.value)}
                options={tabs.map((tab) => ({ label: tab.label, value: tab.id}))}
                />
                <Tabs>
                <Tabs.List items={tabs}>
                    {(tab) => <Tabs.Item {...tab} />}
                </Tabs.List>
                </Tabs>

        </div>

    )
}