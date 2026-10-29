import { Button } from '@fluentui/react-components'
import './BookCardComponent.css'
import { ArrowRight16Regular, StarFilled } from '@fluentui/react-icons';
import { BookCardActions } from '../BookCardActions/BookCardActions';

interface BookCardProps {
    image?: string;
    title?: string;
    authors?: string[]
    genres?: string[];
    publishedYear?: number;
    numberOfPages?: number;
    className?: string;
    children?: React.ReactNode

}

export function BookCardComponent(info : BookCardProps ){
    return (
        <div className='book-card'>
            <div>
                <img
                className="image-styles"
                src={info?.image}
                alt="Book Cover"
                />
            </div>
        {/* title */}
        <div className='book-title' >
            <h3>{info?.title}</h3> 
        </div>
        {/* author(s) name(s) */}
        <div className='book-authors'>
            <p>{`by ${info?.authors?.join(', ')}`}</p>
        </div>
        {/* genres */} 
        <div className='book-genres'>
            <p>{info?.genres?.join(', ')}</p>
        </div>

        {/* published year */} {/* number of pages */}
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