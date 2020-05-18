module Api
  module V1
    class ReportsController < ApplicationController
    before_action :authorize_access_request!, except: [:show, :index]
    before_action :set_report, only: [:generate ,:show, :update, :destroy]

    # GET /reports
    def index
      @reports = Report.all
      
      render json: @reports
    end

    # GET /reports/current_user
    def current_user_reports
      @reports = Report.where(user_id: params["user_id"])
      # byebug
      render json: @reports
    end

    # GET /reports/1
    def show
      render json: @report
    end

    # POST /reports
    def create
      @report = current_user.reports.build(report_params)

      if @report.save
        render json: @report, status: :created
      else
        render json: @report.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /reports/1
    def update
      if @report.update(report_params)
        render json: @report
      else
        render json: @report.errors, status: :unprocessable_entity
      end
    end

    # DELETE /reports/1
    def destroy
      @report.destroy
    end

    # POST /reports/1/generate
    def generate

      # render json: @report.generate_doc({ report: @report, entries: @report.entries.all, user: User.find(@report.user_id)})
      new_docx = @report.generate_doc
      # render json: { report: @report, entries: @report.entries.all, user: User.find(@report.user_id)}
      send_file new_docx
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_report
        # @report = current_user.report.find(params[:id])
        @report = Report.find(params[params.has_key?(:id) ? :id : :report_id ])
      end

      # Only allow a trusted parameter "white list" through.
      def report_params
        params.permit(:body, :title, :user_id)
      end
    end
  end
end