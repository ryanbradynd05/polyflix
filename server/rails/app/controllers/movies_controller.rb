class MoviesController < ApplicationController
    def index
        render json: Movie.all, each_serializer: MovieSerializer, root: 'movies'
    end

    def show
        render json: Movie.find_by_id(params[:id]), root: 'movie'
    end

    def create
        movie = Movie.new(movie_params)

        movie.save
        render json: movie, root: 'movie'
    end

    def update
        movie = Movie.find_by_id(params[:id])

        movie.update(movie_params)
        render json: Movie.find_by_id(params[:id]), root: 'movie'
    end

    def destroy
        movie = Movie.find_by_id(params[:id])
        movie.destroy

        render json: '{"movie": {}}'
    end

    def search
        movies = Tmdb::Movie.find(params[:id])
        render json: movies.to_json
    end

    def info
        movie = Tmdb::Movie.detail(params[:id])
        render json: movie
    end

    private

        def movie_params
            params.require(:movie).permit(:title, :themoviedbid)
        end

end
