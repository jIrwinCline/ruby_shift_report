class HomeController < ApplicationController
    def index
        render json: {message: "nothing here"}
    end
end
