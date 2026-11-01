import React, { useState } from 'react'
import "./BookCardActions.css"
import {
    Button,
    Menu,
    MenuTrigger,
    MenuItem,
    MenuPopover,
    JSXElement,
    MenuGroup,
    MenuGroupHeader,
    Rating,
    ProgressBar,
    MenuDivider,
    MenuList,
  } from "@fluentui/react-components";
import { HeartRegular, MoreVerticalRegular, Add12Filled } from '@fluentui/react-icons';


export enum Status {
    want_to_read = "Want to read",
    completed = "Completed",
    did_not_complete = "Did not complete",
    reading = "Reading",

}

const status = Object.entries(Status as Record<string, string>).map(([name, value]) => ({
    id: name, 
    label: value
}))


interface BookCardActionsProps {
    readingStatus: string;                       // snake_case key, e.g. "completed"
    setReadingStatus: (status: string) => void;
    rating: number;
    handleRating: (rating: number | null) => void;
    handleFavorite: (favorite: boolean) => void;
}

export const BookCardActions = ({rating, handleRating, readingStatus, setReadingStatus, handleFavorite } : BookCardActionsProps): JSXElement => {

    return (
        <div className='actions-container'>
            <Menu positioning={{ autoSize: true }}>

            <MenuTrigger disableButtonEnhancement>
                <Button>{readingStatus}</Button>
            </MenuTrigger>
            <MenuPopover>

                <MenuList>

            {status.map(({id, label}) => (
            <MenuItem key={id} onClick={() => {
                setReadingStatus(id)
            }}>{label}</MenuItem>
            ))
            }
                </MenuList>

            </MenuPopover>
            </Menu>
        <Button onClick={(val) => handleFavorite(val)} icon={<HeartRegular />}></Button>
        <DetailedActions rating={rating} onRate={handleRating} disabled={readingStatus != Status.completed}/>
        </div>
    )
}


interface DetailedActionsProps {
    bookId?: number;                
    rating?: number;
    onRate?: (rating: number) => void;
    disabled?: boolean;                   
}

const DetailedActions = ({rating, onRate, disabled}: DetailedActionsProps) => {
    return (
        <Menu positioning={{ autoSize: true }}>
        <MenuTrigger disableButtonEnhancement>
            <Button icon={<MoreVerticalRegular />}></Button>
        </MenuTrigger>
        <MenuPopover>
            <MenuGroup>
                <MenuGroupHeader>Your Rating</MenuGroupHeader>
                <div className='menu-section-body'>
                <Rating size='large' color='marigold' value={rating} onChange={(_, data) => onRate?.(data.value === 0 ? null : data.value)} />
                </div>

            </MenuGroup>
            <MenuDivider/>

            <MenuGroup>
            <MenuGroupHeader>Progress</MenuGroupHeader>
                <div className='menu-section-body'>
                <ProgressBar className='progress-bar' thickness="large" value={0}/>
                </div>
            </MenuGroup>
        
            <MenuDivider/>

            <MenuGroup>
                <MenuGroupHeader>Add to list</MenuGroupHeader>
                <MenuItem icon={<Add12Filled />}>New list</MenuItem>
            </MenuGroup>
        </MenuPopover>
        </Menu>

    )
}