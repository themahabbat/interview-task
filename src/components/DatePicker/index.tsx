

import React, { useState, useMemo, useCallback, useEffect } from 'react'

import DateRangePicker from 'react-daterange-picker'
import 'react-daterange-picker/dist/css/react-calendar.css'
import * as originalMoment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(originalMoment)

interface DateRange {
    start: originalMoment.Moment;
    end: originalMoment.Moment;
}

const initialDateRange: DateRange = {
    start: moment(),
    end: moment()
}

const DatePicker = () => {

    const [dates, setDates] = useState<DateRange>(initialDateRange)

    const [showDropdown, setShowDropdown] = useState<Boolean>(false)

    const onChangeDates = (dates: DateRange) => {
        const url = new URL(window.location.href);

        url.searchParams.set('startDate', formatDate(dates.start));
        url.searchParams.set('endDate', formatDate(dates.end));

        window.location.href = url.toString();
        setDates(dates)
    }

    const parseDates = useCallback(() => {
        return moment.range(dates.start, dates.end)
    }, [dates])

    const formatDate = useCallback((date: originalMoment.Moment): string => date.format('YYYY-MM-DD'), [])

    const formatDates = useCallback(() => formatDate(dates.start) + ' - ' + formatDate(dates.end), [dates.end, dates.start, formatDate])

    useEffect(() => {
        const url = new URL(window.location.href);

        const startDate = url.searchParams.get('startDate');
        const endDate = url.searchParams.get('endDate');

        let initialDates = moment.range(moment(), moment())

        if (startDate !== null && endDate !== null) {
            initialDates = moment.range(moment(startDate), moment(endDate))
        }

        setDates(initialDates)

        return () => {
            setDates(initialDateRange)
        }
    }, [])


    return (
        <div className="cursor-pointer relative border-2 text-sky-900 transition hover:border-sky-900 bg-white rounded p-2 text-sm">
            {useMemo(() => (
                dates.start && dates.end && formatDates()
            ), [dates.end, dates.start, formatDates])}

            <button onClick={() => {
                setShowDropdown(prev => !prev)
            }}>
                <i className="ml-2 bi bi-calendar-fill"></i>
            </button>


            <div className="absolute bg-white shadow top-[100%] right-0 rounded">
                {showDropdown === true && (
                    <DateRangePicker
                        onSelect={(dates: DateRange) => onChangeDates(dates)}
                        value={parseDates()}
                    />
                )}
            </div>

        </div>
    )


}

export default DatePicker
