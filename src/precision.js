const list = [
    'start_date',
    'start_date_start_time',
    'start_date_end_date',
    'start_date_start_time_end_date',
    'start_date_start_time_end_date_end_time',
    'start_date_end_date_end_time',
    'end_date',
    'end_date_end_time',
    'year',
    'period',
    'month',
    'range',
    'before',
    'after',
    'open',
    'cancelled',
    'postponed',
    'delayed',
    'removed',
    'ongoing',
    'happened'
  ]

export default {
    list,
    isAllDay: (precision) =>
        [
            'start_date',
            'start_date_end_date',
            'end_date',
        ].includes(precision)

}