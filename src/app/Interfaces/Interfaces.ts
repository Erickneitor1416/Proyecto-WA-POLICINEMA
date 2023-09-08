export interface Movie {
	adult: boolean;
	backdrop_path: string;
	genres: { id: number; name: string }[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}
export interface DateRange {
	maximum: string;
	minimum: string;
}

export interface MovieData {
	dates: DateRange;
	page: number;
	results: Movie[];
	total_pages: number;
	total_results: number;
}

export interface ReviewData {
	movieId: number;
	date: string;
	rating: number;
	reviewTitle: string;
	feedback: string;
}
	
export interface LoginData {
	email: string;
	password: string;
}
