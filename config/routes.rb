Rails.application.routes.draw do
  post 'todos/change_status'

  root to: 'projects#index' 

  post 'projects/create'
  

  get 'projects/update'

  get 'projects/index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
