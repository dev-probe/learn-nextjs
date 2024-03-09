// import { API_URL } from "../../../(home)/page";

import { Suspense } from "react";
import MovieInfo, { getMovie } from "../components/movie-info";
import MovieVideos from "../components/movie-videos";

// async function getMovie(id:string) {
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     const response = await fetch(`${API_URL}/${id}`);
//     return response.json();
// }

// async function getVideos(id: string) {
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     const response = await fetch(`${API_URL}/${id}/videos`);
//     return response.json();
// }

interface IParams {
    params: { id: string };
}

export async function generateMetadata({ params: { id } }: IParams) {
    const movie = await getMovie(id);
    return {
        title: movie.title
    };
}

export default async function MovieDetail({ params: { id } }: IParams) {
    // Promise.all 사용시 동시에 fetch 진행, getMovie, getVideos 둘 다 끝나야 처리됨
    // const [movie, videos] = await Promise.all([getMovie(id), getVideos(id)]);
    // 동시에 진행하지만 완료된 것을 먼저 처리되게 하는 것은 Suspense
    return (
        <div>
            <Suspense fallback={<h1>Loading movie info</h1>}>
                <MovieInfo id={id} />
            </Suspense>
            <Suspense fallback={<h1>Loading movie videos</h1>}>
                <MovieVideos id={id} />
            </Suspense>
        </div>
    );
}