module Api
  module V1
    class EntriesController < ApplicationController
    # before_action :authorize_access_request!
    before_action :set_entry, only: [:show, :update, :destroy]

    # GET /entries
    def index
      @entries = Entry.where(report_id: entry_params["report_id"])

      render json: @entries
    end

    # GET /entries/1
    def show
      render json: @entry
    end

    # POST /entries
    def create
      # entry_params[:time].sub!("$tab$", "\t")
      @entry = Entry.new(entry_params)

      if @entry.save
        render json: @entry, status: :created
      else
        render json: @entry.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /entries/1
    def update
      if @entry.update(entry_params)
        render json: @entry
      else
        render json: @entry.errors, status: :unprocessable_entity
      end
    end

    # DELETE /entries/1
    def destroy
      @entry.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_entry
        @entry = Entry.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def entry_params
        params.permit(:body, :report_id, :time)
      end
    end
  end
end
