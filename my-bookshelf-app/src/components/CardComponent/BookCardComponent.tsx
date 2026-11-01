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
    rating?: number;
    handleRating?: (rating: number) => void;
    readingStatus?: string;
    onStatusChange?: (status: string) => void;

}

export function BookCardComponent(info : BookCardProps) {

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

    const MAX_TAGS = 5;
    const genres = info?.genres ?? []
    const hiddenCount = genres.length - MAX_TAGS




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
                {genres.slice(0, MAX_TAGS).map((genre, index) => (
                <Tag className="tags" key={index}>{genre}</Tag>
                ))}
                {hiddenCount > 0 && (
                    <Tag className="tags" key="nore">+{hiddenCount}</Tag>
                )}
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
        <BookCardActions rating={info.rating} handleRating={info.handleRating} readingStatus={info.readingStatus} setReadingStatus={info.onStatusChange} />
        </div>
    )

}