class ProjectsController < ApplicationController
  def index
  	@projects = Project.includes(:todos)
  	@todo = TodoEntry.new
  end

  def create
  	todo_params.inspect
  	@todo = TodoEntry.new todo_params
  	if @todo.save
  		redirect_to :projects_index
  	else
  		@projects = Project.includes(:todos)
  		render :index
  	end
  end

  def update
  end

  private
	  def todo_params
	      params.require(:todo_entry).permit(:text, :project_id)
	  end
end
