class HomeController < ApplicationController
    def index
        @reports = Report.all
        render json: @reports
    end
end
