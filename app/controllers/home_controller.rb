class HomeController < ApplicationController
    def index
        send_file(Rails.root.join('app' , 'assets', "documents",  "FHC DAY 05172020.docx"), type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
    end
end
