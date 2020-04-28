Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :entries
      resources :reports
    end
  end
  root to: "home#index"
end
