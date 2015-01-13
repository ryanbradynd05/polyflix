require 'test_helper'

class MoviesControllerTest < ActionController::TestCase
    # called before every single test
    setup :initialize_movies

    # called after every single test
    def teardown
        @one = nil
        @two = nil
    end

    test "should get index" do
        get :index
        assert_response :success
    end

    test "should create movie" do
        json = @one.attributes
        post :create, movie: json
        assert_response :success
    end

    test "should show movie" do
        get :show, id: @one.id
        assert_response :success
    end

    test "should update movie" do
        json = @two.attributes
        patch :update, id: @one.id, movie: json
        assert_response :success
    end

    test "should destroy movie" do
        delete :destroy, id: @one.id
        assert_response :success
    end
    private

        def initialize_movies
            @one = movies(:one)
            @two = movies(:one)
        end
end
