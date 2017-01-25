class TodosController < ApplicationController
  def change_status
	todo = TodoEntry.find params[:id]
	todo.isCompleted = params[:isCompleted]
	todo.save
	render json: todo
  end
end
