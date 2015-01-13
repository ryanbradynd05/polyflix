class MoviesController < ApplicationController
    def index
        render json: Movie.all, each_serializer: MovieSerializer, root: 'movies'
    end

    def show
        render json: Movie.find(params[:id]), root: 'movie'
    end

    def new
        render json: Movie.new, root: 'movie'
    end

    def create
        @movie = Movie.new(params[:movie])

        @movie.save
        render json: @movie, root: 'movie'
    end

    def update
        @movie = Movie.find(params[:id])

        @movie.update(params[:movie])
        render json: @movie, root: 'movie'
    end

    def destroy
        @movie = Movie.find(params[:id])
        @movie.destroy

        render json: @movie, root: 'movie'
    end
end
