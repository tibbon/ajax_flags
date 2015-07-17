class HomeController < ApplicationController

  def index
    @countries = Country.select([:id, :abbreviation, :name, :north_america]);
    respond_to do |format|
        format.html
        format.json {render json: { countries: @countries}}
    end
  end

  def countries

  end

end