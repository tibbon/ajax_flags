Integrated::Application.routes.draw do

  root :to => "home#index"
  get "/countries" => "home#countries"
  get "/country/:id" => "home#country"

end
