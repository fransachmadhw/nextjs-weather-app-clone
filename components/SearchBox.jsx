import React from 'react';
import Cities from '../lib/city.list.json';
import Link from 'next/link';
import Router from 'next/router';

const SearchBox = ({ placeholder }) => {
    const [query, setQuery] = React.useState("");
    const [results, setResults] = React.useState([]);

    React.useEffect(() => {
        function clearQuery() {setQuery("")}

        Router.events.on("routeChangeComplete", clearQuery);

        return () => {
            Router.events.off("routeChangeComplete", clearQuery);
        }
    }, [])

    const onChange = (e) => {
        const { value } = e.target;
        setQuery(value);

        let matchingCities = [];

        if(value.length > 0) {
            for(let city of Cities) {
                if(matchingCities.length >= 5) {
                    break;
                }

                const match = city.name.toLowerCase().startsWith(value.toLowerCase());

                if(match) {
                    const cityData = {
                        ...city,
                        slug: `${city.name.toLowerCase().replace(/ /g, "-")}-${city.id}`
                    }

                    matchingCities.push(cityData)
                }
            }
        }

        return setResults(matchingCities);
    }

    return (
        <div className="search">
            <input
                type="text"
                value={query}
                onChange={onChange}
                placeholder={placeholder ? placeholder : "Search for a city name..."}
            />
            {query.length > 0 && (
                <ul>
                    {results.length > 0 ? (
                        results.map(city => (
                            <li key={city.id}>
                                <Link href={`/location/${city.slug}`}>
                                    <a>
                                        {city.name}
                                        {city.state ? `, ${city.state} ` : ' '}
                                        <span>({city.country})</span>
                                    </a>
                                </Link>
                            </li>
                        ))
                    ) : (
                        <li className="search__no-results">No result found</li>
                    )}
                </ul>
            )}
        </div>
    )
}

export default SearchBox