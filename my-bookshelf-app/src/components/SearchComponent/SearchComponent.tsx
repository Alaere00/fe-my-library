import React, { useState } from 'react'
import { Tabs } from '@/untitled-components/application/tabs/tabs' 
import SearchBarComponent from '../SearchBar/SearchBar'

export enum SelectedTab {
    ALL = "All catalogs",
    ISBN = "ISBN",
    TITLE = "Title",
    AUTHOR = "Author",
}

const tabs = Object.entries(SelectedTab).map(([name, value]) => ({
    id: name.toLowerCase(), 
    label: value
}))

export const SearchComponent = ({ onSearch, selectedTab, handleSelectionChange }) => {

    // note to self, first render is all-catalogs?? Probably a bug
    return (
        <div>
            <Tabs onSelectionChange={handleSelectionChange}>
            <Tabs.List items={tabs}>
                {(tab) => <Tabs.Item {...tab} />}
            </Tabs.List>
            </Tabs>
            <SearchBarComponent onSearch={onSearch} catalog={selectedTab}/>
        </div>

    )
}