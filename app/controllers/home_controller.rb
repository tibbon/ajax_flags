class HomeController < ApplicationController

  def index
    @countries = Country.select([:id, :abbreviation, :name, :north_america]);
  end

  def countries
     @countries = Country.find(params[:id])

    respond_to do |format|
      format.html
      format.json { render json: { countries: @countries}}
    end
  end

end
