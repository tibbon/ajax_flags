class HomeController < ApplicationController

  def index
    # @countries = Country.select([:id, :abbreviation, :name, :north_america]);
  end

  def countries
    respond_to do |format|
      format.json { render json: Country.select([:id, :abbreviation, :name, :north_america]) }
    end
  end

end
