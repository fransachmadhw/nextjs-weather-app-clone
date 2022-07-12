import React from 'react';
import Head from 'next/head';
import Cities from '../../lib/city.list.json';
import TodaysWeather from '../../components/TodaysWeather';
import HourlyWeather from '../../components/HourlyWeather';
import moment from 'moment-timezone';
import WeeklyWeather from '../../components/WeeklyWeather';
import SearchBox from '../../components/SearchBox'
import Link from 'next/link';
import Header from '../../components/Header';

const City = ({ city, currentWeather, dailyWeather, hourlyWeather, timezone }) => {
    return (
        <div>
            <Head>
                <title>{city.name} City Weather</title>
            </Head>
            <div className='page-wrapper'>
                <div className='container'>
                    <Header />
                    <Link href="/">
                        <a className='back-link'>&larr; Home</a>
                    </Link>
                    <SearchBox placeholder="Search for another location..." />
                    <TodaysWeather
                        city={city}
                        currentWeather={currentWeather}
                        // dailyWeather={dailyWeather}
                        // hourlyWeather={hourlyWeather}
                        weather={dailyWeather[0]}
                        timezone={timezone}
                    />
                    <HourlyWeather
                        hourlyWeather={hourlyWeather}
                        timezone={timezone}
                    />
                    <WeeklyWeather
                        weeklyWeather={dailyWeather}
                        timezone={timezone}
                    />
                </div>
            </div>
        </div>
    )
}

export default City;

function getCity(param) {
    const cityParam = param.trim();
    const splitCity = cityParam.split("-");
    const id = splitCity[splitCity.length - 1];

    if(!id) { return null; }

    const city = Cities.find(city => city.id.toString() == id)

    if(city) {
        return city;
    }
    else {
        return null;
    }
}

function getHourlyWeather(hourlyData, timezone) {
    const endOfDay = moment().tz(timezone).endOf("day").valueOf();
    const eodTimeStamp = Math.floor(endOfDay / 1000);

    const todaysData = hourlyData.filter(data => data.dt < eodTimeStamp);

    return todaysData;
}

export async function getServerSideProps( context ) {
    const city = getCity(context.params.city);
    const slug = context.params.city;

    if(!city) { return { notFound: true }; }

    // const res = await fetch(
    //     `https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&
    //     appid=${process.env.API_KEY}&units=metric`
    // );

    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${process.env.API_KEY}&exclude=minutely&units=metric`
    );

    const data = await res.json();

    if(!data) {
        return { notFound: true, };
    }

    console.log(data.current)

    const hourlyWeather = getHourlyWeather(data.hourly, data.timezone);

    return {
        props: {
            city: city,
            currentWeather: data.current,
            dailyWeather: data.daily,
            hourlyWeather: hourlyWeather,
            timezone: data.timezone,
        },
    };
}
