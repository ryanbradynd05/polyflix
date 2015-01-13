require 'test_helper'

class MoviesControllerTest < ActionController::TestCase
    test "should get index" do
        get :index
        assert_response :success
        assert_not_nil assigns(:movies)
    end
end
