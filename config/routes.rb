Rails.application.routes.draw do
  root to: 'projects#index' 
  
  get 'projects/index'
  get 'projects/update'
  post 'projects/create'
  post 'projects/todo_change_status' # TODO remove
  
  # API
  get 'api/projects'
  post 'api/todo_change_status'
  put 'api/create_todo'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
