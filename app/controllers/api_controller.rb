class ApiController < ActionController::Base
  def projects
  	@projects = Project.includes(:todos)
  	render json: @projects, status: :ok, include: :todos
  end

  def todo_change_status
    @todo = TodoEntry.find params[:id]
    raise ActionController::RoutingError.new('Not Found') unless @todo
    @todo.isCompleted = params[:isCompleted]
    @todo.save
    render json: todo
  end

  def create_todo
  	@todo = TodoEntry.new params.permit(:text, :project_id)
  	if @todo.valid? and @todo.save
  		render json: @todo, status: :ok, include: :project
  	else 
  		render json: {errors: @todo.errors}, status: 403
  	end
  end
end
