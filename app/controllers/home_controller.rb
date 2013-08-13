class HomeController < ApplicationController

  def index
    # @countries = Country.select([:id, :abbreviation, :name, :north_america]);
  end

  def countries
    if params[:step] != 'all'
      step = params[:step].to_i
    else
      step = Country.all.count - params[:offset].to_i
    end
    offset = params[:offset].to_i

    countries = Country.select([:id, :abbreviation, :name, :north_america])
    countries = countries.slice(offset, step)

    respond_to do |format|
      format.json { render json: countries }
    end
  end

end
