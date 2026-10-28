import { __css, Button } from '@fluentui/react-components'
import './BookCardComponent.css'

interface BookCardProps {
    image?: Image;
    title?: string;
    authors?: string[]
    genres?: string[];
    publishedYear?: number;
    numberOfPages?: number;
    className?: string;
    children?: React.ReactNode

}

interface Image {
    url?: string
}

export function BookCardComponent(info : BookCardProps ){
    return (
        <div className='book-card'>
            <div>
                <img
                className="image-styles"
                src={info?.image?.url ?? "..../src/assets/no-image.png"}
                alt="Book Cover"
                />
            </div>
        {/* title */}
        <div className='book-title' >
            <h3>{info?.title}</h3> 
        </div>

        {/* author(s) name(s) */}
        <div className='book-authors'>
            <p>{info?.authors?.join(', ')}</p>
        </div>
        {/* genres */} 

        <div className='book-genres'>
            <p>{info?.genres?.join(', ')}</p>
        </div>

        {/* published year */} {/* number of pages */}
        <div className='book-year-pages'>
            <p>{info?.publishedYear ? `Published: ${info.publishedYear}`: `'Unknown Year'`}</p>
            <p>{info?.numberOfPages}</p>
        </div>

        {/* view more button -> navigates to book details page */}  
        <Button style={{ width: 16, height: 16}} shape="circular">Read More</Button>


        </div>
    )

}