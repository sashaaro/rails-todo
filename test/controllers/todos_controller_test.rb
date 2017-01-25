require 'test_helper'

class TodosControllerTest < ActionDispatch::IntegrationTest
  test "should get change_status" do
    get todos_change_status_url
    assert_response :success
  end

end
