interface TimeSeries {
    entity_id: string;
    metric_type: string;
    observations: Array<Observation>;
}

interface Observation {
    time: Date;
    value: number;
}

export type { TimeSeries, Observation };