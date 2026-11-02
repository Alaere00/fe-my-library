import { useState } from 'react';
import { StarFilled } from '@fluentui/react-icons';
import { BookCardActions } from '../BookCardActions/BookCardActions';
import { TagGroup, TagList, Tag } from '@/untitled-components/base/tags/tags';
import './BookCardComponent.css'
import { updateSetFavorite } from '@/services/BookService';
import { BookCover } from '../BookCover/BookCover';

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
    const [isFavorite, setFavorite] = useState<boolean>(false)
    const MAX_TAGS = 3;
    const genres = info?.genres ?? []
    const visibleGenres = genres.slice(0, MAX_TAGS);
    const hiddenCount = genres.length - visibleGenres.length
    const authors = info?.authors?.join(', ') || 'Unknown author'

    async function handleFavorites(favorite: boolean) {
        if (info.id == null) return;
        const next = !isFavorite
        setFavorite(next)
        try {
            await updateSetFavorite(info.id, favorite)
        } catch (err){
            setFavorite(!next);
            console.error(err)
        }
    }


    return (
        <div className='book-card'>
            <div className="book-cover-frame">
                {info?.image ? <img
                className="book-cover-image"
                src={info?.image}
                alt={`Cover of ${info?.title ?? 'Untitled'}`}
                /> : <BookCover src={info?.image} title={info?.title ?? 'Untitled'}/> }
            </div>

        <div className="book-title">
            <h3 title={info?.title}>{info?.title || 'Untitled'}</h3>
        </div>

        <div className='book-authors'>
            <p title={authors}>{`by ${authors}`}</p>
        </div>

        <div className='book-genres'>
            <TagGroup label="Tags" size="md">
            <TagList className="tag-list">
                {visibleGenres.map((genre, index) => (
                <Tag className="tags" key={index}>{genre}</Tag>
                ))}
                {hiddenCount > 0 && (
                    <Tag className="tags" key="nore">+{hiddenCount}</Tag>
                )}
                </TagList>
            </TagGroup>
        </div>

        <div className='misc-details'>
            <p className="misc-published">
                {info?.publishedYear ? `Published: ${info.publishedYear}` : ""}
            </p>
            {info?.numberOfPages != null && (
                <p className="misc-page-count">
                    <StarFilled aria-hidden="true" />
                    <span>{info.numberOfPages} pages</span>
                </p>
            )}
        </div>
        <BookCardActions rating={info.rating} handleRating={info.handleRating} readingStatus={info.readingStatus} setReadingStatus={info.onStatusChange} handleFavorite={() => handleFavorites(isFavorite)} />
        </div>
    )

}