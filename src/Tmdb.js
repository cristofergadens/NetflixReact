const API_KEY = '530bfdced4f1ce60402dd2a372e6f27f';
const API_BASE = 'https://api.themoviedb.org/3';

const basicFetch = async (endpoint) => {
    try {
        const response = await fetch(`${API_BASE}${endpoint}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

export default {
    getHomeList: async () => {
        return [
            {
                slug: 'trending',
                title: "Recomendados para Você",
                items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'toprated',
                title: "Em Alta",
                items: await basicFetch(`/movie/top_rated?&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'action',
                title: "Ação",
                items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'comedy',
                title: "Comédia",
                items: await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'horror',
                title: "Terror",
                items: await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'romance',
                title: "Romance",
                items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'documentary',
                title: "Documentários",
                items: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
            },
        ];
    },

    getMovieInfo: async (movieId, type) => {
        let info = {};
        if (movieId) {
            try {
                switch (type) {
                    case 'movie':
                        info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                        break;
                    case 'tv':
                        info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                        break;
                    default:
                        info = null;
                        break;
                }
            } catch (error) {
                console.error('Error fetching movie info:', error);
                info = null;
            }
        }

        return info;
    }
}
