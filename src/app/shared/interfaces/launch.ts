import { PaginatedInfo } from './pagination';

interface CoreItem {
	id: string;
	last_update?: string;
}

export interface Payload {
	id: string;
	mass_kg: number;
}

export interface LaunchItem {
	id: string;
	success: boolean;
	details: string;
	date_utc: string;
	core: CoreItem;
	payloads: Payload[];
}

export interface PaginatedLaunchInfo extends PaginatedInfo {
	docs: LaunchItem[];
}
