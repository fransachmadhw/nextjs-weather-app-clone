import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import Jakarta from '../public/images/jakarta.jpg';
import London from '../public/images/london.jpg';
import Sydney from '../public/images/sydney.jpg';
import NY from '../public/images/new-york.jpg';

const places = [
    {
        name: "Jakarta",
        image: Jakarta,
        url: "/location/jakarta-1642911"
    },
    {
        name: "London",
        image: London,
        url: "/location/london-2643743"
    },
    {
        name: "Sydney",
        image: Sydney,
        url: "/location/sydney-2147714"
    },
    {
        name: "New York",
        image: NY,
        url: "/location/new-york-city-5128581"
    },
]

const FamousPlaces = () => {
  return (
    <div className="places">
        <div className="places__row">
            {places.length > 0 &&
                places.map((place, index) => (
                    <div className="places__box" key={index}>
                        <Link href={place.url}>
                            <a>
                                <div className="places__image-wrapper">
                                    <Image
                                        src={place.image}
                                        alt={`${place.name} Image`}
                                        layout="fill"
                                        objectFit='cover'
                                    />
                                </div>

                                <span>{place.name}</span>
                            </a>
                        </Link>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default FamousPlaces