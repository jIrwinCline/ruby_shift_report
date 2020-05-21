Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :reports do
        get "/generate", to: 'reports#generate'
        resources :entries
      end
      get "user/:user_id/reports", to: 'reports#current_user_reports'
    end
  end
  root to: "home#index"
  

  post "refresh", controller: :refresh, action: :create
  post "signin", controller: :signin, action: :create
  post "signup", controller: :signup, action: :create
  delete "signin", controller: :signin, action: :destroy

end
