import React from 'react';

export const CARS_COLUMNS = [
    {
        Header: 'Mark',
        accessor: 'mark'
    },
    {
        Header: 'Model',
        accessor: 'model'
    },
    {
        Header: 'Release year',
        accessor: 'releaseYear'
    },
    {
        Header: 'Mileage',
        accessor: 'mileage'
    },
    {
        Header: 'Engine capacity',
        accessor: 'engineCapacity'
    },
    {
        Header: 'Fuel',
        accessor: 'fuel'
    },
    {
        Header: 'Transmission',
        accessor: 'transmission'
    },
    {
        Header: 'Drive unit',
        accessor: 'driveUnit'
    }
];

export const BREAKDOWN_COLUMNS = [
    {
        Header: 'Name',
        accessor: 'name'
    }
];

export const CAR_BREAKDOWNS_COLUMNS = [
    {
        Header: 'Description',
        accessor: 'description'
    },
    {
        Header: 'Breakdown',
        accessor: 'breakdown.name'
    },
    {
        Header: 'Description',
        accessor: 'description'
    },
    {
        Header: 'Min price',
        accessor: 'minPrice'
    },
    {
        Header: 'Max price',
        accessor: 'maxPrice'
    },
    {
        Header: 'Avatar',
        accessor: 'avatar'
    }
];
