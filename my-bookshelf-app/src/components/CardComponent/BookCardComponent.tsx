import { useState } from 'react';
import { ArrowRight16Regular, StarFilled } from '@fluentui/react-icons';
import { BookCardActions } from '../BookCardActions/BookCardActions';
import { TagGroup, TagList, Tag } from '@/untitled-components/base/tags/tags';
import './BookCardComponent.css'

interface BookCardProps {
    image?: string;
    title?: string;
    authors?: string[]
    genres?: string[];
    publishedYear?: number;
    numberOfPages?: number;
    className?: string;
    children?: React.ReactNode
    id?: number;

}

export function BookCardComponent(info : BookCardProps ){

    // const [isFavorite, setIsFavorite] = useState<Set<number>>(new Set());

    // const handleFavoriteClick = (id: number) => {
    //     setIsFavorite(prev => {
    //         const next = new Set(prev);
    //         if (next.has(id)) next.delete(id);
    //         else next.add(id);
    //         return next;
    //     });
    //     console.log(`Favorite clicked for book at index: ${id}`);
    //     console.log(isFavorite)
    // }

    return (
        <div className='book-card'>
            <div>
                <img
                className="image-styles"
                src={info?.image}
                alt="Book Cover"
                />
            </div>

        <div className='book-title' >
            <h3>{info?.title}</h3> 
        </div>

        <div className='book-authors'>
            <p>{`by ${info?.authors?.join(', ')}`}</p>
        </div>

        <div className='book-genres'>
            <TagGroup label="Tags" size="md">
            <TagList className="tag-list">
                {info?.genres?.map((genre, index) => (
                <Tag className="tags" key={index}>{genre}</Tag>
                ))}
                </TagList>
            </TagGroup>
        </div>

        <div className='misc-details'>
            <p>{info?.publishedYear ? `Published: ${info.publishedYear}`: `'Unknown Year'`}</p>
            <StarFilled style={{ height: '10px', width: '10px'}} />
            <p>{`${info?.numberOfPages} pages`}</p>
        </div>
        {/* view more button -> navigates to book details page (make the entire card clickable) */}  
        {/* <Button className='book-detaiils' iconPosition='after' icon={<ArrowRight16Regular/>} style={{ border: 'none'}} >View Book Details</Button> */}
        <BookCardActions />
        </div>
    )

}