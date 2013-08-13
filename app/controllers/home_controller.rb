class HomeController < ApplicationController

  def index
    # @countries = Country.select([:id, :abbreviation, :name, :north_america]);
  end

  def countries
    step = params[:step].to_i
    offset = params[:offset].to_i

    countries = Country.select([:id, :abbreviation, :name, :north_america])
    countries = countries.slice(offset, step)

    respond_to do |format|
      format.json { render json: countries }
    end
  end

end
