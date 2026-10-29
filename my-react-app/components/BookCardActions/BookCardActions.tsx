import React, { useState } from 'react'
import "./BookCardActions.css"
import {
    Button,
    Menu,
    MenuTrigger,
    MenuList,
    MenuItem,
    MenuPopover,
    JSXElement,
    MenuGroup,
    MenuGroupHeader,
    Rating,
    ProgressBar,
    MenuDivider,
  } from "@fluentui/react-components";
import { HeartRegular, MoreVerticalRegular, Add12Filled } from '@fluentui/react-icons';


export const BookCardActions = (): JSXElement => {
    const [readingStatus, setReadingStatus] = useState<string>('Want to read')
    return (
        <div className='actions-container'>
            <Menu positioning={{ autoSize: true }}>

            <MenuTrigger disableButtonEnhancement>
                <Button>{readingStatus}</Button>
            </MenuTrigger>
            <MenuPopover>
            <MenuItem >Want to read</MenuItem>
            <MenuItem >Reading</MenuItem>
            <MenuItem onClick={() => setReadingStatus('Completed')}>Completed</MenuItem>
            <MenuItem >Did not complete</MenuItem>
            </MenuPopover>
            </Menu>



        <Button icon={<HeartRegular />}></Button>
        <DetailedActions/>
        </div>
    )
}

const DetailedActions = () => {
    const [rating, setRating] = useState<number>(0)
    return (

        <Menu positioning={{ autoSize: true }}>

        <MenuTrigger disableButtonEnhancement>
            <Button icon={<MoreVerticalRegular />}></Button>
        </MenuTrigger>
        <MenuPopover>
            <MenuGroup>
                <MenuGroupHeader>Your Rating</MenuGroupHeader>
                <div className='menu-section-body'>
                <Rating size='large' color='marigold' value={rating} onChange={(_, data) => setRating(data.value)} />
                </div>

            </MenuGroup>
            <MenuDivider/>

            <MenuGroup>
            <MenuGroupHeader>Progress</MenuGroupHeader>
                <div className='menu-section-body'>
                <ProgressBar className='progress-bar' thickness="large" value={0.7}/>
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