import { useState } from 'react'
import { Tabs } from '@/untitled-components/application/tabs/tabs'
import { Key } from 'react-aria-components'
import { Card } from '@fluentui/react-components'
import { ProgressBar }from '@/untitled-components/base/progress-indicators/progress-indicators'
import { BookCardComponent } from '../CardComponent/BookCardComponent'
import { useShelfBooks } from '@/hooks/useShelfBooks'
import { Link, useNavigate } from 'react-router-dom'

const LIMIT = 5

export enum SelectedTab {
    reading = "Reading",
    want_to_read = "Want to read",
    completed = "Completed",
    did_not_complete = "Did not complete"

}

// const tabRoutes = {
//     shelf: "/bookshelf",
//     discover: "/", 
// }

const tabs = Object.entries(SelectedTab).map(([name, value]) => ({
    id: name.toLowerCase(), 
    label: value
}))

export function Bookshelf() {
    const [selectedTab, setSelectedTab] = useState<Key>("Want to Read")
    const getBooks = useShelfBooks()

    return (
        <>
        <h1 className="ms-30 mt-7 font-semibold text-display-sm">My Shelf</h1>
        <p className="ms-30 mt-2">Welcome back, [NAME]. Here's your reading life at a glance.</p>
        <div className='flex ms-30 mt-4 mb-4 gap-3'>
            <Card>
                <p>{getBooks('completed').length}</p>
                <p>books read</p>
            </Card>
            <Card>
                <p>{getBooks('reading').length}</p>
                <p>in progress</p>
            </Card>
            <Card style={{ width: "70%" }}>
        <div style={{ width: "95%" }}>
            <ProgressBar min={0} max={100} value={40} />
        </div>
        </Card>
                </div>
                <div className="ms-30 mt-2">
                    <Tabs selectedKey={selectedTab} onSelectionChange={setSelectedTab}>
                    <Tabs.List items={tabs}>
                        {(tab) => <Tabs.Item  {...tab} />}
                    </Tabs.List>
                    </Tabs>
                </div>

        {tabs.map((tab) => {
            const books = getBooks(tab.id)

            return (
            
            <section key={tab.id}>
                <div className='flex justify-between items-center mr-20'>
                <h2 className="ms-30 mt-7 font-semibold text-display-xs">{tab.label}</h2>
                    <Link to={`/bookshelf/${tab.id}`} className="text-brand-600 font-medium">
                        View all
                    </Link>
                </div>
        
            <div className="flex ms-30 mt-4">

            {books.slice(0, LIMIT).map((book) =>    
                <BookCardComponent
                key={book.id}
                image={book?.image?.url}
                genres={book?.genres}
                authors={book?.authors}
                title={book?.title}
                publishedYear={book?.release_year}
                numberOfPages={book?.pages}
                id={book?.id}/>)}
            </div>
            </section>)
                    
})}

        </>
    )
}