class ApiController < ApplicationController
  def projects
  	@projects = Project.joins(:todos).all
  	render json: @projects, status: :ok, include: :todos
  end

  def todo_change_status
    todo = TodoEntry.find params[:id]
    raise ActionController::RoutingError.new('Not Found') unless todo
    todo.isCompleted = params[:isCompleted]
    todo.save
    render json: todo
  end

end
