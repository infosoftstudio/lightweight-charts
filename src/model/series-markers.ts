import { UserBetData } from '../renderers/series-markers-renderer';
export type SeriesMarkerPosition = 'aboveBar' | 'belowBar' | 'inBar';

export type SeriesMarkerShape = 'circle' | 'square' | 'arrowUp' | 'arrowDown' | 'userBet';

export interface SeriesMarker<TimeType> {
	time: TimeType;
	position: SeriesMarkerPosition;
	shape: SeriesMarkerShape;
	color: string;
	id?: string;
	text?: string;
	size?: number;
	betData?: UserBetData;
}

export interface InternalSeriesMarker<TimeType> extends SeriesMarker<TimeType> {
	internalId: number;
}
